import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBookOpen } from "react-icons/fa";

import { getAllQuizzes } from "../../services/quizService";
import "./QuizList.css";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);

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

  return (
    <div className="quiz-page">
      <h2>Available Quizzes</h2>

      {quizzes.length === 0 ? (
        <h4 style={{ textAlign: "center", marginTop: "40px" }}>
          No quizzes available.
        </h4>
      ) : (
        <div className="quiz-grid">
          {quizzes.map((quiz) => (
            <div className="quiz-card" key={quiz._id}>
              <h3>
                <FaBookOpen
                  style={{
                    marginRight: "8px",
                    color: "#2563eb",
                  }}
                />
                {quiz.title}
              </h3>

              <p>{quiz.description}</p>

              <p>
                Questions: <strong>{quiz.questions.length}</strong>
              </p>

              <Link
                className="btn btn-primary"
                to={`/attempt/${quiz._id}`}
              >
                Start Quiz
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizList;