import SavedJob from "../models/SavedJob.js";

// Save Job
export const saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    if (req.user.role !== "candidate") {
      return res.status(403).json({
        message: "Only candidates can save jobs.",
      });
    }

    const existing = await SavedJob.findOne({
      candidate: req.user.id,
      job: jobId,
    });

    if (existing) {
      return res.status(400).json({
        message: "Job already saved.",
      });
    }

    const savedJob = await SavedJob.create({
      candidate: req.user.id,
      job: jobId,
    });

    res.status(201).json({
      message: "Job saved successfully.",
      savedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Saved Job
export const unsaveJob = async (req, res) => {
  try {
    await SavedJob.findOneAndDelete({
      candidate: req.user.id,
      job: req.params.jobId,
    });

    res.status(200).json({
      message: "Job removed from saved jobs.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Saved Jobs
export const getSavedJobs = async (req, res) => {
  try {
    const savedJobs = await SavedJob.find({
      candidate: req.user.id,
    })
      .populate("job")
      .sort({ createdAt: -1 });

    res.status(200).json(savedJobs);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Check Save Status
export const checkSavedStatus = async (req, res) => {
  try {
    const saved = await SavedJob.findOne({
      candidate: req.user.id,
      job: req.params.jobId,
    });

    res.status(200).json({
      saved: !!saved,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};