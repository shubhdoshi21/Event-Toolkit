const { Resend } = require("resend");
const getForgotPasswordEmailHtml = require("../../client/emails/forgotPasswordEmailHtml.cjs");
const { ApiError } = require("../utils/ApiError");
const { ApiResponse } = require("../utils/ApiResponse");

async function sendForgotPasswordEmail(email, username, otp) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const emailHtml = getForgotPasswordEmailHtml(username, otp);

    const data = await resend.emails.send({
      from: "Event-Toolkit <noreply@resend.dev>",
      to: email,
      subject: "Reset your password",
      html: emailHtml,
    });
    return new ApiResponse(200, {
      message: "Forgot Password OTP sent successfully",
    });
  } catch (emailError) {
    console.error("Error sending forgot password OTP email:", emailError);
    throw new ApiError(500, "Failed to send forgot password OTP email");
  }
}

module.exports = { sendForgotPasswordEmail };
