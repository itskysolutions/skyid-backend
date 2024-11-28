import { Response, Request, NextFunction } from "express";
import validation from "../utils/validation";
import User from "../models/userModel";
import Bcrypt from "../utils/bcryptService";
import { sendMail } from "../utils/sendMail";
import {
  forgotPasswordTemplate,
  registration,
  resetPasswordTemplate,
  verifyEmailTemplate,
} from "../views/registration";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Otp from "../models/otpModels";
import { generateOtp } from "../utils/generateOtp";
import generate from "../utils/generate";
import PhoneNumber from "../models/numbersModel";
import Kyc from "../models/kycModel";

dotenv.config();

// Extend the Request interface to include user property
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export default class UserController {
  static async checkEmail(req: Request, res: Response, next: NextFunction) {
    const { email, firstName } = req.body;
    try {
      const { error } = validation.checkEmail(email);
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ email });
      if (user) return res.status(400).send({ message: "email is already taken." });

      await Otp.deleteOne({ email });

      const getOtp = generate.otp();
      await new Otp({
        email,
        otp: Bcrypt.shared().encode(getOtp),
        createdAt: Date.now(),
        expiresAt: Date.now() + 5_00_000,
      }).save();

      sendMail({
        to: email,
        from: "SkyID",
        name: firstName,
        subject: "Register Verify Otp code",
        html: verifyEmailTemplate(firstName as string, getOtp as never),
        text: "",
      });

      res.status(201).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
    next();
  }

  static async verifyNewUser(req: Request, res: Response, next: NextFunction) {
    const { email, otp } = req.body;
    try {
      const { value, error } = validation.confirmEmail({ email, otp });
      if (error) return res.status(400).send(error.details[0].message);

      const getOtp = await Otp.findOne({ email: value.email });
      if (!getOtp) return res.status(400).send({ message: "No otp records found" });

      // checking for expired code
      const { expiresAt } = getOtp;
      if (Number(expiresAt) < Date.now()) {
        await Otp.deleteOne({ email: value.email });
        return res.status(400).send({ message: "Code has expired. Request for a new one." });
      }

      //comparing otp
      if (!Bcrypt.shared().compare(otp, getOtp.otp)) return res.status(400).send({ message: "Invalid otp code." });

      // clear any old record
      await Otp.deleteOne({ email });
      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async signup(req: Request, res: Response) {
    try {
      const { error } = validation.signup({ ...req.body });
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ email: req.body.email });
      if (user) return res.status(400).send({ message: "Email is taken already." });

      user = new User({
        ...req.body,
        verified: "false",
        password: Bcrypt.shared().encode(req.body.password), // encrypt password
      });

      await user.save();

      sendMail({
        to: req.body.email,
        from: "Skyid",
        name: req.body.firstName,
        subject: "Welcome to SKYID",
        html: registration(req.body.firstName),
        text: "",
      });

      const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY as string);
      return res.status(200).json({ message: "success", token });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { error } = validation.signIn({ email, password });
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ email: req.body.email });
      if (!user) return res.status(400).send({ message: "Invalid email or password." });

      if (!Bcrypt.shared().compare(password, user.password as string))
        return res.status(400).send({ message: "Invalid email or password." });

      const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY as string);

      return res.status(200).json({ message: "success", accessToken: token });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async userProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profileData = await User.findById(req.user?._id).select("-password -__v");
      return res.status(200).json({ message: "success", data: profileData });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async getUsersByEmail(req: Request, res: Response, next: NextFunction) {
    const { number } = req.params;
    try {
      const users = await PhoneNumber.find({ number });
      if (!users.length) {
        return res.status(404).json({ message: "Phone number is available." });
      }
      return res.status(200).json({ message: "Phone is taken already", data: users });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!", error });
    }
  }

  static async verifyUserEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const { value, error } = validation.forgotPassword({ email });
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ email: value.email });
      if (!user) return res.status(400).send({ message: "User does not exist" });

      // clear any old record
      await Otp.deleteOne({ email: user.email });

      const getOtp = generate.otp();
      await new Otp({
        email,
        otp: Bcrypt.shared().encode(getOtp),
        createdAt: Date.now(),
        expiresAt: Date.now() + 5_00_000,
      }).save();

      // send email
      sendMail({
        to: email,
        from: "SkyID",
        name: user.firstName as string,
        subject: "Verify Otp code",
        html: verifyEmailTemplate(user.firstName as string, getOtp as never),
        text: "",
      });

      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Service Error" });
    }
  }

  static async confirmUserEmail(req: Request, res: Response, next: NextFunction) {
    const { email, otp } = req.body;
    try {
      const { value, error } = validation.confirmEmail({ email, otp });
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ email: value.email });
      if (!user) return res.status(400).send({ message: "Email does not exist." });

      const getOtp = await Otp.findOne({ email: value.email });
      if (!getOtp) return res.status(400).send({ message: "No otp records found" });

      // checking for expired code
      const { expiresAt } = getOtp;
      if (Number(expiresAt) < Date.now()) {
        await Otp.deleteOne({ email: value.email });
        return res.status(400).send({ message: "Code has expired. Request for a new one." });
      }

      //comparing otp
      if (!Bcrypt.shared().compare(otp, getOtp.otp)) return res.status(400).send({ message: "Invalid otp code." });

      // clear any old record
      await Otp.deleteOne({ email: user.email });

      const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY as string);
      return res.status(200).json({ message: "success", token });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body;
      const { value, error } = validation.forgotPassword({ email });
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ email: value.email });
      if (!user) return res.status(400).send({ message: "User does not exist" });

      // clear any old record
      await Otp.deleteOne({ email: user.email });

      const getOtp = generateOtp();
      await new Otp({
        email,
        otp: Bcrypt.shared().encode(getOtp),
        createdAt: Date.now(),
        expiresAt: Date.now() + 5_00_000,
      }).save();

      sendMail({
        to: email,
        from: "SKYID",
        name: user.firstName as string,
        subject: "Reset Password",
        html: forgotPasswordTemplate(user.firstName as string, getOtp),
        text: "",
      });

      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Service Error" });
    }
  }

  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    const { email, otp, password } = req.body;
    try {
      const { value, error } = validation.resetPassword({ email, password, otp });
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ email: value.email });
      if (!user) return res.status(400).send({ message: "Email does not exist." });

      const getOtp = await Otp.findOne({ email: value.email });
      if (!getOtp) return res.status(400).send({ message: "No otp records found" });

      // checking for expired code
      const { expiresAt } = getOtp;
      if (Number(expiresAt) < Date.now()) {
        await Otp.deleteOne({ email: value.email });
        return res.status(400).send({ message: "Code has expired. Request for a new one." });
      }

      //comparing otp
      if (!Bcrypt.shared().compare(otp, getOtp.otp)) return res.status(400).send({ message: "Invalid otp code." });

      // updating password
      await User.updateOne({ email: value.email }, { password: Bcrypt.shared().encode(value.password) });
      // clear any old record
      await Otp.deleteOne({ email: user.email });

      // send email
      sendMail({
        to: email,
        from: "SKYID",
        name: user.firstName as string,
        subject: "Password Reset Successful",
        html: resetPasswordTemplate(user.firstName as string),
        text: "",
      });

      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }

  static async kyc(req: Request, res: Response) {
    try {
      const { error } = validation.kyc({ ...req.body });
      if (error) return res.status(400).send(error.details[0].message);

      // let user = await User.findOne({ email: req.body.email });
      // if (user) return res.status(400).send({ message: "Email is taken already." });

      // saving verified user
      let kyc = new Kyc({ ...req.body });
      await kyc.save();

      // update user verified status
      let user = new User({ verified: "true" });
      await user.save();

      // sending user an email confirming that his account has been verified
      sendMail({
        to: req.body.email,
        from: "Skyid",
        name: req.body.firstName,
        subject: "Kyc is completed",
        html: registration(req.body.firstName),
        text: "",
      });

      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
}
