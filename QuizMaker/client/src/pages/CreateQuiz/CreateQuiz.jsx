import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleOptionChange = (qIndex, optionIndex, value) => {
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

    const updated = questions.filter((_, i) => i !== index);
    setQuestions(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("Quiz title is required");
      return;
    }

    for (let q of questions) {
      if (!q.question.trim()) {
        alert("Every question must have text");
        return;
      }

      for (let option of q.options) {
        if (!option.trim()) {
          alert("All options are required");
          return;
        }
      }
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

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

      alert("Quiz Created Successfully!");

      navigate("/my-quizzes");

    } catch (error) {
      console.log(error);
      alert("Failed to create quiz");
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="create-page">

      <form className="create-card" onSubmit={handleSubmit}>

        <div className="page-header">
          <h2>Create New Quiz</h2>
          <p>Create engaging multiple-choice quizzes for your students.</p>
        </div>

        <div className="input-group">
          <label>Quiz Title</label>

          <input
            type="text"
            placeholder="Enter Quiz Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label>Description</label>

          <textarea
            rows="3"
            placeholder="Enter Quiz Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {questions.map((question, index) => (

          <div className="question-card" key={index}>

            <div className="question-header">

              <h3>Question {index + 1}</h3>

              {questions.length > 1 && (

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => removeQuestion(index)}
                >
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
                  handleQuestionChange(index, e.target.value)
                }
                required
              />

            </div>

            <div className="options-grid">

              <input
                type="text"
                placeholder="Option A"
                value={question.options[0]}
                onChange={(e) =>
                  handleOptionChange(index, 0, e.target.value)
                }
                required
              />

              <input
                type="text"
                placeholder="Option B"
                value={question.options[1]}
                onChange={(e) =>
                  handleOptionChange(index, 1, e.target.value)
                }
                required
              />

              <input
                type="text"
                placeholder="Option C"
                value={question.options[2]}
                onChange={(e) =>
                  handleOptionChange(index, 2, e.target.value)
                }
                required
              />

              <input
                type="text"
                placeholder="Option D"
                value={question.options[3]}
                onChange={(e) =>
                  handleOptionChange(index, 3, e.target.value)
                }
                required
              />

            </div>

            <div className="input-group">

              <label>Correct Answer</label>

              <select
                value={question.correctAnswer}
                onChange={(e) =>
                  handleCorrectAnswer(index, e.target.value)
                }
              >
                <option value={0}>Option A</option>
                <option value={1}>Option B</option>
                <option value={2}>Option C</option>
                <option value={3}>Option D</option>
              </select>

            </div>

          </div>

        ))}

        <button
          type="button"
          className="add-question-btn"
          onClick={addQuestion}
        >
          + Add Another Question
        </button>

        <button
          type="submit"
          className="create-btn"
          disabled={loading}
        >
          {loading ? "Creating Quiz..." : "Create Quiz"}
        </button>

      </form>

    </div>
  );
}

export default CreateQuiz;