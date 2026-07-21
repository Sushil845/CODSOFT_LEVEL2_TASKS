import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaBriefcase,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user"))
);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
useEffect(() => {
  const updateUser = () => {
    setUser(JSON.parse(localStorage.getItem("user")));
  };

  window.addEventListener("userUpdated", updateUser);

  return () => {
    window.removeEventListener("userUpdated", updateUser);
  };
}, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <nav className="navbar-custom">
      <div className="nav-container">

        {/* Logo */}
        <NavLink
          to="/"
          className="logo"
          onClick={() => setMenuOpen(false)}
        >
          <FaBriefcase className="logo-icon" />
          <div>
            <h2>CareerNest</h2>
            <span>Find Your Dream Job</span>
          </div>
        </NavLink>

        {/* Mobile Icon */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navigation */}
        <div className={menuOpen ? "nav-menu active" : "nav-menu"}>

          {/* Guest & Candidate */}
          {(!token || user?.role === "candidate") && (
            <ul className="nav-links">

              <li>
                <NavLink to="/" onClick={() => setMenuOpen(false)}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/jobs" onClick={() => setMenuOpen(false)}>
                  Jobs
                </NavLink>
              </li>

              <li>
                <NavLink to="/companies" onClick={() => setMenuOpen(false)}>
                  Companies
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" onClick={() => setMenuOpen(false)}>
                  About
                </NavLink>
              </li>

              {token && user?.role === "candidate" && (
                <li>
                  <NavLink
                    to="/saved-jobs"
                    onClick={() => setMenuOpen(false)}
                  >
                    ❤️ Saved Jobs
                  </NavLink>
                </li>
              )}

            </ul>
          )}

          {/* Employer */}
          {token && user?.role === "employer" && (
            <ul className="nav-links">

              <li>
                <NavLink to="/employer">
                  Dashboard
                </NavLink>
              </li>

              <li>
                <NavLink to="/post-job">
                  Post Job
                </NavLink>
              </li>

            </ul>
          )}

          {/* Right Side */}
          <div className="nav-buttons">

            {!token ? (
              <>
                <NavLink
                  to="/login"
                  className="login-btn"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="post-btn"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <div className="profile">

                <div
  className="profile-btn"
  onClick={() => setDropdownOpen(!dropdownOpen)}
>

  <img
    src={
      user?.profileImage
        ? `http://localhost:5000/uploads/${user.profileImage}`
        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
            user?.name || "User"
          )}&background=2563eb&color=fff`
    }
    alt="Profile"
    className="navbar-profile-image"
  />

  <span>
    {user?.name}
  </span>

</div>
                {dropdownOpen && (
                  <div className="dropdown">

                    {user?.role === "candidate" ? (
                      <>
                        <NavLink
                          to="/candidate"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Dashboard
                        </NavLink>

                        <NavLink
                          to="/saved-jobs"
                          onClick={() => setDropdownOpen(false)}
                        >
                          ❤️ Saved Jobs
                        </NavLink>
                      </>
                    ) : (
                      <>
                        <NavLink
                          to="/employer"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Employer Dashboard
                        </NavLink>

                        <NavLink
                          to="/post-job"
                          onClick={() => setDropdownOpen(false)}
                        >
                          Post Job
                        </NavLink>
                      </>
                    )}

                    <button onClick={logout}>
                      Logout
                    </button>

                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;