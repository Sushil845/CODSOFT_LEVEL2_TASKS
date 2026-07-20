import Application from "../models/Application.js";
import Job from "../models/Job.js";
import User from "../models/User.js";
import sendEmail from "../utils/sendEmail.js";

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

    // Send Email to Employer
    try {
      const candidate = await User.findById(req.user.id);

      const job = await Job.findById(jobId).populate(
        "employer",
        "name email"
      );

      if (job && job.employer) {
        await sendEmail({
          to: job.employer.email,
          subject: "📩 New Job Application Received",
          html: `
            <div style="font-family:Arial,sans-serif;padding:20px">

              <h2 style="color:#2563eb;">
                New Job Application
              </h2>

              <p>Hello <b>${job.employer.name}</b>,</p>

              <p>
                A new candidate has applied for your job posting.
              </p>

              <hr>

              <h3>Candidate Details</h3>

              <p><b>Name:</b> ${candidate.name}</p>
              <p><b>Email:</b> ${candidate.email}</p>

              <hr>

              <h3>Job Details</h3>

              <p><b>Position:</b> ${job.title}</p>
              <p><b>Company:</b> ${job.company}</p>

              <p>
                Please login to CareerNest to review this application.
              </p>

              <br>

              <p>Regards,</p>

              <b>CareerNest Team</b>

            </div>
          `,
        });

        console.log("✅ Employer Notification Email Sent");
      }
    } catch (emailError) {
      console.log("Employer Email Error:", emailError.message);
    }

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
      .populate("candidate", "name email resume")
      .populate("job", "title company");

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Applications of Logged-in Candidate
export const getMyApplications = async (req, res) => {
  try {
    const applications = await Application.find({
      candidate: req.user.id,
    })
      .populate("job", "title company")
      .sort({ createdAt: -1 });

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Check if candidate already applied
export const checkApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findOne({
      candidate: req.user.id,
      job: req.params.jobId,
    });

    res.status(200).json({
      applied: !!application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Approve Application
export const approveApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    )
      .populate("candidate", "name email")
      .populate("job", "title company");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // Send Approval Email
    try {
      await sendEmail({
        to: application.candidate.email,
        subject: "🎉 Congratulations! Your Application Has Been Approved",
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px">

            <h2 style="color:#16a34a;">
              Congratulations ${application.candidate.name}!
            </h2>

            <p>
              We are pleased to inform you that your application has been
              <b>approved</b>.
            </p>

            <hr>

            <h3>Job Details</h3>

            <p><b>Company:</b> ${application.job.company}</p>
            <p><b>Position:</b> ${application.job.title}</p>

            <hr>

            <p>
              The employer will contact you soon with the next steps.
            </p>

            <br>

            <p>Best Wishes,</p>

            <b>CareerNest Team</b>

          </div>
        `,
      });

      console.log("✅ Approval Email Sent");
    } catch (emailError) {
      console.log("Approval Email Error:", emailError.message);
    }

    res.status(200).json({
      message: "Application Approved",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Reject Application
export const rejectApplication = async (req, res) => {
  try {
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    )
      .populate("candidate", "name email")
      .populate("job", "title company");

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    // Send Rejection Email
    try {
      await sendEmail({
        to: application.candidate.email,
        subject: "Application Status Update - CareerNest",
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px">

            <h2 style="color:#dc2626;">
              Application Status Update
            </h2>

            <p>Hello <b>${application.candidate.name}</b>,</p>

            <p>
              Thank you for applying through CareerNest.
            </p>

            <hr>

            <h3>Job Details</h3>

            <p><b>Company:</b> ${application.job.company}</p>
            <p><b>Position:</b> ${application.job.title}</p>

            <hr>

            <p>
              After carefully reviewing your application, we regret to inform
              you that you were <b>not selected</b> for this position.
            </p>

            <p>
              We truly appreciate your interest in
              <b>${application.job.company}</b> and encourage you to apply
              again for future opportunities.
            </p>

            <br>

            <p>
              We wish you success in your career journey.
            </p>

            <br>

            <p>Best Regards,</p>

            <b>CareerNest Team</b>

          </div>
        `,
      });

      console.log("✅ Rejection Email Sent");
    } catch (emailError) {
      console.log("Rejection Email Error:", emailError.message);
    }

    res.status(200).json({
      message: "Application Rejected",
      application,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};