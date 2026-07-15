import express from "express";

import {
  applyJob,
  getApplicantsByJob,
} from "../controllers/applicationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, applyJob);

router.get("/:jobId", authMiddleware, getApplicantsByJob);

export default router;