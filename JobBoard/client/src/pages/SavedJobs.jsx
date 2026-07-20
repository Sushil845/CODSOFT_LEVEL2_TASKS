import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getSavedJobs,
  unsaveJob,
} from "../services/savedJobService";

import {
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaBuilding,
  FaTrash,
} from "react-icons/fa";

import "./SavedJobs.css";

function SavedJobs() {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const data = await getSavedJobs();
      setSavedJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeSavedJob = async (jobId) => {
    try {
      await unsaveJob(jobId);

      setSavedJobs(
        savedJobs.filter((item) => item.job._id !== jobId)
      );

      alert("Job removed from saved list.");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to remove job."
      );
    }
  };

  if (loading) {
    return <h2 className="loading">Loading...</h2>;
  }

  return (
    <section className="saved-jobs-page">

      <h1>❤️ Saved Jobs</h1>

      {savedJobs.length === 0 ? (
        <div className="empty">
          <h2>No saved jobs yet.</h2>
          <p>
            Save jobs from the Job Details page and
            they will appear here.
          </p>

          <Link to="/jobs" className="browse-btn">
            Browse Jobs
          </Link>
        </div>
      ) : (
        <div className="saved-grid">
                  {savedJobs.map((item) => (
            <div
              key={item._id}
              className="saved-card"
            >
              <h2>{item.job.title}</h2>

              <h3>{item.job.company}</h3>

              <div className="saved-info">

                <p>
                  <FaMapMarkerAlt />
                  {item.job.location}
                </p>

                <p>
                  <FaMoneyBillWave />
                  {item.job.salary}
                </p>

                <p>
                  <FaBuilding />
                  {item.job.company}
                </p>

              </div>

              <div className="saved-actions">

                <Link
                  to={`/job/${item.job._id}`}
                  className="details-btn"
                >
                  View Details
                </Link>

                <button
                  className="remove-btn"
                  onClick={() =>
                    removeSavedJob(item.job._id)
                  }
                >
                  <FaTrash />
                  Remove
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default SavedJobs;