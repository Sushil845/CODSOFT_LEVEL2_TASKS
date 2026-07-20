import fs from "fs";
import path from "path";
import User from "../models/User.js";

export const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Please upload a PDF resume.",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Delete old resume if it exists
    if (user.resume) {
      const oldResumePath = path.join(
        process.cwd(),
        "uploads",
        user.resume
      );

      if (fs.existsSync(oldResumePath)) {
        fs.unlinkSync(oldResumePath);
      }
    }

    // Save new resume filename
    user.resume = req.file.filename;

    await user.save();

    res.status(200).json({
      message: "Resume uploaded successfully.",
      resume: user.resume,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};