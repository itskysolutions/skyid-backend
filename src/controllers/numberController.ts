import { Response, Request, NextFunction } from "express";
import validation from "../utils/validation";
import User from "../models/userModel";
import dotenv from "dotenv";
import UserNumber from "../models/numbersModel";

dotenv.config();

// Extend the Request interface to include user property
declare module "express-serve-static-core" {
  interface Request {
    user?: any;
  }
}

export default class NumberController {
  static async checkNumber(req: Request, res: Response, next: NextFunction) {
    const { number } = req.body;
    try {
      // const { error } = validation.checkPhoneNumber(number);
      // if (error) return res.status(400).send(error.details[0].message);

      // if (user)
      let user = await UserNumber.findOne({ billingPass: "736770" });
      console.log(user?.number, "user");
      console.log(number, "checking numbers");

      return res.status(400).send({ message: "phone is already taken." });

      // res.status(201).json({ message: "success", data: user });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
    next();
  }

  static async guessedNumbers(req: Request, res: Response, next: NextFunction) {
    try {
      const guessedNumber = await User.findById(req.user?._id).select("-password -__v");
      return res.status(200).json({ message: "success", data: guessedNumber });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
    next();
  }

  static async buyNumber(req: Request, res: Response, next: NextFunction) {
    try {
      const guessedNumber = await User.findById(req.user?._id).select("-password -__v");
      return res.status(200).json({ message: "success", data: guessedNumber });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
    next();
  }
}
