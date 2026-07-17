import express from "express";

import {
  applyJob,
  getApplicantsByJob,
  getMyApplications,
  checkApplicationStatus,
} from "../controllers/applicationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply Job
router.post("/", authMiddleware, applyJob);

// Candidate Dashboard
router.get("/my", authMiddleware, getMyApplications);

// Check Application Status
router.get(
  "/status/:jobId",
  authMiddleware,
  checkApplicationStatus
);

// Employer Dashboard
router.get("/:jobId", authMiddleware, getApplicantsByJob);

export default router;