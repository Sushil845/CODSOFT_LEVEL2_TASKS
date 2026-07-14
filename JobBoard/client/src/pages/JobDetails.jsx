import { useParams } from "react-router-dom";
import jobs from "../data/jobs";
import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaClock,
} from "react-icons/fa";

function JobDetails() {
  const { id } = useParams();

  const job = jobs.find((j) => j.id === Number(id));

  if (!job) {
    return <h2 style={{ textAlign: "center" }}>Job Not Found</h2>;
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "35px",
        background: "#fff",
        borderRadius: "18px",
        boxShadow: "0 10px 30px rgba(0,0,0,.08)",
      }}
    >
      <h1>{job.title}</h1>

      <h2 style={{ color: "#2563eb" }}>{job.company}</h2>

      <hr />

      <p>
        <FaMapMarkerAlt /> <strong>Location:</strong> {job.location}
      </p>

      <p>
        <FaMoneyBillWave /> <strong>Salary:</strong> {job.salary}
      </p>

      <p>
        <FaBriefcase /> <strong>Experience:</strong> {job.experience}
      </p>

      <p>
        <FaClock /> <strong>Posted:</strong> {job.posted}
      </p>

      <h3>Description</h3>

      <p>
        We are looking for a passionate {job.title} to join our team.
        The candidate should have strong technical skills and work
        collaboratively to build high-quality software solutions.
      </p>

      <h3>Required Skills</h3>

      <ul>
        <li>Java / Spring Boot</li>
        <li>React.js</li>
        <li>REST API</li>
        <li>Git & GitHub</li>
        <li>Problem Solving</li>
      </ul>

      <button
        style={{
          marginTop: "20px",
          background: "#2563eb",
          color: "white",
          border: "none",
          padding: "14px 30px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "600",
          fontSize: "16px",
        }}
      >
        Apply Now
      </button>
    </div>
  );
}

export default JobDetails;