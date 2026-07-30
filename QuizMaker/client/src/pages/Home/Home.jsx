import { Link } from "react-router-dom";
import {
  FaBookOpen,
  FaPenFancy,
  FaChartLine,
  FaArrowRight,
  FaGraduationCap,
  FaCheckCircle,
} from "react-icons/fa";

import "./Home.css";

function Home() {
  return (
    <>
      {/* Hero Section */}

      <section className="hero">

        <div className="hero-content container">

          <div className="hero-badge">
            <FaGraduationCap />
            <span>Welcome to QuizMaster</span>
          </div>

          <h1>
            Challenge Your Mind.
            <br />
            Learn Something New Every Day.
          </h1>

          <p>
            Create interactive quizzes, challenge your friends,
            improve your knowledge, and track your learning
            journey with QuizMaster.
          </p>

          <div className="hero-buttons">

            <Link
              to="/quizzes"
              className="primary-btn"
            >
              Explore Quizzes
              <FaArrowRight />
            </Link>

            <Link
              to="/create"
              className="secondary-btn"
            >
              Create Quiz
            </Link>

          </div>

        </div>

      </section>

      {/* Features */}

      <section className="features container">

        <div className="section-title">

          <h2>Why Choose QuizMaster?</h2>

          <p>
            Everything you need for an engaging quiz
            experience.
          </p>

        </div>

        <div className="feature-grid">

          <div className="feature-card">

            <FaPenFancy className="feature-icon" />

            <h3>Create Quizzes</h3>

            <p>
              Build unlimited quizzes with
              multiple-choice questions in minutes.
            </p>

          </div>

          <div className="feature-card">

            <FaBookOpen className="feature-icon" />

            <h3>Attempt Quizzes</h3>

            <p>
              Practice with quizzes created by
              the community and improve your skills.
            </p>

          </div>

          <div className="feature-card">

            <FaChartLine className="feature-icon" />

            <h3>Track Progress</h3>

            <p>
              Monitor your scores and review
              every quiz you've attempted.
            </p>

          </div>

        </div>

      </section>

      {/* Benefits */}

      <section className="benefits">

        <div className="container">

          <div className="section-title">

            <h2>Why Students Love QuizMaster</h2>

          </div>

          <div className="benefit-grid">

            <div>
              <FaCheckCircle />
              Secure JWT Authentication
            </div>

            <div>
              <FaCheckCircle />
              Interactive Quiz Experience
            </div>

            <div>
              <FaCheckCircle />
              Instant Score Calculation
            </div>

            <div>
              <FaCheckCircle />
              Modern Responsive Design
            </div>

            <div>
              <FaCheckCircle />
              Community Quiz Sharing
            </div>

            <div>
              <FaCheckCircle />
              Track Quiz History
            </div>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="cta">

        <div className="container">

          <h2>Ready to Become a Quiz Master?</h2>

          <p>
            Start creating quizzes, challenge your friends,
            and improve your learning today.
          </p>

          <Link
            to="/quizzes"
            className="cta-btn"
          >
            Start Now
          </Link>

        </div>

      </section>

    </>
  );
}

export default Home;