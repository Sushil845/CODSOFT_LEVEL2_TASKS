import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  createQuiz,
  getAllQuizzes,
  getMyQuizzes,
  getQuizById,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} from "../controllers/quizController.js";

const router = express.Router();

router.post("/", authMiddleware, createQuiz);

router.get("/", getAllQuizzes);

router.get("/my", authMiddleware, getMyQuizzes);

router.get("/:id", getQuizById);

router.put("/:id", authMiddleware, updateQuiz);

router.delete("/:id", authMiddleware, deleteQuiz);

router.post("/:id/submit", authMiddleware, submitQuiz);

export default router;