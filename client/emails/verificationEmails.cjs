// src/emails/verificationEmailHtml.js
function getVerificationEmailHtml(username, otp) {
  return `
    <!DOCTYPE html>
    <html lang="en" dir="ltr">
    <head>
      <title>Verification Code</title>
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
          Thank you for registering. Please use the following verification
          code to complete your registration:
        </p>
        <p class="text"><strong>${otp}</strong></p>
        <p class="text">
          If you did not request this code, please ignore this email.
        </p>
      </div>
    </body>
    </html>
  `;
}

module.exports = getVerificationEmailHtml;
