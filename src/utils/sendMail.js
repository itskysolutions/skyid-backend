"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendMail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, from, name, subject, html, text }) {
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
});
exports.sendMail = sendMail;
