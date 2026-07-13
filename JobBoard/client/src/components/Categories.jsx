import {
  FaLaptopCode,
  FaMobileAlt,
  FaCloud,
  FaRobot,
  FaDatabase,
  FaPaintBrush,
} from "react-icons/fa";

import "./Categories.css";

function Categories() {
  const categories = [
    {
      icon: <FaLaptopCode />,
      title: "Software Development",
      jobs: "320 Jobs",
    },
    {
      icon: <FaMobileAlt />,
      title: "Mobile Development",
      jobs: "180 Jobs",
    },
    {
      icon: <FaCloud />,
      title: "Cloud Computing",
      jobs: "145 Jobs",
    },
    {
      icon: <FaRobot />,
      title: "AI & Machine Learning",
      jobs: "210 Jobs",
    },
    {
      icon: <FaDatabase />,
      title: "Data Science",
      jobs: "165 Jobs",
    },
    {
      icon: <FaPaintBrush />,
      title: "UI / UX Design",
      jobs: "120 Jobs",
    },
  ];

  return (
    <section className="categories">

      <h2>Browse Categories</h2>

      <div className="category-grid">

        {categories.map((category, index) => (
          <div className="category-card" key={index}>

            <div className="category-icon">
              {category.icon}
            </div>

            <h3>{category.title}</h3>

            <p>{category.jobs}</p>

          </div>
        ))}

      </div>

    </section>
  );
}

export default Categories;