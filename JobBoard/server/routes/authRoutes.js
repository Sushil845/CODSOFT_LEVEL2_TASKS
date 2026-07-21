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
import profileUpload from "../config/profileUpload.js";

const router = express.Router();

// Authentication
router.post("/register", register);
router.post("/login", login);

// Password Reset
router.post("/forgot-password", forgotPassword);
router.post("/verify-otp", verifyOtp);
router.post("/reset-password", resetPassword);

// User Profile
router.get("/profile", authMiddleware, getProfile);

router.put(
  "/profile",
  authMiddleware,
  profileUpload.single("profileImage"),
  updateProfile
);

export default router;