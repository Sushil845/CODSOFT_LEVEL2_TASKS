import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaUserTie,
  FaBriefcase,
  FaClock,
  FaBuilding,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import "./JobCard.css";

function JobCard({ job }) {
  if (!job) return null;

  const skills = job.skills
    ? job.skills.split(",").map((skill) => skill.trim())
    : [];

  const postedDate = job.createdAt
    ? new Date(job.createdAt)
    : new Date();

  const today = new Date();

  const diffTime = Math.abs(today - postedDate);

  const diffDays = Math.ceil(
    diffTime / (1000 * 60 * 60 * 24)
  );

  const companyLetter = job.company
    ? job.company.charAt(0).toUpperCase()
    : "C";

  return (
    <div className="job-card">

      {/* Top */}

      <div className="job-top">

        <div className="company-info">

          <div className="company-logo">
            {companyLetter}
          </div>

          <div>

            <h3 className="job-title">
              {job.title}
            </h3>

            <h5 className="company-name">
              <FaBuilding />
              {job.company}
            </h5>

          </div>

        </div>

        <span className="job-type">
          Full Time
        </span>

      </div>

      {/* Job Details */}

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
          Posted by{" "}
          {job.employer?.name || "Employer"}
        </span>
      </div>

      <div className="job-info">
        <FaClock />

        <span>
          {diffDays <= 1
            ? "Posted Today"
            : `Posted ${diffDays} days ago`}
        </span>

        {diffDays <= 1 && (
          <span className="new-badge">
            NEW
          </span>
        )}
      </div>

      {/* Description */}

      <p className="job-description">
        {job.description}
      </p>

      {/* Skills */}

      <div className="job-tags">

        {skills.length > 0 ? (
          <>
            {skills
              .slice(0, 4)
              .map((skill, index) => (
                <span
                  key={index}
                  className="tag"
                >
                  {skill}
                </span>
              ))}

            {skills.length > 4 && (
              <span className="tag more-tag">
                +{skills.length - 4} More
              </span>
            )}
          </>
        ) : (
          <span className="tag">
            No Skills
          </span>
        )}

      </div>

      {/* Button */}

      <Link
        to={`/job/${job._id}`}
        className="details-link"
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