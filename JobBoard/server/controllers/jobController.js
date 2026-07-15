import Job from "../models/Job.js";

// Create Job
export const createJob = async (req, res) => {
  try {

    const {
      title,
      company,
      location,
      salary,
      description,
      skills
    } = req.body;

    const job = await Job.create({
      title,
      company,
      location,
      salary,
      description,
      skills,
      employer: req.user.id
    });

    res.status(201).json({
      message: "Job Posted Successfully",
      job
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};