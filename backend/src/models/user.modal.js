import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePic: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      maxlength: 100,
      default: "",
    },
    role: {
      type: String,
      enum: ["admin", "user"], // restricts allowed values
      default: "user",         // default role
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;


