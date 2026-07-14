import { Link } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
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

          <Link to="/login" className="login-btn">
            Login
          </Link>

          <Link to="/employer" className="post-btn">
            Post a Job
          </Link>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;