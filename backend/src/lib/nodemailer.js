// lib/nodemail.js
import nodemailer from "nodemailer";
import { ENV } from "./env.js";
;

export const accountEmail = "hillarybond10@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: accountEmail,
    pass: ENV.EMAIL_PASSWORD, // your Gmail app password
  },
});

export default transporter;
