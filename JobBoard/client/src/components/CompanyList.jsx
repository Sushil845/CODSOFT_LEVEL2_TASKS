import "./CompanyList.css";

const companies = [
  {
    id: 1,
    name: "TCS",
    location: "Bhubaneswar",
    jobs: 25,
    description: "Leading IT services and consulting company.",
  },
  {
    id: 2,
    name: "Infosys",
    location: "Bangalore",
    jobs: 18,
    description: "Global leader in digital transformation and consulting.",
  },
  {
    id: 3,
    name: "Wipro",
    location: "Hyderabad",
    jobs: 14,
    description: "Technology services and business solutions provider.",
  },
  {
    id: 4,
    name: "Accenture",
    location: "Mumbai",
    jobs: 30,
    description: "Global professional services company specializing in IT.",
  },
  {
    id: 5,
    name: "Capgemini",
    location: "Pune",
    jobs: 12,
    description: "Helping organizations accelerate digital transformation.",
  },
  {
    id: 6,
    name: "Cognizant",
    location: "Chennai",
    jobs: 20,
    description: "Engineering modern businesses through technology.",
  },
];

function CompanyList() {
  return (
    <div className="companies-container">
      <h1>Top Hiring Companies</h1>

      <p>
        Explore companies hiring talented professionals.
      </p>

      <div className="companies-grid">

        {companies.map((company) => (

          <div className="company-card" key={company.id}>

            <div className="company-logo">
              {company.name.charAt(0)}
            </div>

            <h2>{company.name}</h2>

            <p className="location">
              {company.location}
            </p>

            <p>{company.description}</p>

            <p className="jobs">
              <strong>{company.jobs}</strong> Open Jobs
            </p>

            <div className="company-status">
              Hiring Now
            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default CompanyList;