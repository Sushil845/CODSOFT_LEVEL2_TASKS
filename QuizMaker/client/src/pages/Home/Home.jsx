import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <>
      <section className="hero">
<div className="container text-center d-flex flex-column align-items-center">
          <h1 className="display-4 fw-bold">
            Welcome to QuizMaster
          </h1>

          <p className="lead mt-3">
            Test your knowledge, create quizzes, and improve your learning with an interactive quiz platform.
          </p>

          <div className="mt-4 d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/quizzes" className="btn btn-light btn-lg px-4">
    Start Quiz
</Link>

<Link to="/create" className="btn btn-outline-light btn-lg px-4">
    Create Quiz
</Link>
          </div>

        </div>
      </section>

      <section className="container py-5">

        <div className="row text-center">

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3>📝</h3>
                <h5>Create Quizzes</h5>
                <p>Create your own quizzes with multiple-choice questions.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3>🎯</h3>
                <h5>Attempt Quizzes</h5>
                <p>Take quizzes and test your knowledge instantly.</p>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h3>📊</h3>
                <h5>Track Results</h5>
                <p>View your quiz history and monitor your performance.</p>
              </div>
            </div>
          </div>

        </div>

      </section>
    </>
  );
}

export default Home;