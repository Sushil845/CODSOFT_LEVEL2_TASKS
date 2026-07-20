import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["candidate", "employer"],
      required: true,
    },

    resume: {
      type: String,
      default: "",
    },

    // Login Attempts
    loginAttempts: {
      type: Number,
      default: 0,
    },

    // Password Reset OTP
    resetOtp: {
      type: String,
      default: "",
    },

    resetOtpExpiry: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);