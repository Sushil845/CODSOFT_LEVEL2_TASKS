import Application from "../models/Application.js";

// Apply for Job
export const applyJob = async (req, res) => {
  try {

    const { jobId } = req.body;

    // Only candidates can apply
    if (req.user.role !== "candidate") {
      return res.status(403).json({
        message: "Only candidates can apply for jobs.",
      });
    }

    // Check if candidate already applied
    const existingApplication = await Application.findOne({
      candidate: req.user.id,
      job: jobId,
    });

    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job.",
      });
    }

    // Save Application
    const application = await Application.create({
      candidate: req.user.id,
      job: jobId,
    });

    res.status(201).json({
      message: "Application Submitted Successfully",
      application,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get Applicants
export const getApplicantsByJob = async (req, res) => {
  try {

    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("candidate", "name email")
      .populate("job", "title company");

    res.status(200).json(applications);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};