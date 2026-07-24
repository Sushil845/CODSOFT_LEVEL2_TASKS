import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Applicants() {
  const { jobId } = useParams();
const [previewImage, setPreviewImage] = useState(null);
  const [applications, setApplications] = useState([]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const applicantsPerPage = 5;

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `https://codsoft-level2-tasks.onrender.com/api/applications/${jobId}`,
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
        `https://codsoft-level2-tasks.onrender.com/api/applications/${id}/${action}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      fetchApplicants();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  // Pagination Logic
  const indexOfLastApplicant = currentPage * applicantsPerPage;
  const indexOfFirstApplicant =
    indexOfLastApplicant - applicantsPerPage;

  const currentApplicants = applications.slice(
    indexOfFirstApplicant,
    indexOfLastApplicant
  );

  const totalPages = Math.ceil(
    applications.length / applicantsPerPage
  );

  return (
    <div
      style={{
        maxWidth: "1200px",
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
            <th>Candidate</th>
            <th>Resume</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {currentApplicants.length > 0 ? (

            currentApplicants.map((app) => (

              <tr key={app._id}>

                <td>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >

                    <img
  src={
    app.candidate.profileImage
      ? app.candidate.profileImage
      : `https://ui-avatars.com/api/?name=${encodeURIComponent(
          app.candidate.name
        )}&background=2563eb&color=fff`
  }
  alt="Candidate"
  style={{
    width: "55px",
    height: "55px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #2563eb",
  }}
/>

                    <div>

                      <strong>
                        {app.candidate.name}
                      </strong>

                      <br />

                      <span
                        style={{
                          color: "#666",
                          fontSize: "14px",
                        }}
                      >
                        {app.candidate.email}
                      </span>

                    </div>

                  </div>

                </td>

                <td>

                  {app.candidate.resume ? (

 <>
  <span
    style={{
      color: "green",
      fontWeight: "bold",
    }}
  >
    ✅ Uploaded
  </span>

  <br /><br />

  <a
    href={app.candidate.resume}
    target="_blank"
    rel="noreferrer"
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
      }}
    >
      📄 View Resume
    </button>
  </a>
</>
                                      ) : (

                    <span
                      style={{
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      ❌ Not Uploaded
                    </span>

                  )}

                </td>

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
                        color: "#ef4444",
                        fontWeight: "bold",
                      }}
                    >
                      🔴 Rejected
                    </span>
                  )}

                </td>

                <td>

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
                colSpan="4"
                style={{
                  textAlign: "center",
                  padding: "40px",
                }}
              >
                <h3>📭 No applicants found.</h3>
              </td>

            </tr>

          )}

        </tbody>

      </table>

      {/* Pagination */}

      {applications.length > applicantsPerPage && (

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            marginTop: "25px",
            flexWrap: "wrap",
          }}
        >

          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              background: "#2563eb",
              color: "#fff",
              opacity: currentPage === 1 ? 0.5 : 1,
            }}
          >
            ◀ Previous
          </button>

          {[...Array(totalPages)].map((_, index) => (

            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                padding: "8px 14px",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                background:
                  currentPage === index + 1
                    ? "#2563eb"
                    : "#e5e7eb",
                color:
                  currentPage === index + 1
                    ? "#fff"
                    : "#000",
                fontWeight: "bold",
              }}
            >
              {index + 1}
            </button>

          ))}

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{
              padding: "8px 16px",
              border: "none",
              borderRadius: "6px",
              cursor:
                currentPage === totalPages
                  ? "not-allowed"
                  : "pointer",
              background: "#2563eb",
              color: "#fff",
              opacity: currentPage === totalPages ? 0.5 : 1,
            }}
          >
            Next ▶
          </button>

        </div>

      )}

    </div>
  );
}

export default Applicants;