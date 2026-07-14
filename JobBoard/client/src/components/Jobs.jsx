import "./Jobs.css";
import jobs from "../data/jobs";
import JobCard from "./JobCard";

function Jobs() {
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
          <JobCard key={job.id} job={job} />
        ))}
      </div>

    </section>
  );
}

export default Jobs;