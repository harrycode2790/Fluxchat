
import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.modal.js";



export const updateUserProfilePic = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic)
      return res.status(400).json({ message: "Profile picture is required" });

    const userId = req.user._id 

    const uploadResponse = await cloudinary.uploader.upload(profilePic)

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    res.status(200).json({
      message: "Profile picture updated successfully",
      profilePic: updatedUser.profilePic,
    });
  } catch (error) {
    console.error("Error updating profile picture:", error);
    res
      .status(500)
      .json({ message: "Server error while updating profile picture", error: error.message });
  }
};
