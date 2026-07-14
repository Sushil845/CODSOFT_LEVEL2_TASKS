import "./AboutSection.css";

function AboutSection() {
  return (
    <div className="about-container">

      <section className="about-hero">
        <h1>About CareerNest</h1>
        <p>
          CareerNest is a modern job portal connecting talented candidates
          with top companies across India.
        </p>
      </section>

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

      <section className="cta-section">

        <h2>Ready to build your career?</h2>

        <p>
          Join thousands of professionals who trust CareerNest.
        </p>

        <button>Get Started</button>

      </section>

    </div>
  );
}

export default AboutSection;