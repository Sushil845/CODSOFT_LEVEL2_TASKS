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
// Get All Jobs
export const getAllJobs = async (req, res) => {

  try {

    const jobs = await Job.find().populate(
      "employer",
      "name email"
    );

    res.status(200).json(jobs);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
// Get Single Job
export const getJobById = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id).populate(
      "employer",
      "name email"
    );

    if (!job) {
      return res.status(404).json({
        message: "Job not found"
      });
    }

    res.status(200).json(job);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};