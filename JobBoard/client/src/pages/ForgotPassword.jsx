import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/Login.css";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSendOtp = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/forgot-password",
        { email }
      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/verify-otp", {
          state: { email },
        });
      }, 1500);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Forgot Password</h1>

        <p className="login-subtitle">
          Enter your registered email to receive an OTP.
        </p>

        <div className="input-box">
          <FaEnvelope className="input-icon" />

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          className="login-btn"
          onClick={handleSendOtp}
        >
          Send OTP
        </button>

        <p className="bottom-text">
          <Link to="/login">
            Back to Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default ForgotPassword;