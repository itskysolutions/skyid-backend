export const registration = (name: string) => {
  return `<body>
  <h4>Hello ${name},</h4>
  <h2>Welcome to Kirani 😀</h2>
  <p>Thank you for joining us. With Kirani, you can make international calls to anywhere in the world, connecting you with friends, family, and business partners effortlessly. We’re excited to have you on board and look forward to providing you with the best calling experience.</p>
  <p>Happy calling!</p>
  <p>The Kirani Team</p>
  </body>`;
};

export const forgotPasswordTemplate = (name: string, otp: string) => {
  return `<body>
  <h4>Hello ${name},</h4>
  <h2>Reset your password</h2>
  <p>We received a request to reset the password associated with your account. Please use the One-Time Password (OTP) provided below to complete your password reset process.</p>
  <p>Your OTP: ${otp}</p>
  <p>This OTP is valid for the next 10 minutes. For security reasons, do not share this OTP with anyone.</p>
  <p>If you did not request a password reset, please ignore this email. Your account will remain secure.</p>
  <p>Best regards,</p>
  <p>Kirani Support Team</p>
  </body>`;
};
export const resetPasswordTemplate = (name: string) => {
  return `<body>
  <h4>Hello ${name},</h4>
  <h2>Password Reset Successful</h2>
  <p>Your Kirani account password has been successfully reset.</p>
  <p>You can now log in to your account using your new password. If you did not request this change or believe an unauthorized person has accessed your account, please contact our support team immediately.</p>
  <p>Best regards,<br/>Kirani Support Team</p>
  </body>`;
};
