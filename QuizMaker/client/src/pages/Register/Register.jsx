import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaEye,
  FaEyeSlash,
  FaGraduationCap,
} from "react-icons/fa";
import API from "../../api/axios";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      await API.post("/auth/register", formData);

      toast.success("Account created successfully! 🎉");

      navigate("/login");

    } catch (error) {

      toast.error(
  error.response?.data?.message || "Registration Failed!"
);

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-header">

          <FaGraduationCap className="register-logo" />

          <div className="register-brand">
            QuizMaster
          </div>

          <h2>Create Account</h2>

          <p>
            Join QuizMaster and start creating amazing quizzes.
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <div className="password-field">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <span
              className="password-icon"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </span>

          </div>

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Creating Account..."
              : "Register"}
          </button>

        </form>

        <div className="register-footer">

          <p>

            Already have an account?

            <Link to="/login">
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Register;