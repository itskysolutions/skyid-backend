"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = __importDefault(require("../utils/validation"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptService_1 = __importDefault(require("../utils/bcryptService"));
const sendMail_1 = require("../utils/sendMail");
const registration_1 = require("../views/registration");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const otpModels_1 = __importDefault(require("../models/otpModels"));
const generateOtp_1 = require("../utils/generateOtp");
const generate_1 = __importDefault(require("../utils/generate"));
const kycModel_1 = __importDefault(require("../models/kycModel"));
dotenv_1.default.config();
class UserController {
    static async checkEmail(req, res, next) {
        const { email, firstName } = req.body;
        try {
            const { error } = validation_1.default.checkEmail(email);
            if (error)
                return res.status(400).send(error.details[0].message);
            let user = await userModel_1.default.findOne({ email });
            if (user)
                return res.status(400).send({ message: "email is already taken." });
            await otpModels_1.default.deleteOne({ email });
            const getOtp = generate_1.default.otp();
            await new otpModels_1.default({
                email,
                otp: bcryptService_1.default.shared().encode(getOtp),
                createdAt: Date.now(),
                expiresAt: Date.now() + 5_00_000,
            }).save();
            (0, sendMail_1.sendMail)({
                to: email,
                from: "SkyID",
                name: firstName,
                subject: "Register Verify Otp code",
                html: (0, registration_1.verifyEmailTemplate)(firstName, getOtp),
                text: "",
            });
            res.status(201).json({ message: "success" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
        next();
    }
    static async verifyNewUser(req, res, next) {
        const { email, otp } = req.body;
        try {
            const { value, error } = validation_1.default.confirmEmail({ email, otp });
            if (error)
                return res.status(400).send(error.details[0].message);
            const getOtp = await otpModels_1.default.findOne({ email: value.email });
            if (!getOtp)
                return res.status(400).send({ message: "No otp records found" });
            // checking for expired code
            const { expiresAt } = getOtp;
            if (Number(expiresAt) < Date.now()) {
                await otpModels_1.default.deleteOne({ email: value.email });
                return res.status(400).send({ message: "Code has expired. Request for a new one." });
            }
            //comparing otp
            if (!bcryptService_1.default.shared().compare(otp, getOtp.otp))
                return res.status(400).send({ message: "Invalid otp code." });
            // clear any old record
            await otpModels_1.default.deleteOne({ email });
            return res.status(200).json({ message: "success" });
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }
    static async signup(req, res) {
        try {
            const { error } = validation_1.default.signup({ ...req.body });
            if (error)
                return res.status(400).send(error.details[0].message);
            let user = await userModel_1.default.findOne({ email: req.body.email });
            if (user)
                return res.status(400).send({ message: "Email is taken already." });
            user = new userModel_1.default({
                ...req.body,
                verified: "false",
                password: bcryptService_1.default.shared().encode(req.body.password), // encrypt password
            });
            await user.save();
            (0, sendMail_1.sendMail)({
                to: req.body.email,
                from: "Skyid",
                name: req.body.firstName,
                subject: "Welcome to SKYID",
                html: (0, registration_1.registration)(req.body.firstName),
                text: "",
            });
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
            return res.status(200).json({ message: "success", token });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
    static async signin(req, res) {
        const { email, password } = req.body;
        try {
            const { error } = validation_1.default.signIn({ email, password });
            if (error)
                return res.status(400).send(error.details[0].message);
            let user = await userModel_1.default.findOne({ email: req.body.email });
            if (!user)
                return res.status(400).send({ message: "Invalid email or password." });
            if (!bcryptService_1.default.shared().compare(password, user.password))
                return res.status(400).send({ message: "Invalid email or password." });
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
            return res.status(200).json({ message: "success", accessToken: token });
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }
    static async userProfile(req, res, next) {
        try {
            const profileData = await userModel_1.default.findById(req.user?._id).select("-password -__v");
            return res.status(200).json({ message: "success", data: profileData });
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }
    // static async getUsersByEmail(req: Request, res: Response, next: NextFunction) {
    //   const { number } = req.params;
    //   try {
    //     const users = await PhoneNumber.find({ number });
    //     if (!users.length) {
    //       return res.status(404).json({ message: "Phone number is available." });
    //     }
    //     return res.status(200).json({ message: "Phone is taken already", data: users });
    //   } catch (error) {
    //     return res.status(500).json({ message: "Internal Server Error!", error });
    //   }
    // }
    static async verifyUserEmail(req, res, next) {
        try {
            const { email } = req.body;
            const { value, error } = validation_1.default.forgotPassword({ email });
            if (error)
                return res.status(400).send(error.details[0].message);
            let user = await userModel_1.default.findOne({ email: value.email });
            if (!user)
                return res.status(400).send({ message: "User does not exist" });
            // clear any old record
            await otpModels_1.default.deleteOne({ email: user.email });
            const getOtp = generate_1.default.otp();
            await new otpModels_1.default({
                email,
                otp: bcryptService_1.default.shared().encode(getOtp),
                createdAt: Date.now(),
                expiresAt: Date.now() + 5_00_000,
            }).save();
            // send email
            (0, sendMail_1.sendMail)({
                to: email,
                from: "SkyID",
                name: user.firstName,
                subject: "Verify Otp code",
                html: (0, registration_1.verifyEmailTemplate)(user.firstName, getOtp),
                text: "",
            });
            return res.status(200).json({ message: "success" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Service Error" });
        }
    }
    static async confirmUserEmail(req, res, next) {
        const { email, otp } = req.body;
        try {
            const { value, error } = validation_1.default.confirmEmail({ email, otp });
            if (error)
                return res.status(400).send(error.details[0].message);
            let user = await userModel_1.default.findOne({ email: value.email });
            if (!user)
                return res.status(400).send({ message: "Email does not exist." });
            const getOtp = await otpModels_1.default.findOne({ email: value.email });
            if (!getOtp)
                return res.status(400).send({ message: "No otp records found" });
            // checking for expired code
            const { expiresAt } = getOtp;
            if (Number(expiresAt) < Date.now()) {
                await otpModels_1.default.deleteOne({ email: value.email });
                return res.status(400).send({ message: "Code has expired. Request for a new one." });
            }
            //comparing otp
            if (!bcryptService_1.default.shared().compare(otp, getOtp.otp))
                return res.status(400).send({ message: "Invalid otp code." });
            // clear any old record
            await otpModels_1.default.deleteOne({ email: user.email });
            const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
            return res.status(200).json({ message: "success", token });
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }
    static async forgotPassword(req, res, next) {
        try {
            const { email } = req.body;
            const { value, error } = validation_1.default.forgotPassword({ email });
            if (error)
                return res.status(400).send(error.details[0].message);
            let user = await userModel_1.default.findOne({ email: value.email });
            if (!user)
                return res.status(400).send({ message: "User does not exist" });
            // clear any old record
            await otpModels_1.default.deleteOne({ email: user.email });
            const getOtp = (0, generateOtp_1.generateOtp)();
            await new otpModels_1.default({
                email,
                otp: bcryptService_1.default.shared().encode(getOtp),
                createdAt: Date.now(),
                expiresAt: Date.now() + 5_00_000,
            }).save();
            (0, sendMail_1.sendMail)({
                to: email,
                from: "SKYID",
                name: user.firstName,
                subject: "Reset Password",
                html: (0, registration_1.forgotPasswordTemplate)(user.firstName, getOtp),
                text: "",
            });
            return res.status(200).json({ message: "success" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Service Error" });
        }
    }
    static async resetPassword(req, res, next) {
        const { email, otp, password } = req.body;
        try {
            const { value, error } = validation_1.default.resetPassword({ email, password, otp });
            if (error)
                return res.status(400).send(error.details[0].message);
            let user = await userModel_1.default.findOne({ email: value.email });
            if (!user)
                return res.status(400).send({ message: "Email does not exist." });
            const getOtp = await otpModels_1.default.findOne({ email: value.email });
            if (!getOtp)
                return res.status(400).send({ message: "No otp records found" });
            // checking for expired code
            const { expiresAt } = getOtp;
            if (Number(expiresAt) < Date.now()) {
                await otpModels_1.default.deleteOne({ email: value.email });
                return res.status(400).send({ message: "Code has expired. Request for a new one." });
            }
            //comparing otp
            if (!bcryptService_1.default.shared().compare(otp, getOtp.otp))
                return res.status(400).send({ message: "Invalid otp code." });
            // updating password
            await userModel_1.default.updateOne({ email: value.email }, { password: bcryptService_1.default.shared().encode(value.password) });
            // clear any old record
            await otpModels_1.default.deleteOne({ email: user.email });
            // send email
            (0, sendMail_1.sendMail)({
                to: email,
                from: "SKYID",
                name: user.firstName,
                subject: "Password Reset Successful",
                html: (0, registration_1.resetPasswordTemplate)(user.firstName),
                text: "",
            });
            return res.status(200).json({ message: "success" });
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }
    // TODO COMEBACK TO COMPLETE THE VALIDATE
    static async kyc(req, res) {
        try {
            // const { error } = validation.kyc({ ...req.body });
            // if (error) return res.status(400).send(error.details[0].message);
            let user = await userModel_1.default.findOne({ _id: req.body._id });
            if (!user)
                return res.status(400).send({ message: "User does not exist." });
            let kycOld = await kycModel_1.default.findOne({ _id: req.body._id });
            if (kycOld)
                return res.status(400).send({ message: "User has already completed their kyc." });
            // // update user verified status
            await userModel_1.default.updateOne({ user_id: req.body._id }, { verified: "true" });
            let kyc = new kycModel_1.default({ ...req.body });
            await kyc.save();
            (0, sendMail_1.sendMail)({
                to: user?.email,
                from: "Skyid",
                name: user?.firstName,
                subject: "Kyc is completed",
                html: (0, registration_1.kycHTML)(user?.firstName),
                text: "",
            });
            return res.status(200).json({ message: "success" });
            // sending user an email confirming that his account has been verified
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
}
exports.default = UserController;
//# sourceMappingURL=userController.js.map