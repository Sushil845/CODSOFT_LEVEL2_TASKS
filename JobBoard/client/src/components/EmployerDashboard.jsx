import "./EmployerDashboard.css";

function EmployerDashboard() {
  return (
    <div className="employer-dashboard">

      <div className="dashboard-header">
        <h1>Employer Dashboard</h1>
        <button className="post-job-btn">
          + Post New Job
        </button>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>18</h2>
          <p>Jobs Posted</p>
        </div>

        <div className="stat-card">
          <h2>154</h2>
          <p>Total Applicants</p>
        </div>

        <div className="stat-card">
          <h2>8</h2>
          <p>Active Jobs</p>
        </div>

        <div className="stat-card">
          <h2>12</h2>
          <p>Interviews Scheduled</p>
        </div>

      </div>

      <div className="jobs-section">

        <h2>Your Posted Jobs</h2>

        <table>

          <thead>
            <tr>
              <th>Job Title</th>
              <th>Applicants</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>

            <tr>
              <td>Java Backend Developer</td>
              <td>42</td>
              <td className="active">Active</td>
            </tr>

            <tr>
              <td>React Frontend Developer</td>
              <td>31</td>
              <td className="active">Active</td>
            </tr>

            <tr>
              <td>Python Developer</td>
              <td>18</td>
              <td className="closed">Closed</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default EmployerDashboard;