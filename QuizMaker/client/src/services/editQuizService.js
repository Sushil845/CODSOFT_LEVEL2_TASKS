import API from "../api/axios";

export const getQuizById = async (id) => {
    const res = await API.get(`/quizzes/${id}`);
    return res.data;
};

export const updateQuiz = async (id, quizData) => {
    const res = await API.put(`/quizzes/${id}`, quizData);
    return res.data;
};