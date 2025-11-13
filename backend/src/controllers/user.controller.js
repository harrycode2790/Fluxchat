import cloudinary from "../lib/cloudinary.js";
import User from "../models/user.modal.js";

export const updateUserProfilePic = async (req, res) => {
  try {
    const { profilePic } = req.body;
    if (!profilePic)
      return res.status(400).json({ message: "Profile pic is required" });
    // get the user id

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUserProfilePic = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUserProfilePic)
  } catch (error) {
    console.log("Error in updating profile picture", error)
    res.status(500).json({ message: "Server error." });
  }
};
