import { Response, Request, NextFunction } from "express";
import Bcrypt from "../utils/bcryptService";
import { sendMail } from "../utils/sendMail";
import { registration } from "../views/registration";
import dotenv from "dotenv";
import AdminUser from "./model";
import validation from "./validation-schema";

dotenv.config();

export default class UserManagementController {
  static async signup(req: Request, res: Response) {
    try {
      const { error } = validation.signup({ ...req.body });
      if (error) return res.status(400).send(error.details[0].message);

      let user = await AdminUser.findOne({ email: req.body.email });
      if (user) return res.status(400).send({ message: "Email is taken already." });

      user = new AdminUser({
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

      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async userProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const profileData = await AdminUser.findById(req.user?._id).select("-password -__v");
      return res.status(200).json({ message: "success", data: profileData });
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  }
}
