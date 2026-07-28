import { Link, useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">

        <Link className="navbar-brand" to="/">
          <FaGraduationCap className="me-2" />
          QuizMaster
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav align-items-center">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/quizzes">
                Quizzes
              </Link>
            </li>

            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/create">
                    Create Quiz
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/my-quizzes">
                    My Quizzes
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/my-attempts">
                    My Attempts
                  </Link>
                </li>

                <li className="nav-item ms-3">
                  <button
                    className="btn btn-danger logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;