import User from "../models/User.js";

export const uploadResume = async (req, res) => {
  try {
    console.log("========= REQ.FILE =========");
    console.log(req.file);
    console.log("============================");

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

    // Save Cloudinary URL
    user.resume = req.file.path;

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