import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function PostJobForm() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    skills: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/jobs",
        job,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/employer");
      }, 1500);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to post job"
      );
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #d1d5db",
    outline: "none",
    fontSize: "15px",
    boxSizing: "border-box",
    marginTop: "8px",
    marginBottom: "20px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#2563eb,#4f46e5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "800px",
          background: "#fff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "10px",
            color: "#1e293b",
          }}
        >
          🚀 Post a New Job
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#64748b",
            marginBottom: "35px",
          }}
        >
          Fill in the details below to publish your job opening.
        </p>

        <form onSubmit={handleSubmit}>
          <label><strong>Job Title</strong></label>
          <input
            style={inputStyle}
            type="text"
            name="title"
            placeholder="Senior MERN Stack Developer"
            value={job.title}
            onChange={handleChange}
            required
          />

          <label><strong>Company Name</strong></label>
          <input
            style={inputStyle}
            type="text"
            name="company"
            placeholder="Google"
            value={job.company}
            onChange={handleChange}
            required
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <div>
              <label><strong>Location</strong></label>
              <input
                style={inputStyle}
                type="text"
                name="location"
                placeholder="Bangalore"
                value={job.location}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label><strong>Salary</strong></label>
              <input
                style={inputStyle}
                type="text"
                name="salary"
                placeholder="₹12 LPA"
                value={job.salary}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label><strong>Required Skills</strong></label>
          <input
            style={inputStyle}
            type="text"
            name="skills"
            placeholder="React, Node.js, MongoDB"
            value={job.skills}
            onChange={handleChange}
            required
          />

          <label><strong>Job Description</strong></label>
          <textarea
            style={{
              ...inputStyle,
              minHeight: "160px",
              resize: "vertical",
            }}
            name="description"
            placeholder="Describe responsibilities, requirements, benefits, and expectations..."
            value={job.description}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            style={{
              width: "100%",
              background: "linear-gradient(135deg,#2563eb,#4f46e5)",
              color: "#fff",
              border: "none",
              padding: "16px",
              borderRadius: "12px",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            🚀 Publish Job
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostJobForm;