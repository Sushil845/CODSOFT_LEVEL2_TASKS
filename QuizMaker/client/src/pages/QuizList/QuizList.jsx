import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaUser,
  FaCalendarAlt,
  FaSearch,
} from "react-icons/fa";

import { getAllQuizzes } from "../../services/quizService";
import "./QuizList.css";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [search, setSearch] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 6;

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const fetchQuizzes = async () => {
    try {
      const data = await getAllQuizzes();
      setQuizzes(data);
    } catch (err) {
      console.log(err);
    }
  };

  // Search Filter
  const filteredQuizzes = quizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination Logic
  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz =
    indexOfLastQuiz - quizzesPerPage;

  const currentQuizzes = filteredQuizzes.slice(
    indexOfFirstQuiz,
    indexOfLastQuiz
  );

  const totalPages = Math.ceil(
    filteredQuizzes.length / quizzesPerPage
  );

  return (
    <div className="quiz-page">

      <h2>Available Quizzes</h2>

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search quizzes..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

      </div>

      {filteredQuizzes.length === 0 ? (

        <div className="empty-box">

          <FaBookOpen className="empty-icon" />

          <h3>No Quizzes Found</h3>

          <p>Try another search or create a new quiz.</p>

        </div>

      ) : (

        <>

          <div className="quiz-grid">

            {currentQuizzes.map((quiz) => (

              <div
                className="quiz-card"
                key={quiz._id}
              >

                <FaBookOpen className="quiz-icon" />

                <h3>{quiz.title}</h3>

                <p>{quiz.description}</p>

                <div className="quiz-info">

                  <span>

                    <FaUser />

                    {quiz.createdBy?.name ||
                      "Unknown"}

                  </span>

                  <span>
                    📖 {quiz.questions.length} Questions
                  </span>

                </div>

                <div className="quiz-date">

                  <FaCalendarAlt />

                  {new Date(
                    quiz.createdAt
                  ).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}

                </div>

                <Link
                  className="attempt-btn"
                  to={`/attempt/${quiz._id}`}
                >
                  Attempt Quiz
                </Link>

              </div>

            ))}

          </div>

          {/* Pagination */}

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

export default QuizList;