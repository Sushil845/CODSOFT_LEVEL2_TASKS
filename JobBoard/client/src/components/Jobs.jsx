import "./Jobs.css";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function Jobs() {

  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");

  const [searchParams] = useSearchParams();

  useEffect(() => {
    fetchJobs();
  }, []);

  // Read search value from Hero page
  useEffect(() => {
    const keyword = searchParams.get("search");

    if (keyword) {
      setSearch(keyword);
    }
  }, [searchParams]);

  // Auto filter whenever values change
  useEffect(() => {
    filterJobs();
  }, [jobs, search, location]);

  const fetchJobs = async () => {
    try {

      const res = await axios.get("http://localhost:5000/api/jobs");

      setJobs(res.data);
      setFilteredJobs(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const filterJobs = () => {

    let result = [...jobs];

    // Search Filter
    if (search.trim() !== "") {

      const keyword = search.toLowerCase();

      result = result.filter((job) => {

        return (

          job.title?.toLowerCase().includes(keyword) ||

          job.company?.toLowerCase().includes(keyword) ||

          job.location?.toLowerCase().includes(keyword) ||

          job.description?.toLowerCase().includes(keyword) ||

          job.skills?.toLowerCase().includes(keyword)

        );

      });

    }

    // Location Filter
    if (location !== "") {

      result = result.filter(

        (job) =>
          job.location.toLowerCase() ===
          location.toLowerCase()

      );

    }

    setFilteredJobs(result);

  };

  return (

    <section className="jobs-page">

      <div className="jobs-header">

        <h1>Find Your Dream Job</h1>

        <p>
          Explore verified opportunities from top companies.
        </p>

      </div>

      {/* Search Section */}

      <div className="search-section">

        <input
          type="text"
          placeholder="Search jobs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >

          <option value="">All Locations</option>

          <option>Bhubaneswar</option>

          <option>Bangalore</option>

          <option>Hyderabad</option>

          <option>Remote</option>

          <option>Jajpur Road, Odisha, India</option>

        </select>

        <button onClick={filterJobs}>
          Search
        </button>

      </div>

      {/* Jobs */}

      <div className="jobs-grid">

        {filteredJobs.length > 0 ? (

          filteredJobs.map((job) => (

            <JobCard
              key={job._id}
              job={job}
            />

          ))

        ) : (

          <h2
            style={{
              textAlign: "center",
              gridColumn: "1 / -1",
              color: "#666",
              marginTop: "30px"
            }}
          >
            No jobs found.
          </h2>

        )}

      </div>

    </section>

  );
}

export default Jobs;