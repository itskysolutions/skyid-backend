import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { IMail } from "../types";

dotenv.config();

export const sendMail = async ({ to, from, name, subject, html, text }: IMail) => {
  const { AUTH_EMAIL, AUTH_PASSWORD, EMAIL_SERVICE } = process.env;

  let transporter = nodemailer.createTransport({
    service: EMAIL_SERVICE,
    auth: {
      user: AUTH_EMAIL,
      pass: AUTH_PASSWORD,
    },
  });

  const mailOptions = {
    from: `${from || "no-reply"} <noreply@karani.com>`,
    to: to,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log("Error sending email", error);
    } else {
      console.log("Email Sent!", error);
    }
  });
};
