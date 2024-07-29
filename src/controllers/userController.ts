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

dotenv.config();

// Extend the Request interface to include user property
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export default class UserController {
  static async checkEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;
    try {
      const { error } = validation.checkEmail(email);
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ email });
      if (user) return res.status(400).send({ message: "email is already taken." });

      res.status(201).json({ message: "success", data: "available" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
    next();
  }

  static async checkPhoneNumber(req: Request, res: Response, next: NextFunction) {
    const { phoneNumber } = req.body;
    try {
      const { error } = validation.checkPhoneNumber(phoneNumber);
      if (error) return res.status(400).send(error.details[0].message);

      // ready to go
      let user = await User.findOne({ phoneNumber });
      if (user) {
        res.status(400).send({ message: "phone number exists." });
      } else {
        return res.status(201).json({ message: "success", data: "available" });
      }
    } catch (error) {
      console.log(error, "error");
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async signup(req: Request, res: Response) {
    const { firstName, lastName, email, password, phoneNumber, address, nin, currency } = req.body;
    try {
      const { error } = validation.signup({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
      });
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ email });
      if (user) return res.status(409).send({ message: "User already registered." });

      user = new User({
        firstName,
        lastName,
        email,
        password: Bcrypt.shared().encode(password), // encrypt password
        phoneNumber,
      });

      await user.save();

      sendMail({
        to: email,
        from: "AGIS",
        name: firstName,
        subject: "Welcome to AGIS",
        html: registration(firstName),
        text: "",
      });

      return res.status(201).json({ message: "success", data: "User created" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async signin(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const { value, error } = validation.signIn({ email, password });
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
        from: "AGIS",
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

      // updating account type
      // await User.updateOne({ email }, { accountType: "Tier 1" });

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
        from: "Kirani",
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
        from: "Kirani",
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
}

//@desc Post signin
//@route POST /api/auth/signup
//@access public

//@desc Post signin
//@route POST /api/auth/signup
//@access public
// const signin = async (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body;
//   try {
//     const { value, error } = validation.signIn({ email, password });
//     if (error) return res.status(400).send(error.details[0].message);

//     // ready to go
//     return res.status(200).json({ message: "success", data: value });
//   } catch (error) {
//     console.log(error, "here");
//     return res.status(500).json({ message: error });
//   }

//   next();
// };

// const forgotPassword = (req: Request, res: Response) => {
//   const { email } = req.body;
//   try {
//     const { value, error } = validation.forgotPassword({ email });
//     if (error) return res.status(400).send(error.details[0].message);
//     return res.status(200).json({ message: "success", data: value });
//   } catch (error) {
//     console.log("Server error 500");
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// const resetPassword = (req: Request, res: Response) => {
//   return res.status(200).json({ message: "reset" });
// };
