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

  useEffect(() => {
    const keyword = searchParams.get("search");

    if (keyword) {
      setSearch(keyword);
    }
  }, [searchParams]);

  useEffect(() => {
    filterJobs();
  }, [jobs, search, location]);

  const fetchJobs = async () => {
    try {

      const res = await axios.get(
        "https://codsoft-level2-tasks.onrender.com/api/jobs"
      );

      setJobs(res.data);
      setFilteredJobs(res.data);

    } catch (error) {

      console.log(error);

    }
  };

  const filterJobs = () => {

    let result = [...jobs];

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

    if (location !== "") {

      result = result.filter(

        (job) =>

          job.location
            ?.toLowerCase()
            .includes(location.toLowerCase())

      );

    }

    setFilteredJobs(result);

  };

  return (

    <section className="jobs-page">

      <div className="jobs-header">

        <h1>
          🚀 Find Your Dream Career
        </h1>

        <p>
          Discover verified opportunities from leading
          companies and start your next career journey.
        </p>

      </div>

      <div className="search-section">

        <input
          type="text"
          placeholder="Search by title, company or skills..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

        <select
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        >

          <option value="">
            All Locations
          </option>

          <option>Bhubaneswar</option>

          <option>Bangalore</option>

          <option>Hyderabad</option>

          <option>Remote</option>

          <option>
            Jajpur Road, Odisha, India
          </option>

        </select>

        <button onClick={filterJobs}>
          🔍 Search Jobs
        </button>

      </div>

      <div className="jobs-grid">
                {filteredJobs.length > 0 ? (

          filteredJobs.map((job) => (

            <JobCard
              key={job._id}
              job={job}
            />

          ))

        ) : (

          <div
            style={{
              gridColumn: "1 / -1",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              padding: "80px 20px",
              background: "#ffffff",
              borderRadius: "20px",
              boxShadow: "0 8px 25px rgba(0,0,0,.08)",
            }}
          >

            <h1
              style={{
                fontSize: "70px",
                marginBottom: "10px",
              }}
            >
              🔍
            </h1>

            <h2
              style={{
                color: "#1e293b",
                marginBottom: "10px",
              }}
            >
              No Jobs Found
            </h2>

            <p
              style={{
                color: "#64748b",
                fontSize: "17px",
                textAlign: "center",
                maxWidth: "500px",
              }}
            >
              We couldn't find any jobs matching your
              search criteria. Try changing your
              keyword or selecting another location.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setLocation("");
              }}
              style={{
                marginTop: "25px",
                background: "#2563eb",
                color: "#fff",
                border: "none",
                padding: "14px 30px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Show All Jobs
            </button>

          </div>

        )}

      </div>

    </section>

  );

}

export default Jobs;