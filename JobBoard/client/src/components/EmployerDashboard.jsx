import "./EmployerDashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  const fetchMyJobs = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/jobs/myjobs",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      const res = await axios.delete(
        `http://localhost:5000/api/jobs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      fetchMyJobs();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete job."
      );
    }
  };

  return (
    <div className="employer-dashboard">

      <div className="dashboard-header">
        <div>
          <h1>👋 Welcome Back Employer</h1>
          <p>
            Manage your job postings, review applicants, and streamline your hiring process—all in one place.
          </p>
        </div>

        <Link
          to="/post-job"
          style={{ textDecoration: "none" }}
        >
          <button className="post-job-btn">
            🚀 Post New Job
          </button>
        </Link>
      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="icon">💼</div>
          <h2>{jobs.length}</h2>
          <p>Jobs Posted</p>
        </div>

        <div className="stat-card">
          <div className="icon">👥</div>
          <h2>0</h2>
          <p>Total Applicants</p>
        </div>

        <div className="stat-card">
          <div className="icon">✅</div>
          <h2>{jobs.length}</h2>
          <p>Active Jobs</p>
        </div>

        <div className="stat-card">
          <div className="icon">📅</div>
          <h2>0</h2>
          <p>Interviews</p>
        </div>

      </div>

      <div className="jobs-section">

        <h2>Your Posted Jobs</h2>

        <table>

          <thead>

            <tr>
              <th>Job Title</th>
              <th>Company</th>
              <th>Location</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {jobs.length > 0 ? (

              jobs.map((job) => (

                <tr key={job._id}>

                  <td>{job.title}</td>

                  <td>{job.company}</td>

                  <td>{job.location}</td>

                  <td>{job.salary}</td>

                  <td>
  <span className="status-badge">Active</span>
</td>

                  <td>

                    <Link
                      to={`/applicants/${job._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button className="view-btn">
                        👥 Applicants
                      </button>
                    </Link>

                    <Link
                      to={`/edit-job/${job._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button className="edit-btn">
                        ✏ Edit
                      </button>
                    </Link>

                    <button
                      className="delete-btn"
                      onClick={() => deleteJob(job._id)}
                    >
                      🗑 Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="6"
                  style={{
                    textAlign: "center",
                    padding: "50px",
                  }}
                >
                  <h3>📭 No jobs posted yet</h3>

                  <p>
                    Click on "Post New Job" to hire your
                    first employee.
                  </p>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default EmployerDashboard;
