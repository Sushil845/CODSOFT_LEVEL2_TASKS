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

// Get Logged-in Employer Jobs
export const getMyJobs = async (req, res) => {

  try {

    const jobs = await Job.find({
      employer: req.user.id
    }).populate(
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

// Update Job
export const updateJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    if (!job) {

      return res.status(404).json({
        message: "Job not found"
      });

    }

    // Only the employer who created the job can update it
    if (job.employer.toString() !== req.user.id) {

      return res.status(403).json({
        message: "Unauthorized"
      });

    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      message: "Job Updated Successfully",
      job: updatedJob
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

// Delete Job
export const deleteJob = async (req, res) => {

  try {

    const job = await Job.findById(req.params.id);

    if (!job) {

      return res.status(404).json({
        message: "Job not found"
      });

    }

    // Only the employer who created the job can delete it
    if (job.employer.toString() !== req.user.id) {

      return res.status(403).json({
        message: "Unauthorized"
      });

    }

    await Job.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Job Deleted Successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};