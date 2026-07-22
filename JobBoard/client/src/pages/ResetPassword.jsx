import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/Login.css";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/reset-password",
        {
          email,
          password,
        }
      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Password Reset Failed"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Reset Password</h1>

        <p className="login-subtitle">
          Enter your new password.
        </p>

        <div className="input-box">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button
          className="login-btn"
          onClick={handleResetPassword}
        >
          Reset Password
        </button>

        <p className="bottom-text">
          <Link to="/login">Back to Login</Link>
        </p>

      </div>
    </div>
  );
}

export default ResetPassword;