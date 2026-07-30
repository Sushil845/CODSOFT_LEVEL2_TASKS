import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="footer-container">

        <h3>QuizMaster</h3>

        <p>
          A modern MERN Stack Quiz Platform for creating,
          attempting, and tracking quizzes.
        </p>

        <div className="footer-links">

          <a
            href="https://github.com/"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>

          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noreferrer"
          >
            <FaLinkedin />
          </a>

          <a href="mailto:sushil.0202020@gmail.com">
            <FaEnvelope />
          </a>

        </div>

        <hr />

        <p className="copyright">
          © {year} QuizMaster • Built with React, Node.js,
          Express & MongoDB
        </p>

      </div>

    </footer>
  );
}

export default Footer;