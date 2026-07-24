import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import JobCard from "./JobCard";
import "./FeaturedJobs.css";

function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get(
        "https://codsoft-level2-tasks.onrender.com/api/jobs"
      );

      setJobs(res.data.slice(0, 6));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="featured-section">
      <div className="container">

        <div className="section-header">
          <h2>Featured Jobs</h2>

          <p>
            Explore the latest opportunities from verified employers.
          </p>
        </div>

        <div className="row">
          {jobs.map((job) => (
            <div className="col-lg-4 col-md-6 mb-4" key={job._id}>
              <JobCard job={job} />
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          <Link to="/jobs" className="view-all-btn">
            View All Jobs →
          </Link>
        </div>

      </div>
    </section>
  );
}

export default FeaturedJobs;