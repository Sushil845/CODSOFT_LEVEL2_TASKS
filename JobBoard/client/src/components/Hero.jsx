import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaBriefcase, FaBuilding, FaUsers } from "react-icons/fa";
import "./Hero.css";

function Hero() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    const keyword = search.trim();

    if (keyword) {
      navigate(`/jobs?search=${encodeURIComponent(keyword)}`);
    } else {
      navigate("/jobs");
    }
  };

  return (
    <section className="hero">
      <div className="hero-container">

        {/* LEFT */}
        <div className="hero-left">

          <span className="hero-tag">
            🚀 India's Trusted Job Portal
          </span>

          <h1>
            Find Your Dream Job <br />
            Build Your Future Today
          </h1>

          <p>
            Explore thousands of verified opportunities from startups,
            leading MNCs, and remote companies across India.
          </p>

          {/* Search */}
          <div className="search-box">

            <input
              type="text"
              placeholder="Search jobs, skills or companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
            />

            <button onClick={handleSearch}>
              <FaSearch /> Search
            </button>

          </div>

          {/* Trending Skills */}
          <div className="skills">
            <span>🔥 Java</span>
            <span>React</span>
            <span>Spring Boot</span>
            <span>Node.js</span>
            <span>Python</span>
            <span>Remote</span>
          </div>

        </div>

        {/* RIGHT */}
        <div className="hero-right">

          <div className="stats">

            <div>
              <FaBriefcase
                size={30}
                color="#2563eb"
                style={{ marginBottom: "10px" }}
              />
              <h2>12K+</h2>
              <p>Active Jobs</p>
            </div>

            <div>
              <FaBuilding
                size={30}
                color="#2563eb"
                style={{ marginBottom: "10px" }}
              />
              <h2>350+</h2>
              <p>Companies</p>
            </div>

            <div>
              <FaUsers
                size={30}
                color="#2563eb"
                style={{ marginBottom: "10px" }}
              />
              <h2>20K+</h2>
              <p>Candidates</p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;