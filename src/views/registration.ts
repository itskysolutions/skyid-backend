export const registration = (name: string) => {
  return `<body>
  <h4>Hello ${name},</h4>
  <h2>Welcome to Abuja Geographic Information Systems (AGIS)! 😀</h2>
  <p>We are delighted to have you on board. As a registered user, you now have access to a wealth of geographic information and services that can help you explore, understand, and utilize spatial data related to Abuja.</p>
  <p>Here are some of the features and services you can enjoy:</p>
  <p>Access to detailed maps and geographic data of Abuja<br/>
    Property search and verification<br/>
    Land ownership and title information<br/>
    GIS tools for analysis and planning<br/>
    We are committed to providing you with the best possible experience. If you have any questions or need assistance, our support team is here to help. Feel free to reach out to us at [Support Email] or call us at [Support Phone Number].</p>
  <p>Thank you for joining AGIS. We look forward to serving you and helping you make the most of our geographic information systems.</p>
  <p>Best regards,</p>
  <p>The AGIS Team</p>
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
  <p>SKYID support Team</p>
  </body>`;
};
export const resetPasswordTemplate = (name: string) => {
  return `<body>
  <h4>Hello ${name},</h4>
  <h2>Password Reset Successful</h2>
  <p>Your SkyID account password has been successfully reset.</p>
  <p>You can now log in to your account using your new password. If you did not request this change or believe an unauthorized person has accessed your account, please contact our support team immediately.</p>
  <p>Best regards,<br/>SKYID Support Team</p>
  </body>`;
};

export const verifyEmailTemplate = (name: string, otp: string) => {
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

export const kycHTML = (name: string) => {
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
