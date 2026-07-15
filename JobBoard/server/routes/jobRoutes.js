import express from "express";
import { createJob } from "../controllers/jobController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Employer can post a job
router.post("/", authMiddleware, createJob);

export default router;