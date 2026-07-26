import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Register User
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields",
      });
    }

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
});

const userResponse = {
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
};

res.status(201).json({
  message: "Registration successful",
  user: userResponse,
});

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

// Login User
export const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

   const userResponse = {
  _id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
};

res.status(200).json({
  token,
  user: userResponse,
});

  } catch (error) {

    res.status(500).json({
      message: "Server Error",
    });

  }
};
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};