import Attempt from "../models/Attempt.js";

export const getMyAttempts = async (req, res) => {
  try {
    const attempts = await Attempt.find({
      user: req.user.id,
    }).populate("quiz", "title description");

    res.status(200).json(attempts);

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};