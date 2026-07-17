import { useEffect, useState } from "react";
import axios from "axios";
import JobCard from "./JobCard";

function FeaturedJobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/jobs");

      // Show only first 6 jobs on Home page
      setJobs(res.data.slice(0, 6));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Featured Jobs</h2>

      <div className="row">
        {jobs.map((job) => (
          <div className="col-md-3 mb-4" key={job._id}>
            <JobCard job={job} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeaturedJobs;