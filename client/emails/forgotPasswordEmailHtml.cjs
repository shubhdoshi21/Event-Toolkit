function getForgotPasswordEmailHtml(username, otp) {
  return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
    <head>
      <title>Reset Your Password</title>
      <style>
        body { font-family: Roboto, Verdana, sans-serif; }
        .container { padding: 20px; }
        .heading { font-size: 24px; }
        .text { margin-top: 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <h2 class="heading">Hello ${username},</h2>
        <p class="text">
          We received a request to reset your password. Use the following OTP to reset it:
        </p>
        <p class="text"><strong>${otp}</strong></p>
        <p class="text">
          If you did not request this, please ignore this email.
        </p>
      </div>
    </body>
    </html>
  `;
}

module.exports = getForgotPasswordEmailHtml;
