import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUserTie,
  FaBriefcase,
  FaClock,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import "./JobCard.css";

function JobCard({ job }) {
  // Prevent crashes if job is not available
  if (!job) {
    return null;
  }

  // Safe handling of skills
  const skills = job.skills ? job.skills.split(",") : [];

  // Safe handling of createdAt
  const postedDate = job.createdAt ? new Date(job.createdAt) : new Date();
  const today = new Date();

  const diffTime = Math.abs(today - postedDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="job-card">
      <div className="job-top">
        <div>
          <h3 className="job-title">{job.title}</h3>
          <h5 className="company-name">{job.company}</h5>
        </div>

        <span className="job-type">Full Time</span>
      </div>

      <div className="job-info">
        <FaMapMarkerAlt />
        <span>{job.location}</span>
      </div>

      <div className="job-info">
        <FaMoneyBillWave />
        <span>{job.salary}</span>
      </div>

      <div className="job-info">
        <FaUserTie />
        <span>Posted by {job.employer?.name || "Unknown"}</span>
      </div>

      <div className="job-info">
        <FaClock />
        <span>
          {diffDays <= 1
            ? "Posted Today"
            : `Posted ${diffDays} days ago`}
        </span>
      </div>

      <p className="job-description">
        {job.description}
      </p>

      <div className="job-tags">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <span className="tag" key={index}>
              {skill.trim()}
            </span>
          ))
        ) : (
          <span className="tag">No Skills</span>
        )}
      </div>

      <Link
        to={`/job/${job._id}`}
        style={{ textDecoration: "none" }}
      >
        <button className="apply-btn">
          <FaBriefcase />
          View Details
        </button>
      </Link>
    </div>
  );
}

export default JobCard;