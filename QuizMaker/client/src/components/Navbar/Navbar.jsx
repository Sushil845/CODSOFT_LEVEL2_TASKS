import { NavLink, useNavigate } from "react-router-dom";
import { FaGraduationCap } from "react-icons/fa";
import { toast } from "react-toastify";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully 👋");

    navigate("/login");
  };

  const handleProtectedNavigation = (path) => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.warning("Please login to continue.");

      navigate("/login");

      return;
    }

    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container">

        <NavLink className="navbar-brand" to="/">
          <FaGraduationCap />
          QuizMaster
        </NavLink>

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

          <ul className="navbar-nav">

            <li className="nav-item">

              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Home
              </NavLink>

            </li>

            <li className="nav-item">

              <NavLink
                to="/quizzes"
                className={({ isActive }) =>
                  isActive
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Quizzes
              </NavLink>

            </li>

            {token ? (

              <>

                <li className="nav-item">

                  <button
                    className="nav-link nav-btn"
                    onClick={() =>
                      handleProtectedNavigation("/create")
                    }
                  >
                    Create Quiz
                  </button>

                </li>

                <li className="nav-item">

                  <button
                    className="nav-link nav-btn"
                    onClick={() =>
                      handleProtectedNavigation("/my-quizzes")
                    }
                  >
                    My Quizzes
                  </button>

                </li>

                <li className="nav-item">

                  <button
                    className="nav-link nav-btn"
                    onClick={() =>
                      handleProtectedNavigation("/my-attempts")
                    }
                  >
                    My Attempts
                  </button>

                </li>

                <li className="nav-item ms-lg-3 mt-3 mt-lg-0">

                  <button
                    className="logout-btn"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>

                </li>

              </>

            ) : (

              <>

                <li className="nav-item">

                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    Login
                  </NavLink>

                </li>

                <li className="nav-item">

                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    Register
                  </NavLink>

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