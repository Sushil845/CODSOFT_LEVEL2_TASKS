import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheckCircle,
} from "react-icons/fa";
import API from "../../api/axios";
import "./AttemptQuiz.css";

function AttemptQuiz() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {
      const res = await API.get(`/quizzes/${id}`);

      setQuiz(res.data);

      setAnswers(
        new Array(res.data.questions.length).fill(-1)
      );
    } catch (error) {
      console.log(error);
      toast.error("Failed to load quiz.");
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (optionIndex) => {
    const updated = [...answers];
    updated[currentQuestion] = optionIndex;
    setAnswers(updated);
  };

  const handleNext = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await API.post(
        `/quizzes/${id}/submit`,
        {
          answers,
        }
      );

      toast.success("Quiz Submitted Successfully!");

      navigate("/result", {
        state: res.data,
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to submit quiz.");
    }
  };

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
          Loading Quiz...
        </p>

      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="text-center mt-5">

        <h2>Quiz Not Found</h2>

        <p>
          This quiz does not exist or has
          been removed.
        </p>

      </div>
    );
  }

  const question =
    quiz.questions[currentQuestion];

  const progress =
    ((currentQuestion + 1) /
      quiz.questions.length) *
    100;

  return (
    <div className="attempt-container">

      <div className="attempt-card">

        <h2>{quiz.title}</h2>

        <p className="question-count">
          Question {currentQuestion + 1} of{" "}
          {quiz.questions.length}
        </p>

        {/* Progress */}

        <div className="progress-container">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          ></div>

        </div>

        <h4>{question.question}</h4>

        <div className="options">

          {question.options.map(
            (option, index) => (
              <label
                key={index}
                className="option"
              >
                <input
                  type="radio"
                  name="answer"
                  checked={
                    answers[
                      currentQuestion
                    ] === index
                  }
                  onChange={() =>
                    handleOptionChange(index)
                  }
                />

                <span>{option}</span>

              </label>
            )
          )}

        </div>

        <div className="button-group">

          <button
            className="quiz-btn prev-btn"
            disabled={
              currentQuestion === 0
            }
            onClick={handlePrevious}
          >
            <FaArrowLeft />
            Previous
          </button>

          <button
            className={
              currentQuestion ===
              quiz.questions.length - 1
                ? "quiz-btn submit-btn"
                : "quiz-btn next-btn"
            }
            disabled={
              answers[currentQuestion] ===
              -1
            }
            onClick={
              currentQuestion ===
              quiz.questions.length - 1
                ? handleSubmit
                : handleNext
            }
          >
            {currentQuestion ===
            quiz.questions.length - 1 ? (
              <>
                <FaCheckCircle />
                Submit Quiz
              </>
            ) : (
              <>
                Next
                <FaArrowRight />
              </>
            )}
          </button>

        </div>

      </div>

    </div>
  );
}

export default AttemptQuiz;