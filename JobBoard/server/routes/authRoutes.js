import express from "express";

import {
  register,
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getProfile,
  updateProfile,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.get("/profile", authMiddleware, getProfile);
router.post("/reset-password", resetPassword);
router.put("/profile", authMiddleware, updateProfile);

export default router;