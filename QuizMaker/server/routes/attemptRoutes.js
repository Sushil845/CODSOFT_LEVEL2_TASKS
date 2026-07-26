import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { getMyAttempts } from "../controllers/attemptController.js";

const router = express.Router();

router.get("/", authMiddleware, getMyAttempts);

export default router;