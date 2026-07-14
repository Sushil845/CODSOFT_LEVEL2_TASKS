import "./CandidateDashboard.css";

function CandidateDashboard() {
  return (
    <div className="candidate-dashboard">

      <div className="welcome-card">
        <h1>👋 Welcome Back, Sushil</h1>
        <p>Manage your applications and track your career journey.</p>
      </div>

      <div className="stats-container">

        <div className="stat-card">
          <h2>12</h2>
          <p>Applied Jobs</p>
        </div>

        <div className="stat-card">
          <h2>5</h2>
          <p>Saved Jobs</p>
        </div>

        <div className="stat-card">
          <h2>2</h2>
          <p>Interviews</p>
        </div>

      </div>

      <div className="applications-card">

        <h2>Recent Applications</h2>

        <table>

          <thead>
            <tr>
              <th>Job</th>
              <th>Company</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Java Developer</td>
              <td>TCS</td>
              <td className="review">Under Review</td>
            </tr>

            <tr>
              <td>React Developer</td>
              <td>Infosys</td>
              <td className="interview">Interview</td>
            </tr>

            <tr>
              <td>Python Developer</td>
              <td>Accenture</td>
              <td className="applied">Applied</td>
            </tr>

          </tbody>

        </table>

      </div>

      <div className="profile-card">

        <h2>Profile Completion</h2>

        <div className="progress-bar">
          <div className="progress"></div>
        </div>

        <p>80% Completed</p>

        <button>Edit Profile</button>

      </div>

    </div>
  );
}

export default CandidateDashboard;