import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTrash,
  FaPlusCircle,
  FaSave,
  FaClipboardList,
} from "react-icons/fa";
import { toast } from "react-toastify";
import API from "../../api/axios";
import "./CreateQuiz.css";

function CreateQuiz() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [questions, setQuestions] = useState([
    {
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0,
    },
  ]);

  const [loading, setLoading] = useState(false);

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (
    qIndex,
    optionIndex,
    value
  ) => {
    const updated = [...questions];
    updated[qIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswer = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = Number(value);
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
      },
    ]);
  };

  const removeQuestion = (index) => {
    if (questions.length === 1) return;

    setQuestions(
      questions.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Quiz title is required.");
      return;
    }

    for (let q of questions) {
      if (!q.question.trim()) {
        toast.error("Every question must have text.");
        return;
      }

      for (let option of q.options) {
        if (!option.trim()) {
          toast.error("All options are required.");
          return;
        }
      }
    }

    try {
      setLoading(true);

      const token =
        localStorage.getItem("token");

      await API.post(
        "/quizzes",
        {
          title,
          description,
          questions,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        "Quiz created successfully! 📚"
      );

      navigate("/my-quizzes");

    } catch (error) {

      console.log(error);

      toast.error("Failed to create quiz.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="create-page">

      <form
        className="create-card"
        onSubmit={handleSubmit}
      >

        {/* Header */}

        <div className="page-header">

          <FaClipboardList className="page-icon" />

          <h2>Create New Quiz</h2>

          <p>
            Design engaging quizzes for
            students, friends and learners.
          </p>

        </div>

        {/* Counter */}

        <div className="question-counter">

          Total Questions

          <span>{questions.length}</span>

        </div>

        {/* Quiz Details */}

        <div className="input-group">

          <label>Quiz Title</label>

          <input
            type="text"
            placeholder="Enter Quiz Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />

        </div>

        <div className="input-group">

          <label>Description</label>

          <textarea
            rows="3"
            placeholder="Enter Quiz Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
          />

        </div>

        {/* Questions */}

        {questions.map((question, index) => (

          <div
            className="question-card"
            key={index}
          >

            <div className="question-header">

              <h3>
                📝 Question {index + 1}
              </h3>

              {questions.length > 1 && (

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() =>
                    removeQuestion(index)
                  }
                >
                  <FaTrash />
                  Remove
                </button>

              )}

            </div>

            <div className="input-group">

              <label>Question</label>

              <input
                type="text"
                placeholder="Enter Question"
                value={question.question}
                onChange={(e) =>
                  handleQuestionChange(
                    index,
                    e.target.value
                  )
                }
                required
              />

            </div>

            <div className="options-grid">

              {question.options.map(
                (option, optionIndex) => (

                  <input
                    key={optionIndex}
                    type="text"
                    placeholder={`Option ${
                      String.fromCharCode(
                        65 + optionIndex
                      )
                    }`}
                    value={option}
                    onChange={(e) =>
                      handleOptionChange(
                        index,
                        optionIndex,
                        e.target.value
                      )
                    }
                    required
                  />

                )
              )}

            </div>

            <div className="input-group">

              <label>
                Correct Answer
              </label>

              <select
                value={
                  question.correctAnswer
                }
                onChange={(e) =>
                  handleCorrectAnswer(
                    index,
                    e.target.value
                  )
                }
              >
                <option value={0}>
                  Option A
                </option>
                <option value={1}>
                  Option B
                </option>
                <option value={2}>
                  Option C
                </option>
                <option value={3}>
                  Option D
                </option>
              </select>

            </div>

          </div>

        ))}

        <button
          type="button"
          className="add-question-btn"
          onClick={addQuestion}
        >
          <FaPlusCircle />
          Add Another Question
        </button>

        <button
          type="submit"
          className="create-btn"
          disabled={loading}
        >
          <FaSave />

          {loading
            ? "Creating Quiz..."
            : "Create Quiz"}

        </button>

      </form>

    </div>
  );
}

export default CreateQuiz;