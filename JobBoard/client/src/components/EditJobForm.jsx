import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function EditJobForm() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    description: "",
    skills: "",
  });

  useEffect(() => {
    fetchJob();
  }, []);

  const fetchJob = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/jobs/${id}`
      );

      setJob(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  const handleChange = (e) => {

    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const res = await axios.put(

        `http://localhost:5000/api/jobs/${id}`,

        {
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          description: job.description,
          skills: job.skills,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );

      toast.success(res.data.message);

      setTimeout(() => {
        navigate("/employer");
      }, 1500);

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to update job"
      );

    }

  };

  return (

    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 10px 30px rgba(0,0,0,.1)",
      }}
    >

      <h1>Edit Job</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          value={job.title}
          onChange={handleChange}
          placeholder="Job Title"
          required
        />

        <br /><br />

        <input
          type="text"
          name="company"
          value={job.company}
          onChange={handleChange}
          placeholder="Company"
          required
        />

        <br /><br />

        <input
          type="text"
          name="location"
          value={job.location}
          onChange={handleChange}
          placeholder="Location"
          required
        />

        <br /><br />

        <input
          type="text"
          name="salary"
          value={job.salary}
          onChange={handleChange}
          placeholder="Salary"
          required
        />

        <br /><br />

        <textarea
          rows="5"
          name="description"
          value={job.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />

        <br /><br />

        <input
          type="text"
          name="skills"
          value={job.skills}
          onChange={handleChange}
          placeholder="Skills"
          required
        />

        <br /><br />

        <button
          type="submit"
          style={{
            background: "#2563eb",
            color: "#fff",
            border: "none",
            padding: "12px 25px",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Update Job
        </button>

      </form>

    </div>

  );

}

export default EditJobForm;