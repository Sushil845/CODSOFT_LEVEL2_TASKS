import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBriefcase,
  FaClock,
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
        <FaBriefcase />
        <span>{job.experience}</span>
      </div>

      <div className="job-info">
        <FaClock />
        <span>Posted {job.posted}</span>
      </div>

      <div className="job-tags">
        <span className="tag">{job.type}</span>
      </div>

      <Link
        to={`/job/${job.id}`}
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