const nodemailer = require("nodemailer");
const getForgotPasswordEmailHtml = require("../../client/emails/forgotPasswordEmailHtml.cjs");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

async function sendForgotPasswordEmailNode(email, username, otp) {
  try {
    // Configure the SMTP transporter


    const transporter = nodemailer.createTransport({
      service: "gmail", // Replace with your SMTP host (e.g., smtp.gmail.com)
      port: 465, // Replace with the SMTP port (587 is common for STARTTLS)
      secure: true, // Use true for port 465, false for other ports
      auth: {
        user: process.env.SMTP_USER, // Your SMTP email username
        pass: process.env.SMTP_PASSWORD, // Your SMTP email password
      },
    });

    // Get the email HTML content
    const emailHtml = getForgotPasswordEmailHtml(username, otp);

    // Send the email
    const info = await transporter.sendMail({
      from: '"Event-Toolkit" <noreply@example.com>', // Sender address
      to: email, // Recipient's email
      subject: "Reset your password", // Subject line
      html: emailHtml, // Email body in HTML format
    });

    console.log("Forgot Password email sent:", info.messageId);

    return new ApiResponse(200, {
      message: "Forgot Password OTP sent successfully",
    });
  } catch (emailError) {
    console.error("Error sending forgot password OTP email:", emailError);
    throw new ApiError(500, "Failed to send forgot password OTP email");
  }
}

module.exports = { sendForgotPasswordEmailNode };
