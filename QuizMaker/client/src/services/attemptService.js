import API from "../api/axios";

export const getMyAttempts = async () => {
  const token = localStorage.getItem("token");

  const res = await API.get("/attempts", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};