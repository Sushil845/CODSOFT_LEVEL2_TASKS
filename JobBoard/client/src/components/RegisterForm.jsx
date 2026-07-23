import "./RegisterForm.css";
import { FaUser, FaEnvelope, FaLock, FaBriefcase } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function RegisterForm() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "candidate"
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {

      const res = await axios.post(
        "https://codsoft-level2-tasks.onrender.com/api/auth/register",
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        }
      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (err) {

      toast.error(err.response?.data?.message || "Registration Failed");

    }

  };

  return (
    <div className="register-container">
      <div className="register-card">

        <h1>Create Account 🎉</h1>

        <p>Join CareerNest and start your career journey.</p>

        <form onSubmit={handleSubmit}>

          <div className="input-box">
            <FaUser className="icon" />
            <input
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaEnvelope className="icon" />
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaLock className="icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-box">
            <FaBriefcase className="icon" />

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="candidate">Candidate</option>
              <option value="employer">Employer</option>
            </select>

          </div>

          <button className="register-btn-form" type="submit">
            Register
          </button>

          <p className="login-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default RegisterForm;