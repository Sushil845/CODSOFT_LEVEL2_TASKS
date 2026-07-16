import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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

      alert(res.data.message);

      navigate("/employer");

    } catch (error) {

      alert(
        error.response?.data?.message ||
        "Failed to post job"
      );

    }

  };

  return (

    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgba(0,0,0,.1)",
      }}
    >

      <h1>Post New Job</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          value={job.title}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="company"
          placeholder="Company"
          value={job.company}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={job.location}
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          value={job.salary}
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Job Description"
          value={job.description}
          onChange={handleChange}
          rows="5"
          required
        />

        <br /><br />

        <input
          type="text"
          name="skills"
          placeholder="Skills (comma separated)"
          value={job.skills}
          onChange={handleChange}
          required
        />

        <br /><br />

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            padding: "12px 25px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Post Job
        </button>

      </form>

    </div>

  );

}

export default PostJobForm;