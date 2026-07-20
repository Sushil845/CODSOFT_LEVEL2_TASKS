import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Applicants() {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/applications/${jobId}`,
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

  const updateStatus = async (id, action) => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/applications/${id}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      fetchApplicants();
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0,0,0,.1)",
      }}
    >
      <h1>Applicants</h1>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Resume</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.length > 0 ? (
            applications.map((app) => (
              <tr key={app._id}>
                <td>{app.candidate.name}</td>

                <td>{app.candidate.email}</td>

                <td>
                  {app.candidate.resume ? (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      ✅ Uploaded
                    </span>
                  ) : (
                    <span style={{ color: "red" }}>
                      ❌ Not Uploaded
                    </span>
                  )}
                </td>

                <td>
                  {app.status === "Pending" && (
                    <span style={{ color: "#f59e0b", fontWeight: "bold" }}>
                      🟡 Pending
                    </span>
                  )}

                  {app.status === "Approved" && (
                    <span style={{ color: "green", fontWeight: "bold" }}>
                      🟢 Approved
                    </span>
                  )}

                  {app.status === "Rejected" && (
                    <span style={{ color: "red", fontWeight: "bold" }}>
                      🔴 Rejected
                    </span>
                  )}
                </td>

                <td>
                  {app.candidate.resume && (
                    <>
                      <a
                        href={`http://localhost:5000/uploads/${app.candidate.resume}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: "none" }}
                      >
                        <button
                          style={{
                            background: "#2563eb",
                            color: "#fff",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            marginRight: "8px",
                          }}
                        >
                          👁 View
                        </button>
                      </a>

                      <a
                        href={`http://localhost:5000/uploads/${app.candidate.resume}`}
                        download
                        style={{ textDecoration: "none" }}
                      >
                        <button
                          style={{
                            background: "#16a34a",
                            color: "#fff",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "6px",
                            cursor: "pointer",
                            marginRight: "8px",
                          }}
                        >
                          ⬇ Download
                        </button>
                      </a>
                    </>
                  )}

                  {app.status === "Pending" && (
                    <>
                      <button
                        onClick={() =>
                          updateStatus(app._id, "approve")
                        }
                        style={{
                          background: "#22c55e",
                          color: "#fff",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                          marginRight: "8px",
                        }}
                      >
                        ✅ Approve
                      </button>

                      <button
                        onClick={() =>
                          updateStatus(app._id, "reject")
                        }
                        style={{
                          background: "#ef4444",
                          color: "#fff",
                          border: "none",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          cursor: "pointer",
                        }}
                      >
                        ❌ Reject
                      </button>
                    </>
                  )}
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
                No applicants found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Applicants;