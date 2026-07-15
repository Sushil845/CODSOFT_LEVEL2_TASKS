import "./Jobs.css";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import axios from "axios";

function Jobs() {

  const [jobs, setJobs] = useState([]);

  useEffect(() => {

    fetchJobs();

  }, []);

  const fetchJobs = async () => {

    try {

      const res = await axios.get("http://localhost:5000/api/jobs");

      setJobs(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (
    <section className="jobs-page">

      <div className="jobs-header">
        <h1>Find Your Dream Job</h1>
        <p>Explore verified opportunities from top companies.</p>
      </div>

      <div className="search-section">

        <input
          type="text"
          placeholder="Search jobs..."
        />

        <select>
          <option>All Locations</option>
          <option>Bhubaneswar</option>
          <option>Bangalore</option>
          <option>Hyderabad</option>
          <option>Remote</option>
        </select>

        <button>Search</button>

      </div>

      <div className="jobs-grid">

        {jobs.map((job) => (

          <JobCard
            key={job._id}
            job={job}
          />

        ))}

      </div>

    </section>
  );
}

export default Jobs;