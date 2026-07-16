import { Link, useNavigate } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");

  };

  return (
    <nav className="navbar-custom">

      <div className="nav-container">

        {/* Logo */}
        <Link to="/" className="logo">
          <FaBriefcase className="logo-icon" />
          CareerNest
        </Link>

        {/* Navigation */}
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/jobs">Jobs</Link></li>
          <li><Link to="/companies">Companies</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>

        {/* Right Side */}
        <div className="nav-buttons">

          {!token ? (

            <>
              <Link to="/login" className="login-btn">
                Login
              </Link>

              <Link to="/employer" className="post-btn">
                Post a Job
              </Link>
            </>

          ) : (

            <>
              {user?.role === "candidate" && (
                <Link to="/candidate" className="login-btn">
                  Dashboard
                </Link>
              )}

              {user?.role === "employer" && (
                <Link to="/employer" className="login-btn">
                  Employer Dashboard
                </Link>
              )}

              <button
                onClick={logout}
                className="post-btn"
              >
                Logout
              </button>
            </>

          )}

        </div>

      </div>

    </nav>
  );
}

export default Navbar;