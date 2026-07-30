import { useEffect, useState } from "react";
import {
  FaTrophy,
  FaCalendarAlt,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { getMyAttempts } from "../../services/attemptService";
import "./MyAttempts.css";

function MyAttempts() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const attemptsPerPage = 6;

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const data = await getMyAttempts();
      setAttempts(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load attempts.");
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastAttempt = currentPage * attemptsPerPage;
  const indexOfFirstAttempt =
    indexOfLastAttempt - attemptsPerPage;

  const currentAttempts = attempts.slice(
    indexOfFirstAttempt,
    indexOfLastAttempt
  );

  const totalPages = Math.ceil(
    attempts.length / attemptsPerPage
  );

  if (loading) {
    return (
      <div className="text-center mt-5">

        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">
            Loading...
          </span>
        </div>

        <p className="mt-3">
          Loading Attempts...
        </p>

      </div>
    );
  }

  return (
    <div className="attempts-page">

      <div className="attempt-header">

        <h2>My Quiz Attempts</h2>

        <p>
          Track your quiz performance and
          monitor your learning progress.
        </p>

      </div>

      {attempts.length === 0 ? (

        <div className="empty-box">

          <FaTrophy className="empty-icon" />

          <h3>No Attempts Yet</h3>

          <p>
            Start attempting quizzes to see
            your history here.
          </p>

        </div>

      ) : (

        <>

          <div className="attempt-grid">

            {currentAttempts.map((attempt) => {

              const percentage = Math.round(
                (attempt.score /
                  attempt.answers.length) *
                  100
              );

              return (

                <div
                  className="attempt-card"
                  key={attempt._id}
                >

                  <div className="attempt-icon">

                    <FaTrophy />

                  </div>

                  <h3>
                    {attempt.quiz?.title}
                  </h3>

                  <p>
                    {attempt.quiz?.description}
                  </p>

                  <div className="score">

                    Score

                    <span>
                      {attempt.score} /
                      {attempt.answers.length}
                    </span>

                  </div>

                  <div className="progress-bar">

                    <div
                      className="progress-fill"
                      style={{
                        width: `${percentage}%`,
                      }}
                    ></div>

                  </div>

                  <div className="percentage">

                    {percentage}%

                  </div>
                                    <div
                    className={
                      percentage >= 50
                        ? "status passed"
                        : "status failed"
                    }
                  >
                    {percentage >= 50 ? (
                      <>
                        <FaCheckCircle />
                        Passed
                      </>
                    ) : (
                      <>
                        <FaTimesCircle />
                        Failed
                      </>
                    )}
                  </div>

                  <div className="date">

                    <FaCalendarAlt />

                    {new Date(
                      attempt.createdAt
                    ).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }
                    )}

                  </div>

                </div>

              );

            })}

          </div>

          {totalPages > 1 && (

            <div className="pagination">

              <button
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage(currentPage - 1)
                }
              >
                ← Previous
              </button>

              {[...Array(totalPages)].map(
                (_, index) => (

                  <button
                    key={index}
                    className={
                      currentPage === index + 1
                        ? "active"
                        : ""
                    }
                    onClick={() =>
                      setCurrentPage(index + 1)
                    }
                  >
                    {index + 1}
                  </button>

                )
              )}

              <button
                disabled={
                  currentPage === totalPages
                }
                onClick={() =>
                  setCurrentPage(currentPage + 1)
                }
              >
                Next →
              </button>

            </div>

          )}

        </>

      )}

    </div>
  );
}

export default MyAttempts;