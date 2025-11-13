import jwt from "jsonwebtoken";
import { ENV } from "../lib/env.js";
import User from "../models/user.modal.js";

export const authorize = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token)
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided." });

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded)
      return res.status(401).json({ message: "Unauthorized: Invalid token." });

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found." });

    req.user = user; // attach thr user object to the req body
    next();
  } catch (error) {
    console.error("Authorization error:", error);
    res.status(500).json({ message: "Server error during authorization." });
  }
};
