import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  getQuizById,
  updateQuiz,
} from "../../services/editQuizService";
import "./EditQuiz.css";

function EditQuiz() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuiz();
  }, []);

  const fetchQuiz = async () => {
    try {

      const data = await getQuizById(id);

      setTitle(data.title);

      setDescription(data.description);

      setQuestions(data.questions);

    } catch (error) {

      console.log(error);

      alert("Failed to load quiz.");

    } finally {

      setLoading(false);

    }
  };

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

  const handleCorrectAnswer = (index, value) => {

    const updated = [...questions];

    updated[index].correctAnswer = Number(value);

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

    const updated = [...questions];

    updated.splice(index, 1);

    setQuestions(updated);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await updateQuiz(id, {
        title,
        description,
        questions,
      });

toast.success("Quiz updated successfully! ✏️");

      navigate("/my-quizzes");

    } catch (error) {

      console.log(error);

      toast.error("Failed to update quiz.");

    }

  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }
    return (
    <div className="edit-page">

      <form className="edit-card" onSubmit={handleSubmit}>

        <div className="page-header">

          <h2>Edit Quiz</h2>

          <p>Update your quiz details and questions.</p>

        </div>

        <div className="input-group">

          <label>Quiz Title</label>

          <input
            type="text"
            value={title}
            placeholder="Quiz Title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

        </div>

        <div className="input-group">

          <label>Description</label>

          <textarea
            rows="3"
            value={description}
            placeholder="Quiz Description"
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
                value={question.question}
                placeholder="Enter Question"
                onChange={(e) =>
                  handleQuestionChange(index, e.target.value)
                }
                required
              />

            </div>

            <div className="options-grid">

              {question.options.map((option, optionIndex) => (

                <input
                  key={optionIndex}
                  type="text"
                  placeholder={`Option ${String.fromCharCode(
                    65 + optionIndex
                  )}`}
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

              ))}

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
          className="update-btn"
        >
          Update Quiz
        </button>

      </form>

    </div>
  );
}

export default EditQuiz;