import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  saveJob,
  unsaveJob,
  checkSavedStatus,
} from "../services/savedJobService";

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUserTie,
  FaClock,
} from "react-icons/fa";

import "./JobDetails.css";

function JobDetails() {
  const { id } = useParams();

  const [job, setJob] = useState(null);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchJob();
    checkApplication();
    checkSavedJob();
  }, [id]);

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

  const checkApplication = async () => {
    const token = localStorage.getItem("token");

    if (!token) return;

    try {
      const res = await axios.get(
        `http://localhost:5000/api/applications/status/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplied(res.data.applied);
    } catch (error) {
      console.log(error);
    }
  };

  const checkSavedJob = async () => {
    if (!localStorage.getItem("token")) return;

    try {
      const data = await checkSavedStatus(id);
      setSaved(data.saved);
    } catch (error) {
      console.log(error);
    }
  };

  const applyJob = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login to apply for this job.");
      return;
    }

    try {
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
      setApplied(true);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to apply for job"
      );
    }
  };

  const toggleSaveJob = async () => {
    if (!localStorage.getItem("token")) {
      alert("Please login first.");
      return;
    }

    try {
      if (saved) {
        const data = await unsaveJob(job._id);
        alert(data.message);
        setSaved(false);
      } else {
        const data = await saveJob(job._id);
        alert(data.message);
        setSaved(true);
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  if (!job) {
    return <h2 className="loading">Loading...</h2>;
  }

  const skills = job.skills ? job.skills.split(",") : [];

  const postedDate = new Date(job.createdAt);
  const today = new Date();

  const diffTime = Math.abs(today - postedDate);
  const diffDays = Math.ceil(
    diffTime / (1000 * 60 * 60 * 24)
  );
    return (
    <section className="job-details-page">
      <div className="job-details-card">

        <div className="details-header">
          <div>
            <h1>{job.title}</h1>
            <h2>{job.company}</h2>
          </div>

          <span className="job-type">
            Full Time
          </span>
        </div>

        <div className="details-info">

          <div>
            <FaMapMarkerAlt />
            <span>{job.location}</span>
          </div>

          <div>
            <FaMoneyBillWave />
            <span>{job.salary}</span>
          </div>

          <div>
            <FaUserTie />
            <span>{job.employer?.name}</span>
          </div>

          <div>
            <FaClock />
            <span>
              {diffDays === 1
                ? "Posted Today"
                : `Posted ${diffDays} days ago`}
            </span>
          </div>

        </div>

        <hr />

        <h3>Job Description</h3>

        <p className="description">
          {job.description}
        </p>

        <h3>Required Skills</h3>

        <div className="skills">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="skill"
            >
              {skill.trim()}
            </span>
          ))}
        </div>

        <div className="job-actions">

          <button
            className={`apply-btn ${
              applied ? "applied-btn" : ""
            }`}
            onClick={applyJob}
            disabled={applied}
          >
            {applied ? "Applied ✓" : "Apply Now"}
          </button>

          <button
            className={`save-btn ${
              saved ? "saved-btn" : ""
            }`}
            onClick={toggleSaveJob}
          >
            {saved ? "❤️ Saved" : "🤍 Save Job"}
          </button>

        </div>

      </div>
    </section>
  );
}

export default JobDetails;