import API from "../api/axios";

export const getAllQuizzes = async () => {
    const res = await API.get("/quizzes");
    return res.data;
};