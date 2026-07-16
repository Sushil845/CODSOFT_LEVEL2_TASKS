import "./EmployerDashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function EmployerDashboard() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchMyJobs();
  }, []);

  // Fetch Employer Jobs
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

  // Delete Job
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

        <h1>Employer Dashboard</h1>

        <Link
          to="/post-job"
          style={{ textDecoration: "none" }}
        >
          <button className="post-job-btn">
            + Post New Job
          </button>
        </Link>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <h2>{jobs.length}</h2>
          <p>Jobs Posted</p>
        </div>

        <div className="stat-card">
          <h2>-</h2>
          <p>Total Applicants</p>
        </div>

        <div className="stat-card">
          <h2>{jobs.length}</h2>
          <p>Active Jobs</p>
        </div>

        <div className="stat-card">
          <h2>-</h2>
          <p>Interviews Scheduled</p>
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

                  <td className="active">
                    Active
                  </td>

                  <td>

                    <Link
                      to={`/applicants/${job._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        style={{
                          background: "#2563eb",
                          color: "#fff",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          marginRight: "8px",
                          fontWeight: "600",
                        }}
                      >
                        View Applicants
                      </button>
                    </Link>

                    <Link
                      to={`/edit-job/${job._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <button
                        style={{
                          background: "#f59e0b",
                          color: "#fff",
                          border: "none",
                          padding: "8px 14px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          marginRight: "8px",
                          fontWeight: "600",
                        }}
                      >
                        ✏️ Edit
                      </button>
                    </Link>

                    <button
                      onClick={() => deleteJob(job._id)}
                      style={{
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        padding: "8px 14px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                      }}
                    >
                      🗑 Delete
                    </button>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="5"
                  style={{
                    textAlign: "center",
                    padding: "20px",
                  }}
                >
                  No jobs posted yet.
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