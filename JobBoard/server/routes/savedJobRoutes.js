import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

import {
  saveJob,
  unsaveJob,
  getSavedJobs,
  checkSavedStatus,
} from "../controllers/savedJobController.js";

const router = express.Router();

// Save Job
router.post("/", authMiddleware, saveJob);

// Get Saved Jobs
router.get("/", authMiddleware, getSavedJobs);

// Check Save Status
router.get("/status/:jobId", authMiddleware, checkSavedStatus);

// Remove Saved Job
router.delete("/:jobId", authMiddleware, unsaveJob);

export default router;