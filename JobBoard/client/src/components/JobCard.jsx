import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUserTie,
} from "react-icons/fa";

import { Link } from "react-router-dom";

import "./JobCard.css";

function JobCard({ job }) {
  return (
    <div className="job-card">

      <h3 className="job-title">{job.title}</h3>

      <h5 className="company-name">{job.company}</h5>

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
        <span>
          Posted by {job.employer?.name}
        </span>
      </div>

      <p
        style={{
          marginTop: "15px",
          color: "#555",
          lineHeight: "1.5"
        }}
      >
        {job.description}
      </p>

      <div className="job-tags">
        <span className="tag">
          {job.skills}
        </span>
      </div>

      <Link
        to={`/job/${job._id}`}
        style={{ textDecoration: "none" }}
      >
        <button className="apply-btn">
          View Details →
        </button>
      </Link>

    </div>
  );
}

export default JobCard;