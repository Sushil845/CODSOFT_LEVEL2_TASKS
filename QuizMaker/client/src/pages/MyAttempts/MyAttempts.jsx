import { useEffect, useState } from "react";
import { FaTrophy, FaCalendarAlt, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getMyAttempts } from "../../services/attemptService";
import "./MyAttempts.css";

function MyAttempts() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttempts();
  }, []);

  const fetchAttempts = async () => {
    try {
      const data = await getMyAttempts();
      setAttempts(data);
    } catch (error) {
      console.log(error);
      alert("Failed to load attempts");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="attempts-page">
      <h2>My Attempts</h2>

      {attempts.length === 0 ? (
        <div className="empty-box">
          <FaTrophy className="empty-icon" />
          <h3>No Attempts Yet</h3>
          <p>Start attempting quizzes to see your history.</p>
        </div>
      ) : (
        <div className="attempt-grid">
          {attempts.map((attempt) => {
            const percentage = Math.round(
              (attempt.score / attempt.answers.length) * 100
            );

            return (
              <div className="attempt-card" key={attempt._id}>
                <FaTrophy className="attempt-icon" />

                <h3>{attempt.quiz?.title}</h3>

                <p>{attempt.quiz?.description}</p>

                <div className="score">
                  Score :
                  <span>
                    {" "}
                    {attempt.score} / {attempt.answers.length}
                  </span>
                </div>

                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
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
                      <FaCheckCircle /> Passed
                    </>
                  ) : (
                    <>
                      <FaTimesCircle /> Failed
                    </>
                  )}
                </div>

                <div className="date">
                  <FaCalendarAlt />{" "}
                  {new Date(attempt.createdAt).toLocaleDateString()}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyAttempts;