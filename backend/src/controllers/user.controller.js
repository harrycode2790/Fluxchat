import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.modal.js";

export const updateUserProfilePic = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

