import { FaEnvelope, FaLock } from "react-icons/fa";
import "../styles/Login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Welcome Back 👋</h1>
        <p className="login-subtitle">
          Login to continue your CareerNest journey.
        </p>

        <div className="input-box">
          <FaEnvelope className="input-icon" />
          <input
            type="email"
            placeholder="Enter your email"
          />
        </div>

        <div className="input-box">
          <FaLock className="input-icon" />
          <input
            type="password"
            placeholder="Enter your password"
          />
        </div>

        <button className="login-btn">
          Login
        </button>

        <p className="bottom-text">
          Don't have an account? <span>Register</span>
        </p>

      </div>
    </div>
  );
}

export default Login;