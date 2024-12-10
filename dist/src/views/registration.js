"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.depositMoneyTemplate = exports.kycHTML = exports.verifyEmailTemplate = exports.resetPasswordTemplate = exports.forgotPasswordTemplate = exports.registration = void 0;
const registration = (name) => {
    return `<body>
  <h4>Hello ${name},</h4>
  <h2>Welcome to SkyID! 😀</h2>
  <p>We are delighted to have you on board. As a registered user</p>
  <p>Thank you for joining SkyID. We look forward to serving you and helping you make the most of our geographic information systems.</p>
  <p>Best regards,</p>
  <p>The SkyID Team</p>
  </body>`;
};
exports.registration = registration;
const forgotPasswordTemplate = (name, otp) => {
    return `<body>
  <h4>Hello ${name},</h4>
  <h2>Reset your password</h2>
  <p>We received a request to reset the password associated with your account. Please use the One-Time Password (OTP) provided below to complete your password reset process.</p>
  <p>Your OTP: ${otp}</p>
  <p>This OTP is valid for the next 10 minutes. For security reasons, do not share this OTP with anyone.</p>
  <p>If you did not request a password reset, please ignore this email. Your account will remain secure.</p>
  <p>Best regards,</p>
  <p>SKYID support Team</p>
  </body>`;
};
exports.forgotPasswordTemplate = forgotPasswordTemplate;
const resetPasswordTemplate = (name) => {
    return `<body>
  <h4>Hello ${name},</h4>
  <h2>Password Reset Successful</h2>
  <p>Your SkyID account password has been successfully reset.</p>
  <p>You can now log in to your account using your new password. If you did not request this change or believe an unauthorized person has accessed your account, please contact our support team immediately.</p>
  <p>Best regards,<br/>SKYID Support Team</p>
  </body>`;
};
exports.resetPasswordTemplate = resetPasswordTemplate;
const verifyEmailTemplate = (name, otp) => {
    return `<body>
  <h4>Hello ${name},</h4>
  <h2>Verify otp code</h2>
  <p>Please use the One-Time Password (OTP) provided below to verify your account.</p>
  <p>Your OTP: ${otp}</p>
  <p>This OTP is valid for the next 10 minutes. For security reasons, do not share this OTP with anyone.</p>
  <p>If you did not request a password reset, please ignore this email. Your account will remain secure.</p>
  <p>Best regards,</p>
  <p>The SKYID Team</p>
  </body>`;
};
exports.verifyEmailTemplate = verifyEmailTemplate;
const kycHTML = (name) => {
    return `<body>
  <h4>Hello ${name},</h4>
  <h2>Congratulations! Your KYC is Completed</h2>
  
  <p>We are pleased to inform you that your Know Your Customer (KYC) process has been successfully completed. This means your account is now fully verified, and you can enjoy all the features and services available to our registered users.</p>
  
  <p>With your KYC completed, you now have full access to all the services and features of your account. If you have any further questions or need assistance, please feel free to reach out to our support team.</p>
  
  <p>Thank you for your cooperation, and we look forward to continuing to serve you.</p>
  
  <p>Best regards,</p>
  <p>The SKYID Team</p>
  </body>`;
};
exports.kycHTML = kycHTML;
const depositMoneyTemplate = (name, amount) => {
    return `
  <body>
    <h4>Hello ${name},</h4>
    <h2>Deposit Successful!</h2>
    <p>We are pleased to inform you that an amount of ${amount} has been successfully deposited into your wallet.</p>
    <p>You can now use these funds for various transactions and services available on our platform.</p>
    <p>If you have any questions or encounter any issues, please do not hesitate to reach out to our support team at [Support Email] or call us at [Support Phone Number].</p>
    <p>Thank you for choosing our services.</p>
    <p>Best regards,</p>
    <p>The SKYID Team</p>
  </body>`;
};
exports.depositMoneyTemplate = depositMoneyTemplate;
//# sourceMappingURL=registration.js.map