import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { IMail } from "../types";

dotenv.config();

export const sendMail = async ({ to, name, subject, html, text }: IMail) => {
  const { AUTH_EMAIL, AUTH_PASSWORD, EMAIL_SERVICE } = process.env;

  let transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: AUTH_EMAIL,
      pass: AUTH_PASSWORD,
    },
  });

  const mailOptions = {
    from: '"no-reply" <noreply@jega.io>',
    to: to,
    subject: subject || "Registration Success",
    html: html || `<body><h2>Hello ${name}! </h2><p>We're glad to have you on board at Jega. </p></body>`,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log("Error sending email", error);
      // res?.status(400).send({ message: "Error sending email", data: error });
    } else {
      console.log("Email Sent!", error);
      // res?.status(200).json({ message: "Email Sent!" });
    }
  });
};
