import { generateToken } from "../lib/utils.js";
import User from "../models/user.modal.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res) => {
  const { fullName, email, password, bio } = req.body;

  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long." });
    }
    // check if email is vaild :regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address." });
    }

    const user = await User.findOne({ email });
    if (user) return res.status(409).json({ message: "Email already in use." });

    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      bio,
    });

    if (newUser) {
      // generateToken(newUser._id, res);
      // await newUser.save();
      const savedUser = await newUser.save();
      generateToken(savedUser._id, res);
      
      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        bio: newUser.bio,
      });

      // todo: send welcome email to User

    } else {
      res.status(500).json({ message: "Failed to create user." });
    }
  } catch (error) {
    console.log("Error in signUp:", error);
    res.status(500).json({ message: "Server error." });
  }
};
