import "./CandidateDashboard.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CandidateDashboard() {

  const [applications, setApplications] = useState([]);
  const [profile, setProfile] = useState(null);

  const [showEditModal, setShowEditModal] = useState(false);

  const [editName, setEditName] = useState("");
  const [editPassword, setEditPassword] = useState("");

  // Resume Upload
  const fileInputRef = useRef(null);

  // Profile Picture Upload
  const imageInputRef = useRef(null);

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchApplications();
    fetchProfile();
  }, []);

  // ===============================
  // Fetch Candidate Applications
  // ===============================

  const fetchApplications = async () => {

    try {

      const res = await axios.get(
        "https://codsoft-level2-tasks.onrender.com/api/applications/my",
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

  // ===============================
  // Fetch Profile
  // ===============================

  const fetchProfile = async () => {

    try {

      const res = await axios.get(
        "https://codsoft-level2-tasks.onrender.com/api/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfile(res.data);

      setEditName(res.data.name);

      // Update Navbar data
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          profileImage: res.data.profileImage,
        })
      );

    } catch (error) {

      console.log(error);

    }

  };
// ===============================
// Upload Resume
// ===============================

const uploadResume = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  if (file.type !== "application/pdf") {
    toast.warning("Please upload PDF only.");
    return;
  }

  try {

    const formData = new FormData();

    formData.append("resume", file);

    await axios.post(
      "https://codsoft-level2-tasks.onrender.com/api/resume/upload",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Resume uploaded successfully.");

    fetchProfile();

  } catch (error) {

    console.log(error);

    toast.error("Resume upload failed.");

  }

};

// ===============================
// Upload Profile Picture
// ===============================

const uploadProfileImage = async (e) => {

  const file = e.target.files[0];

  if (!file) return;

  if (!file.type.startsWith("image/")) {
    toast.warning("Please select a valid image.");
    return;
  }

  const formData = new FormData();

  formData.append("profileImage", file);

  try {

    const res = await axios.put(
      "https://codsoft-level2-tasks.onrender.com/api/auth/profile",
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

    toast.success("Profile picture updated successfully.");

    fetchProfile();

  } catch (error) {

    console.log(error);

    toast.error("Profile picture upload failed.");

  }

};

// ===============================
// Update Profile
// ===============================

const updateProfile = async () => {

  try {

    const formData = new FormData();

    formData.append("name", editName);

    if (editPassword.trim() !== "") {
      formData.append("password", editPassword);
    }

    const res = await axios.put(
      "https://codsoft-level2-tasks.onrender.com/api/auth/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    toast.success("Profile Updated Successfully");

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

    toast.error("Profile Update Failed");

  }

};

return (

<div className="candidate-dashboard">

  {/* Welcome */}

  <div className="welcome-card">

    <h1>
      Welcome back, {user?.name || "Candidate"} 👋
    </h1>

    <p>
      Manage your applications and track your career journey.
    </p>

  </div>

  {/* Statistics */}

  <div className="stats-container">

    <div className="stat-card">
      <h2>{applications.length}</h2>
      <p>Applied Jobs</p>
    </div>

    <div className="stat-card">
      <h2>0</h2>
      <p>Interviews</p>
    </div>

    <div className="stat-card">
      <h2>
        {
          applications.filter(
            (app) => app.status === "Approved"
          ).length
        }
      </h2>
      <p>Saved Job</p>
    </div>

  </div>

  {/* Profile */}

  <div className="profile-card">

    <h2>👤 My Profile</h2>

    {profile && (

      <>

        <div className="profile-image-container">

          <img
            src={
              profile.profileImage
                ? `https://codsoft-level2-tasks.onrender.com/uploads/${profile.profileImage}`
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    profile.name
                  )}&background=2563eb&color=fff&size=200`
            }
            alt="Profile"
            className="candidate-profile-image"
          />

          <button
            className="change-picture-btn"
            onClick={() => imageInputRef.current.click()}
          >
            📷 Change Profile Picture
          </button>

        </div>

        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={uploadProfileImage}
          style={{ display: "none" }}
        />

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
            {
              profile.resume
                ? "📤 Change Resume"
                : "📤 Upload Resume"
            }
          </button>

          {profile.resume && (

            <a
              href={`https://codsoft-level2-tasks.onrender.com/uploads/${profile.resume}`}
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
              href={`https://codsoft-level2-tasks.onrender.com/uploads/${profile.resume}`}
              download
            >
              <button>
                ⬇ Download Resume
              </button>
            </a>

          )}

        </div>

        {!profile.resume && (

          <p className="no-resume">
            No Resume Uploaded
          </p>

        )}

        <button
          className="edit-profile-btn"
          onClick={() => setShowEditModal(true)}
        >
          ✏ Edit Profile
        </button>

      </>

    )}

  </div>

            {/* Recent Applications */}

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

                    <span
                      className={`status-badge ${app.status.toLowerCase()}`}
                    >
                      {app.status === "Pending" && "🟡 Pending"}
                      {app.status === "Approved" && "🟢 Approved"}
                      {app.status === "Rejected" && "🔴 Rejected"}
                    </span>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan="3"
                  className="no-data"
                >
                  No applications found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

      {/* Profile Completion */}

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

      {/* Edit Profile Modal */}

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