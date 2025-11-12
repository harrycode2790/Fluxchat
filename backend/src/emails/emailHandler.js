// emails/emailHandler.js
import transporter, { accountEmail } from "../lib/nodemailer.js";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  try {
    const html = createWelcomeEmailTemplate(name, clientURL);

    const mailOptions = {
      from: `"FluxChat Support" <${accountEmail}>`,
      to: email,
      subject: "Welcome to FluxChat",
      text: `Hey ${name}, welcome to FluxChat! Visit us at ${clientURL}`,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" Welcome email sent successfully:", info.messageId);
    return info;
  } catch (error) {
    console.error(" Error sending welcome email:", error);
    throw new Error("Failed to send welcome email");
  }
};
