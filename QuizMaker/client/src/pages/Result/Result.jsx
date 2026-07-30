import { Link, Navigate, useLocation } from "react-router-dom";
import {
  FaCheckCircle,
  FaTrophy,
  FaPercentage,
  FaClipboardCheck,
  FaHome,
  FaHistory,
} from "react-icons/fa";
import "./Result.css";

function Result() {
  const location = useLocation();
  const result = location.state;

  if (!result) {
    return <Navigate to="/quizzes" replace />;
  }

  const { score, totalQuestions, percentage } = result;

  let status = "";
  let statusClass = "";
  let message = "";

  if (percentage >= 80) {
    status = "Excellent";
    statusClass = "excellent";
    message =
      "Outstanding work! You have an excellent understanding of the topic. 🎉";
  } else if (percentage >= 50) {
    status = "Good";
    statusClass = "good";
    message =
      "Good job! Keep practicing to improve your score even more. 👍";
  } else {
    status = "Needs Improvement";
    statusClass = "poor";
    message =
      "Don't give up! Practice more and you'll score better next time. 💪";
  }

  return (
    <div className="result-page">

      <div className="result-card">

        {/* Success Icon */}

        <div className="success-circle">
          <FaCheckCircle className="success-icon" />
        </div>

        <h2>Congratulations!</h2>

        <p className="subtitle">
          You've successfully completed the quiz.
        </p>

        {/* Score */}

        <div className="score-section">

          <h3>Your Score</h3>

          <div className="score-value">
            {score} / {totalQuestions}
          </div>

          <div className="percentage-value">
            {percentage.toFixed(0)}%
          </div>

        </div>

        {/* Stats */}

        <div className="stats">

          <div className="stat-box">

            <FaTrophy />

            <h4>Score</h4>

            <span>
              {score}/{totalQuestions}
            </span>

          </div>

          <div className="stat-box">

            <FaPercentage />

            <h4>Percentage</h4>

            <span>{percentage.toFixed(0)}%</span>

          </div>

          <div className="stat-box">

            <FaClipboardCheck />

            <h4>Status</h4>

            <span className={statusClass}>
              {status}
            </span>

          </div>

        </div>

        {/* Message */}

        <div className="performance-message">

          {message}

        </div>

        {/* Buttons */}

        <div className="button-group">

          <Link
            to="/"
            className="home-btn"
          >
            <FaHome />
            Home
          </Link>

          <Link
            to="/my-attempts"
            className="attempt-btn"
          >
            <FaHistory />
            My Attempts
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Result;