import express from "express";

import {
  createJob,
  getAllJobs,
  getJobById,
  getMyJobs,
  updateJob,
  deleteJob
} from "../controllers/jobController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create Job
router.post("/", authMiddleware, createJob);

// Get All Jobs
router.get("/", getAllJobs);

// Get Logged-in Employer Jobs
router.get("/myjobs", authMiddleware, getMyJobs);

router.put("/:id", authMiddleware, updateJob);

router.delete("/:id", authMiddleware, deleteJob);
// Get Single Job
router.get("/:id", getJobById);

export default router;