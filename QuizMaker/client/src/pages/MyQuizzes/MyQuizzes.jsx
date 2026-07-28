import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaBookOpen,
  FaEdit,
  FaTrash,
  FaCalendarAlt,
} from "react-icons/fa";

import { getMyQuizzes, deleteQuiz } from "../../services/myQuizService";
import "./MyQuizzes.css";

function MyQuizzes() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] =useState(true);

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
      alert("Failed to load quizzes.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?"
    );

    if (!confirmDelete) return;

    try {
      await deleteQuiz(id);

      setQuizzes(quizzes.filter((quiz) => quiz._id !== id));

      alert("Quiz deleted successfully.");
    } catch (error) {
      console.log(error);
      alert("Failed to delete quiz.");
    }
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <div className="myquiz-page">

      <h2>My Quizzes</h2>

      {quizzes.length === 0 ? (

        <div className="empty-box">

          <FaBookOpen className="empty-icon" />

          <h3>No Quizzes Found</h3>

          <p>Create your first quiz to see it here.</p>

        </div>

      ) : (

        <div className="quiz-grid">

          {quizzes.map((quiz) => (

            <div
              key={quiz._id}
              className="quiz-card"
              onClick={() => navigate(`/edit-quiz/${quiz._id}`)}
            >

              <FaBookOpen className="quiz-icon" />

              <h3>{quiz.title}</h3>

              <p>{quiz.description}</p>

              <div className="quiz-info">

                <span>
                  📖 Questions :
                  <strong> {quiz.questions.length}</strong>
                </span>

                <span className="quiz-date">
                  <FaCalendarAlt />

                  {new Date(quiz.createdAt).toLocaleDateString(
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
                    navigate(`/edit-quiz/${quiz._id}`);
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

      )}

    </div>
  );
}

export default MyQuizzes;