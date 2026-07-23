import "./AboutSection.css";
import { useNavigate } from "react-router-dom";

function AboutSection() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleGetStarted = () => {

    // Not Logged In
    if (!token || !user) {
      navigate("/register");
      return;
    }

    // Candidate
    if (user.role === "candidate") {
      navigate("/candidate");
      return;
    }

    // Employer
    if (user.role === "employer") {
      navigate("/employer");
      return;
    }

    navigate("/");

  };

  const getCTAContent = () => {

    if (!token || !user) {
      return {
        title: "Ready to build your career?",
        description:
          "Join thousands of professionals who trust CareerNest.",
        button: "Get Started",
      };
    }

    if (user.role === "candidate") {
      return {
        title: "Discover Your Next Opportunity",
        description:
          "Browse thousands of verified jobs and apply in just a few clicks.",
        button: "Browse Jobs",
      };
    }

    if (user.role === "employer") {
      return {
        title: "Find Your Next Great Hire",
        description:
          "Post jobs, manage applicants, and hire top talent faster with CareerNest.",
        button: "Manage Jobs",
      };
    }

    return {
      title: "Welcome to CareerNest",
      description: "Start exploring our platform today.",
      button: "Explore",
    };

  };

  const cta = getCTAContent();

  return (

    <div className="about-container">

      {/* Hero Section */}

      <section className="about-hero">

        <h1>About CareerNest</h1>

        <p>
          CareerNest is a modern job portal connecting talented candidates
          with top companies across India.
        </p>

      </section>

      {/* About Content */}

      <section className="about-content">

        <div className="about-card">

          <h2>🎯 Our Mission</h2>

          <p>
            Our mission is to simplify hiring by providing a single platform
            where job seekers and employers can connect efficiently.
          </p>

        </div>

        <div className="about-card">

          <h2>🚀 Why CareerNest?</h2>

          <ul>
            <li>Verified Job Listings</li>
            <li>Easy Job Applications</li>
            <li>Employer Dashboard</li>
            <li>Candidate Dashboard</li>
            <li>Fast & Secure Platform</li>
          </ul>

        </div>

      </section>

      {/* Statistics */}

      <section className="stats-section">

        <div className="stat-card">
          <h2>20K+</h2>
          <p>Candidates</p>
        </div>

        <div className="stat-card">
          <h2>350+</h2>
          <p>Companies</p>
        </div>

        <div className="stat-card">
          <h2>12K+</h2>
          <p>Jobs Posted</p>
        </div>

        <div className="stat-card">
          <h2>95%</h2>
          <p>Hiring Success</p>
        </div>

      </section>

      {/* CTA Section */}

      <section className="cta-section">

        <h2>{cta.title}</h2>

        <p>{cta.description}</p>

        <button onClick={handleGetStarted}>
          {cta.button}
        </button>

      </section>

    </div>

  );

}

export default AboutSection;