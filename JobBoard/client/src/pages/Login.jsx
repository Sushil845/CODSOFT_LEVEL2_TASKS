import { FaEnvelope, FaLock } from "react-icons/fa";
import "../styles/Login.css";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setShowForgotPassword(false);

      toast.success(res.data.message);

      if (res.data.user.role === "candidate") {
        navigate("/candidate");
      } else {
        navigate("/employer");
      }
    } catch (err) {
      const data = err.response?.data;

      if (data?.showForgotPassword) {
        setShowForgotPassword(true);

        toast.error(
          "Invalid Credentials! Having trouble signing in? Please reset your password."
        );
      } else if (data?.remainingAttempts !== undefined) {
        toast.warning(
          `Invalid Credentials! ${data.remainingAttempts} attempt(s) remaining.`
        );
      } else {
        toast.error(data?.message || "Login Failed");
      }
    }
  };

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
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <FaLock className="input-icon" />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        {showForgotPassword && (
          <p
            className="bottom-text"
            style={{ marginTop: "15px", color: "#dc2626" }}
          >
            Having trouble signing in?
            <br />
            <Link to="/forgot-password">
              Forgot Password?
            </Link>
          </p>
        )}

        <p className="bottom-text">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;