import { Link, Navigate, useLocation } from "react-router-dom";
import {
  FaCheckCircle,
  FaTrophy,
  FaPercentage,
  FaClipboardCheck,
} from "react-icons/fa";
import "./Result.css";

function Result() {
  const location = useLocation();
  const result = location.state;

  if (!result) {
    return <Navigate to="/quizzes" />;
  }

  const { score, totalQuestions, percentage } = result;

  let status = "";
  let statusClass = "";

  if (percentage >= 80) {
    status = "Excellent";
    statusClass = "excellent";
  } else if (percentage >= 50) {
    status = "Good";
    statusClass = "good";
  } else {
    status = "Needs Improvement";
    statusClass = "poor";
  }

  return (
    <div className="result-page">

      <div className="result-card">
        
        <FaCheckCircle className="success-icon" />

        <h2>Quiz Completed</h2>

        <p className="subtitle">
          Your quiz has been submitted successfully.
        </p>

        <div className="stats">

          <div className="stat-box">
            <FaTrophy />
            <h4>Score</h4>
            <span>
              {score} / {totalQuestions}
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
            <span className={statusClass}>{status}</span>
          </div>

        </div>

        <div className="button-group">

          <Link to="/" className="home-btn">
            Home
          </Link>

          <Link to="/my-attempts" className="attempt-btn">
            My Attempts
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Result;