import User from "../models/User.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

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

    const fileName = req.file.originalname.replace(/\.[^/.]+$/, "");

    const uploadResult = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "CareerNest/resumes",
          resource_type: "auto",
          public_id: fileName,
          overwrite: true,
          invalidate: true,
          use_filename: false,
          unique_filename: false,
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );

      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });

    console.log("========== CLOUDINARY ==========");
    console.log(uploadResult);
    console.log("================================");

    user.resume = uploadResult.secure_url;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully.",
      resume: uploadResult.secure_url,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};