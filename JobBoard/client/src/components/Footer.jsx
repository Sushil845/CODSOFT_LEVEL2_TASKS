import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
} from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3 mt-5">

      <div className="container">

        <div className="row gy-4">

          <div className="col-lg-5">

            <h3 className="fw-bold text-primary">
              CareerNest
            </h3>

            <p className="text-secondary mt-3">
              CareerNest helps job seekers discover exciting
              opportunities while enabling employers to find
              talented professionals quickly and efficiently.
            </p>

          </div>

          <div className="col-lg-3">

            <h5 className="mb-3">
              Quick Links
            </h5>

            <ul className="list-unstyled">

              <li>
                <a
                  href="/"
                  className="text-decoration-none text-secondary"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/jobs"
                  className="text-decoration-none text-secondary"
                >
                  Browse Jobs
                </a>
              </li>

              <li>
                <a
                  href="/login"
                  className="text-decoration-none text-secondary"
                >
                  Login
                </a>
              </li>

              <li>
                <a
                  href="/register"
                  className="text-decoration-none text-secondary"
                >
                  Register
                </a>
              </li>

            </ul>

          </div>

          <div className="col-lg-4">

            <h5 className="mb-3">
              Contact
            </h5>

            <p className="text-secondary">
              <FaEnvelope className="me-2" />
              support@careernest.com
            </p>

            <div className="d-flex gap-3 fs-4 mt-3">

              <a
                href="#"
                className="text-light"
              >
                <FaGithub />
              </a>

              <a
                href="#"
                className="text-light"
              >
                <FaLinkedin />
              </a>

            </div>

          </div>

        </div>

        <hr className="border-secondary my-4" />

        <div className="text-center text-secondary">

          © {new Date().getFullYear()} CareerNest. All Rights Reserved.

        </div>

      </div>

    </footer>
  );
}

export default Footer;