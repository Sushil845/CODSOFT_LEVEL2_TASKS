import axios from "axios";

const API_URL = "https://codsoft-level2-tasks.onrender.com/api/saved-jobs";

const getToken = () => {
  return localStorage.getItem("token");
};

export const saveJob = async (jobId) => {
  const res = await axios.post(
    API_URL,
    { jobId },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res.data;
};

export const unsaveJob = async (jobId) => {
  const res = await axios.delete(
    `${API_URL}/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res.data;
};

export const getSavedJobs = async () => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  return res.data;
};

export const checkSavedStatus = async (jobId) => {
  const res = await axios.get(
    `${API_URL}/status/${jobId}`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  return res.data;
};