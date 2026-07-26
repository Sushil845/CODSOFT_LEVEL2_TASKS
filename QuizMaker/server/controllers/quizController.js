import Quiz from "../models/Quiz.js";
import Attempt from "../models/Attempt.js";

// Create Quiz
export const createQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const quiz = await Quiz.create({
      title,
      description,
      questions,
      createdBy: req.user.id,
    });

    res.status(201).json({
      message: "Quiz created successfully",
      quiz,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get All Quizzes
export const getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate(
      "createdBy",
      "name email"
    );

    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Get My Quizzes
export const getMyQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({
      createdBy: req.user.id,
    });

    res.status(200).json(quizzes);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Get Quiz By Id
export const getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    res.status(200).json(quiz);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Delete Quiz
export const deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    if (quiz.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await quiz.deleteOne();

    res.status(200).json({
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Update Quiz
export const updateQuiz = async (req, res) => {
  try {
    const { title, description, questions } = req.body;

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    if (quiz.createdBy.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    quiz.title = title || quiz.title;
    quiz.description = description || quiz.description;
    quiz.questions = questions || quiz.questions;

    await quiz.save();

    res.status(200).json({
      message: "Quiz updated successfully",
      quiz,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};
// Submit Quiz
export const submitQuiz = async (req, res) => {
  try {
    const { answers } = req.body;

    const quiz = await Quiz.findById(req.params.id);

    if (!quiz) {
      return res.status(404).json({
        message: "Quiz not found",
      });
    }

    let score = 0;

    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        score++;
      }
    });

    const attempt = await Attempt.create({
      user: req.user.id,
      quiz: quiz._id,
      answers,
      score,
    });

    res.status(200).json({
      message: "Quiz submitted successfully",
      score,
      totalQuestions: quiz.questions.length,
      percentage: (score / quiz.questions.length) * 100,
      attempt,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};