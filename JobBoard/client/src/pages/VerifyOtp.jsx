import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "../styles/Login.css";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";

  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async () => {
    try {
      const res = await axios.post(
        "https://codsoft-level2-tasks.onrender.com/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/reset-password", {
          state: { email },
        });
      }, 1500);

    } catch (err) {
      toast.error(
        err.response?.data?.message || "OTP Verification Failed"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">

        <h1>Verify OTP</h1>

        <p className="login-subtitle">
          Enter the 6-digit OTP sent to your email.
        </p>

        <div className="input-box">
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>

        <button
          className="login-btn"
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </button>

      </div>
    </div>
  );
}

export default VerifyOtp;