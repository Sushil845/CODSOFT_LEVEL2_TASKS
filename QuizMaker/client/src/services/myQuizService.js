import API from "../api/axios";

export const getMyQuizzes = async () => {
  const res = await API.get("/quizzes/my");
  return res.data;
};

export const deleteQuiz = async (id) => {
  const res = await API.delete(`/quizzes/${id}`);
  return res.data;
};