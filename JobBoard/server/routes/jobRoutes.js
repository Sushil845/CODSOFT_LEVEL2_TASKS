import express from "express";
import {
  createJob,
  getAllJobs,
  getJobById
} from "../controllers/jobController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Job
router.post("/", authMiddleware, createJob);

// Get All Jobs
router.get("/", getAllJobs);

// Get Single Job
router.get("/:id", getJobById);

export default router;