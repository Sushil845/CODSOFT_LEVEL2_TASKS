import express from "express";

import {
  applyJob,
  getApplicantsByJob,
  getMyApplications,
  checkApplicationStatus,
  approveApplication,
  rejectApplication,
} from "../controllers/applicationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Apply Job
router.post("/", authMiddleware, applyJob);

// Candidate Dashboard
router.get("/my", authMiddleware, getMyApplications);
// Approve Application
router.put(
  "/:id/approve",
  authMiddleware,
  approveApplication
);

// Reject Application
router.put(
  "/:id/reject",
  authMiddleware,
  rejectApplication
);
// Check Application Status
router.get(
  "/status/:jobId",
  authMiddleware,
  checkApplicationStatus
);

// Employer Dashboard
router.get("/:jobId", authMiddleware, getApplicantsByJob);

export default router;