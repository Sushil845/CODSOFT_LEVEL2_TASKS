import "./RegisterForm.css";
import { FaUser, FaEnvelope, FaLock, FaBriefcase } from "react-icons/fa";
import { Link } from "react-router-dom";

function RegisterForm() {
  return (
    <div className="register-container">
      <div className="register-card">
        <h1>Create Account 🎉</h1>
        <p>Join CareerNest and start your career journey.</p>

        <form>
          <div className="input-box">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Enter your full name"
            />
          </div>

          <div className="input-box">
            <FaEnvelope className="icon" />
            <input
              type="email"
              placeholder="Enter your email"
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Enter your password"
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="Confirm password"
            />
          </div>

          <div className="input-box">
            <FaBriefcase className="icon" />
            <select>
              <option>Candidate</option>
              <option>Employer</option>
            </select>
          </div>

          <button className="register-btn-form">
            Register
          </button>

          <p className="login-link">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;