import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
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
            Find the Career <br />
            You've Always Wanted
          </h1>

          <p>
            Discover verified opportunities from startups,
            MNCs and remote companies across India.
          </p>

          {/* Search Box */}
          <div className="search-box">

            <input
              type="text"
              placeholder="Search by job title..."
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

          {/* Quick Skills */}
          <div className="skills">
            <span>Java</span>
            <span>React</span>
            <span>Node.js</span>
            <span>Python</span>
            <span>Remote</span>
          </div>

        </div>

        {/* RIGHT */}
        <div className="hero-right">

          <div className="stats">

            <div>
              <h2>12K+</h2>
              <p>Active Jobs</p>
            </div>

            <div>
              <h2>350+</h2>
              <p>Companies</p>
            </div>

            <div>
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