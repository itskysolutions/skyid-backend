import { Response, Request, NextFunction } from "express";
// import validation from "../utils/validation";
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
  static async checkNumber(req: Request, res: Response) {
    const { number } = req.body;
    try {
      // const { error } = validation.checkPhoneNumber(number);
      // if (error) return res.status(400).send(error.details[0].message);

      let userNumber = await UserNumber?.findOne({ number });
      // not our number
      if (!userNumber) return res.status(400).send({ message: "number does not exist" });

      // is not available
      if (!userNumber.available || userNumber.agentOwner)
        return res.status(400).send({ message: "number is already taken", data: userNumber });

      return res.status(400).send({ message: "available" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async suggestNumber(req: Request, res: Response) {
    const { number } = req.body;
    try {
      // const { error } = validation.checkPhoneNumber(number);
      // if (error) return res.status(400).send(error.details[0].message);

      let userNumber = await UserNumber?.findOne({ number });
      // not our number
      if (!userNumber) return res.status(400).send({ message: "number does not exist" });

      // is not available
      if (!userNumber.available || userNumber.agentOwner)
        return res.status(400).send({ message: "number is already taken", data: userNumber });

      return res.status(400).send({ message: "available" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async buyNumber(req: Request, res: Response) {
    try {
      const guessedNumber = await User.findById(req.user?._id).select("-password -__v");
      return res.status(200).json({ message: "success", data: guessedNumber });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  // static async guessedNumbers(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const guessedNumber = await User.findById(req.user?._id).select("-password -__v");
  //     return res.status(200).json({ message: "success", data: guessedNumber });
  //   } catch (error) {
  //     return res.status(500).json({ message: "Internal Server Error!" });
  //   }
  //   next();
  // }

  // static async buyNumber(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     const guessedNumber = await User.findById(req.user?._id).select("-password -__v");
  //     return res.status(200).json({ message: "success", data: guessedNumber });
  //   } catch (error) {
  //     return res.status(500).json({ message: "Internal Server Error!" });
  //   }
  //   next();
  // }
}
