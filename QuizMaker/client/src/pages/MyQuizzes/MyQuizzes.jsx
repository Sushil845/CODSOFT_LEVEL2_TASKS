import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import {
  FaBookOpen,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
} from "react-icons/fa";

import {
  getMyQuizzes,
  deleteQuiz,
} from "../../services/myQuizService";

import "./MyQuizzes.css";

function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const quizzesPerPage = 6;

  const navigate = useNavigate();

  useEffect(() => {
    fetchMyQuizzes();
  }, []);

  const fetchMyQuizzes = async () => {
    try {
      const data = await getMyQuizzes();
      setQuizzes(data);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load quizzes.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete Quiz?",
      text: "This action cannot be undone.",
      icon: "warning",

      showCancelButton: true,

      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#2563eb",

      confirmButtonText: "Yes, Delete",
      cancelButtonText: "Cancel",

      reverseButtons: true,
    });

    if (!result.isConfirmed) return;

    try {
      await deleteQuiz(id);

      const updatedQuizzes = quizzes.filter(
        (quiz) => quiz._id !== id
      );

      setQuizzes(updatedQuizzes);

      // If last item of page deleted
      const newTotalPages = Math.ceil(
        updatedQuizzes.length / quizzesPerPage
      );

      if (
        currentPage > newTotalPages &&
        currentPage > 1
      ) {
        setCurrentPage(currentPage - 1);
      }

      toast.success("Quiz deleted successfully! 🗑️");

    } catch (error) {
      console.log(error);
      toast.error("Failed to delete quiz.");
    }
  };

  // Pagination Logic
  const indexOfLastQuiz = currentPage * quizzesPerPage;
  const indexOfFirstQuiz =
    indexOfLastQuiz - quizzesPerPage;

  const currentQuizzes = quizzes.slice(
    indexOfFirstQuiz,
    indexOfLastQuiz
  );

  const totalPages = Math.ceil(
    quizzes.length / quizzesPerPage
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
          Loading Quizzes...
        </p>

      </div>
    );
  }

  return (
    <div className="myquiz-page">

      <h2>My Quizzes</h2>

      {quizzes.length === 0 ? (

        <div className="empty-box">

          <FaBookOpen className="empty-icon" />

          <h3>No Quizzes Found</h3>

          <p>
            Create your first quiz to see it here.
          </p>

        </div>

      ) : (

        <>
          <div className="quiz-grid">

            {currentQuizzes.map((quiz) => (

              <div
                key={quiz._id}
                className="quiz-card"
                onClick={() =>
                  navigate(`/edit-quiz/${quiz._id}`)
                }
              >

                <FaBookOpen className="quiz-icon" />

                <h3>{quiz.title}</h3>

                <p>{quiz.description}</p>

                <div className="quiz-info">

                  <span>
                    📖 Questions :
                    <strong>
                      {" "}
                      {quiz.questions.length}
                    </strong>
                  </span>

                  <span className="quiz-date">

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

                  </span>

                </div>

                <div className="quiz-actions">

                  <button
                    className="edit-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(
                        `/edit-quiz/${quiz._id}`
                      );
                    }}
                  >
                    <FaEdit />
                    Edit Quiz
                  </button>

                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(quiz._id);
                    }}
                  >
                    <FaTrash />
                    Delete Quiz
                  </button>

                </div>

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

export default MyQuizzes;