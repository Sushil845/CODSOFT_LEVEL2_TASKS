import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUserTie,
} from "react-icons/fa";

function JobDetails() {

  const { id } = useParams();

  const [job, setJob] = useState(null);

  useEffect(() => {

    fetchJob();

  }, []);

  // Fetch Single Job
  const fetchJob = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/jobs/${id}`
      );

      setJob(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  // Apply Job
  const applyJob = async () => {

    // Check if user is logged in
    const token = localStorage.getItem("token");

    if (!token) {

      alert("Please login to apply for this job.");

      return;

    }

    try {

      // Call Backend API
      const res = await axios.post(

        "http://localhost:5000/api/applications",

        {
          jobId: job._id,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      alert(res.data.message);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to apply for job"
      );

    }

  };

  if (!job) {

    return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

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

      <h2 style={{ color: "#2563eb" }}>
        {job.company}
      </h2>

      <hr />

      <p>
        <FaMapMarkerAlt /> <strong>Location:</strong> {job.location}
      </p>

      <p>
        <FaMoneyBillWave /> <strong>Salary:</strong> {job.salary}
      </p>

      <p>
        <FaUserTie /> <strong>Posted By:</strong> {job.employer?.name}
      </p>

      <h3>Description</h3>

      <p>{job.description}</p>

      <h3>Required Skills</h3>

      <p>{job.skills}</p>

      <button
        onClick={applyJob}
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