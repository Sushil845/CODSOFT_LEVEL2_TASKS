import jobs from "../data/jobs";
import JobCard from "./JobCard";

function FeaturedJobs() {
  return (
    <div className="container mt-5">

      <h2 className="mb-4">
        Featured Jobs
      </h2>

      <div className="row">

        {jobs.map((job) => (
          <div className="col-md-3 mb-4" key={job.id}>
            <JobCard job={job} />
          </div>
        ))}

      </div>
    </div>
  );
}

export default FeaturedJobs;