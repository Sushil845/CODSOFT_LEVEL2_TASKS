import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Applicants() {

  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        `http://localhost:5000/api/applications/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        background: "#fff",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 10px 25px rgba(0,0,0,.1)",
      }}
    >

      <h1>Applicants</h1>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >

        <thead>

          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>

        </thead>

        <tbody>

          {applications.map((app) => (

            <tr key={app._id}>

              <td>{app.candidate.name}</td>

              <td>{app.candidate.email}</td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

export default Applicants;