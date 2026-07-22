import "./EmployerDashboard.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function EmployerDashboard() {

  const [jobs, setJobs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [totalApplicants, setTotalApplicants] = useState(0);

  const imageInputRef = useRef(null);

  useEffect(() => {
    fetchMyJobs();
    fetchProfile();
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

      const total = res.data.reduce(
        (sum, job) => sum + job.applicantCount,
        0
      );

      setTotalApplicants(total);

    } catch (error) {
      console.log(error);
    }
  };

  const fetchProfile = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data);

      const user = JSON.parse(localStorage.getItem("user"));

      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          name: res.data.name,
          profileImage: res.data.profileImage,
        })
      );

    } catch (error) {
      console.log(error);
    }
  };

  const uploadProfileImage = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.warning("Please select a valid image.");
      return;
    }

    const token = localStorage.getItem("token");

    const formData = new FormData();

    formData.append("profileImage", file);

    try {

      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      window.dispatchEvent(new Event("userUpdated"));

      fetchProfile();

      toast.success("Profile picture updated successfully.");

    } catch (error) {

      console.log(error);

      toast.error("Upload failed");

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

      toast.success(res.data.message);

      fetchMyJobs();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to delete job."
      );

    }

  };

  return (

    <div className="employer-dashboard">

      {/* Header */}

      <div className="dashboard-header">

        <div>

          <h1>
            Welcome back, {profile?.name || "Employer"} 👋
          </h1>

          <p>
            Manage your job postings, review applicants,
            and streamline your hiring process—all in one place.
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

      {/* Statistics */}

      <div className="stats-grid">

        <div className="stat-card">
          <div className="icon">💼</div>
          <h2>{jobs.length}</h2>
          <p>Jobs Posted</p>
        </div>

        <div className="stat-card">
          <div className="icon">👥</div>
          <h2>{totalApplicants}</h2>
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

      {/* Employer Profile */}

      <div className="profile-card">

        <img
          src={
            profile?.profileImage
              ? `http://localhost:5000/uploads/${profile.profileImage}`
              : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                  profile?.name || "Employer"
                )}&background=2563eb&color=fff`
          }
          alt="Profile"
          className="profile-image"
        />

        <h3>{profile?.name}</h3>

        <p className="profile-email">
          {profile?.email}
        </p>

        <span className="profile-role">
          Employer
        </span>

        <br />

        <button
          className="edit-btn"
          onClick={() => imageInputRef.current.click()}
        >
          📷 Change Picture
        </button>

        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={uploadProfileImage}
          style={{ display: "none" }}
        />

      </div>

      {/* Jobs Section */}

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
                    <span className="status-badge">
                      Active
                    </span>
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
                    Click on "Post New Job" to hire your first employee.
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