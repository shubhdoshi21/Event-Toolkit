const { Resend } = require("resend");
const getVerificationEmailHtml = require("../../client/emails/verificationEmails.cjs");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

async function sendVerificationEmail(email, username, verifyCode) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailHtml = getVerificationEmailHtml(username, verifyCode);

    const data = await resend.emails.send({
      from: "Event-Toolkit <noreply@resend.dev>",
      to: email,
      subject: "Verification code",
      html: emailHtml,
    });
    return new ApiResponse(200, {
      message: "Verification email sent successfully",
    });
  } catch (emailError) {
    console.error("Error sending verification email:", emailError);
    throw new ApiError(500, "Failed to send verification email");
  }
}

module.exports = { sendVerificationEmail };
