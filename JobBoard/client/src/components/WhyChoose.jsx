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
      description: "Apply only to trusted and verified employers.",
    },
    {
      icon: <FaPaperPlane />,
      title: "One Click Apply",
      description: "Apply for jobs quickly without lengthy forms.",
    },
    {
      icon: <FaFileUpload />,
      title: "Resume Upload",
      description: "Upload your resume once and use it everywhere.",
    },
    {
      icon: <FaBell />,
      title: "Job Alerts",
      description: "Receive instant notifications for new openings.",
    },
  ];

  return (
    <section className="why-section">

      <h2>Why Choose CareerNest?</h2>

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