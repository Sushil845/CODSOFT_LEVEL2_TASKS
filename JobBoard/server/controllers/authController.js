import User from "../models/User.js";
import Application from "../models/Application.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";

// Register User
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Send Welcome Email
    try {
      await sendEmail({
        to: user.email,
        subject: "🎉 Welcome to CareerNest",
        html: `
          <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px;">

            <h2 style="color:#2563eb;text-align:center;">
              Welcome to CareerNest 🎉
            </h2>

            <p>Hello <strong>${user.name}</strong>,</p>

            <p>Your account has been created successfully.</p>

            <p>You can now:</p>

            <ul>
              <li>🔍 Search Jobs</li>
              <li>💼 Apply for Jobs</li>
              <li>📄 Upload Your Resume</li>
              <li>⭐ Save Jobs</li>
              <li>📊 Track Applications</li>
            </ul>

            <p>We wish you all the best in your career journey.</p>

            <hr>

            <p style="text-align:center;color:gray;">
              Thank you for choosing CareerNest ❤️
            </p>

          </div>
        `,
      });

      console.log("✅ Welcome email sent");
    } catch (emailError) {
      console.log("❌ Welcome Email Error:", emailError.message);
    }

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(201).json({
      message: "User Registered Successfully",
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Forgot Password
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email.",
      });
    }

    // Generate 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    user.resetOtp = otp;
    user.resetOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    try {
      await sendEmail({
        to: user.email,
        subject: "CareerNest Password Reset OTP",
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:auto;border:1px solid #ddd;border-radius:10px;">

            <h2 style="color:#2563eb;text-align:center;">
              Password Reset Request
            </h2>

            <p>Hello <b>${user.name}</b>,</p>

            <p>We received a request to reset your CareerNest password.</p>

            <p>Your OTP is:</p>

            <h1 style="text-align:center;color:#2563eb;">
              ${otp}
            </h1>

            <p>This OTP is valid for <b>10 minutes</b>.</p>

            <p>If you didn't request this, please ignore this email.</p>

            <hr>

            <p style="text-align:center;color:gray;">
              CareerNest Team
            </p>

          </div>
        `,
      });

      console.log("✅ Password Reset OTP Sent");
    } catch (emailError) {
      console.log("OTP Email Error:", emailError.message);
    }

    res.status(200).json({
      message: "OTP sent to your email.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Verify OTP
export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    if (!user.resetOtp || !user.resetOtpExpiry) {
      return res.status(400).json({
        message: "No OTP found. Please request a new one.",
      });
    }

    if (new Date() > user.resetOtpExpiry) {
      return res.status(400).json({
        message: "OTP has expired.",
      });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP.",
      });
    }

    res.status(200).json({
      message: "OTP verified successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Reset Password
export const resetPassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;

    // Clear OTP
    user.resetOtp = "";
    user.resetOtpExpiry = null;

    // Reset failed login attempts
    user.loginAttempts = 0;

    await user.save();

    // Send confirmation email
    try {
      await sendEmail({
        to: user.email,
        subject: "CareerNest Password Changed Successfully",
        html: `
          <div style="font-family:Arial,sans-serif;padding:20px;max-width:600px;margin:auto;border:1px solid #ddd;border-radius:10px;">

            <h2 style="color:#16a34a;text-align:center;">
              Password Changed Successfully
            </h2>

            <p>Hello <b>${user.name}</b>,</p>

            <p>Your CareerNest password has been changed successfully.</p>

            <p>If this wasn't you, please contact support immediately.</p>

            <hr>

            <p style="text-align:center;color:gray;">
              CareerNest Team
            </p>

          </div>
        `,
      });

      console.log("✅ Password Changed Email Sent");
    } catch (emailError) {
      console.log("Password Changed Email Error:", emailError.message);
    }

    res.status(200).json({
      message: "Password reset successful.",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
// Login User
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    // Wrong Password
    if (!isMatch) {
      user.loginAttempts += 1;
      await user.save();

      const remainingAttempts = Math.max(0, 3 - user.loginAttempts);

      return res.status(400).json({
        message: "Invalid Credentials",
        remainingAttempts,
        showForgotPassword: user.loginAttempts >= 3,
      });
    }

    // Reset login attempts after successful login
    user.loginAttempts = 0;
    await user.save();

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const userData = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    res.status(200).json({
      message: "Login Successful",
      token,
      user: userData,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Logged-in User Profile
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    let profileCompletion = 0;

    if (user.name) profileCompletion += 25;
    if (user.email) profileCompletion += 25;
    if (user.resume) profileCompletion += 25;

    const appliedJobs = await Application.countDocuments({
      candidate: req.user.id,
    });

    if (appliedJobs > 0) profileCompletion += 25;

    res.status(200).json({
      ...user.toObject(),
      profileCompletion,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Logged-in User Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (name && name.trim() !== "") {
      user.name = name;
    }

    if (password && password.trim() !== "") {
      user.password = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        resume: user.resume,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};