"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendMail = async ({ to, from, name, subject, html, text }) => {
    const { AUTH_EMAIL, AUTH_PASSWORD, EMAIL_SERVICE } = process.env;
    let transporter = nodemailer_1.default.createTransport({
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
        }
        else {
            console.log("Email Sent!", error);
        }
    });
};
exports.sendMail = sendMail;
//# sourceMappingURL=sendMail.js.map