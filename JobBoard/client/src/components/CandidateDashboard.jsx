import { useEffect, useState } from "react";
import axios from "axios";
import "./CandidateDashboard.css";

function CandidateDashboard() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/applications/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="candidate-dashboard">
      <div className="welcome-card">
        <h1>👋 Welcome Back, {user?.name}</h1>
        <p>Manage your applications and track your career journey.</p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h2>{applications.length}</h2>
          <p>Applied Jobs</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
          <p>Saved Jobs</p>
        </div>

        <div className="stat-card">
          <h2>0</h2>
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
            {applications.length > 0 ? (
              applications.map((app) => (
                <tr key={app._id}>
                  <td>{app.job?.title}</td>
                  <td>{app.job?.company}</td>
                  <td className="applied">Applied</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No applications found.
                </td>
              </tr>
            )}
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