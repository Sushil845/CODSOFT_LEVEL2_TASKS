import {
  FaShieldAlt,
  FaPaperPlane,
  FaFileUpload,
  FaBell,
} from "react-icons/fa";

import "./WhyChoose.css";

function WhyChoose() {
  const features = [
    {
      icon: <FaShieldAlt />,
      title: "Verified Companies",
      description:
        "Apply confidently to trusted employers verified by CareerNest.",
    },
    {
      icon: <FaPaperPlane />,
      title: "One Click Apply",
      description:
        "Submit applications quickly without lengthy registration forms.",
    },
    {
      icon: <FaFileUpload />,
      title: "Resume Upload",
      description:
        "Upload your resume once and apply to multiple opportunities instantly.",
    },
    {
      icon: <FaBell />,
      title: "Job Alerts",
      description:
        "Receive timely notifications about jobs matching your skills.",
    },
  ];

  return (
    <section className="why-section">

      <div className="section-title">
        <h2>Why Choose CareerNest?</h2>
        <p>
          Everything you need to discover opportunities and grow your career in one place.
        </p>
      </div>

      <div className="why-grid">
        {features.map((feature, index) => (
          <div className="why-card" key={index}>

            <div className="why-icon">
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p>{feature.description}</p>

          </div>
        ))}
      </div>

    </section>
  );
}

export default WhyChoose;