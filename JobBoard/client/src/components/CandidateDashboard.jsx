import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./CandidateDashboard.css";

function CandidateDashboard() {
  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");

  const fileInputRef = useRef(null);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchApplications();
    fetchProfile();
  }, []);

  const fetchApplications = async () => {
    try {
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

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data);
      setEditName(res.data.name);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadResume = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload PDF only.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", file);

      await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Resume uploaded successfully.");

      fetchProfile();
    } catch (error) {
      console.log(error);
      alert("Resume upload failed.");
    }
  };

  const updateProfile = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/api/auth/profile",
        {
          name: editName,
          password: editPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Profile Updated Successfully");

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      setShowEditModal(false);
      setEditPassword("");

      fetchProfile();

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Profile Update Failed");
    }
  };

  /* ---------- RETURN STARTS IN PART 2 ---------- */
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
          <h2>
            {
              applications.filter(
                (app) => app.status === "Approved"
              ).length
            }
          </h2>
          <p>Interviews</p>
        </div>

      </div>

      <div className="applications-card">

        <h2>👤 My Profile</h2>

        {profile && (
          <>
            <p><strong>Name:</strong> {profile.name}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Role:</strong> {profile.role}</p>

            <input
              type="file"
              accept=".pdf"
              ref={fileInputRef}
              onChange={uploadResume}
              style={{ display: "none" }}
            />

            <div className="resume-buttons">

              <button
                onClick={() => fileInputRef.current.click()}
              >
                {profile.resume
                  ? "📤 Change Resume"
                  : "📤 Upload Resume"}
              </button>

              {profile.resume && (
                <a
                  href={`http://localhost:5000/uploads/${profile.resume}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <button>
                    📄 View Resume
                  </button>
                </a>
              )}

              {profile.resume && (
                <a
                  href={`http://localhost:5000/uploads/${profile.resume}`}
                  download
                >
                  <button>
                    ⬇ Download Resume
                  </button>
                </a>
              )}

            </div>

            {!profile.resume && (
              <p
                style={{
                  marginTop: "15px",
                  color: "#ef4444",
                  fontWeight: "600",
                }}
              >
                No Resume Uploaded
              </p>
            )}

            <button
              style={{ marginTop: "20px" }}
              onClick={() => setShowEditModal(true)}
            >
              ✏ Edit Profile
            </button>

          </>
        )}

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

                  <td>

                    {app.status === "Pending" && (
                      <span
                        style={{
                          color: "#f59e0b",
                          fontWeight: "bold",
                        }}
                      >
                        🟡 Pending
                      </span>
                    )}

                    {app.status === "Approved" && (
                      <span
                        style={{
                          color: "#16a34a",
                          fontWeight: "bold",
                        }}
                      >
                        🟢 Approved
                      </span>
                    )}

                    {app.status === "Rejected" && (
                      <span
                        style={{
                          color: "#dc2626",
                          fontWeight: "bold",
                        }}
                      >
                        🔴 Rejected
                      </span>
                    )}

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="3"
                  style={{
                    textAlign: "center",
                    padding: "30px",
                  }}
                >
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
          <div
            className="progress"
            style={{
              width: `${profile?.profileCompletion || 0}%`,
            }}
          ></div>
        </div>

        <p>{profile?.profileCompletion || 0}% Completed</p>

        <button
          onClick={() => setShowEditModal(true)}
        >
          ✏ Edit Profile
        </button>

      </div>

      {showEditModal && (
        <div className="modal-overlay">

          <div className="edit-modal">

            <h2>Edit Profile</h2>

            <div className="form-group">
              <label>Name</label>

              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>

              <input
                type="email"
                value={profile?.email || ""}
                disabled
              />
            </div>

            <div className="form-group">
              <label>New Password</label>

              <input
                type="password"
                placeholder="Leave blank to keep current password"
                value={editPassword}
                onChange={(e) => setEditPassword(e.target.value)}
              />
            </div>

            <div className="modal-buttons">

              <button
                className="save-btn"
                onClick={updateProfile}
              >
                💾 Save Changes
              </button>

              <button
                className="cancel-btn"
                onClick={() => {
                  setShowEditModal(false);
                  setEditPassword("");
                  setEditName(profile?.name || "");
                }}
              >
                ❌ Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}

export default CandidateDashboard;