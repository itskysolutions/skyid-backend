import { Response, Request } from "express";
import validation from "../utils/validation";
import User from "../models/userModel";
import dotenv from "dotenv";
import UserNumber from "../models/numbersModel";
import { BuyNumberMeta, IPhoneNumber } from "../types";
import { Paystack } from "../utils/paystack";
import SkyId from "../models/skyIdModel";

dotenv.config();

export default class NumberController {
  static async checkNumber(req: Request, res: Response) {
    const { number } = req.body;
    try {
      const { error } = validation.checkPhoneNumber(number);
      if (error) return res.status(400).send(error.details[0].message);

      let userNumber = await UserNumber?.findOne({ number });
      // not our number
      if (!userNumber) return res.status(403).send({ message: "number does not exist" });

      // console.log(userNumber.available, "logs");
      // if (!userNumber.available || userNumber.usedBy || userNumber.agentOwner)
      if (userNumber.available === "false")
        return res.status(403).send({ message: "number is already taken", data: userNumber?.number });

      return res.status(200).send({ message: "available", data: userNumber.available });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async suggestNumber(req: Request, res: Response) {
    const { count } = req.query;
    try {
      const suggestionCount = parseInt(count as string);
      if (!Number.isInteger(suggestionCount)) {
        return res.status(400).send({ message: "Invalid suggestion count" });
      }

      const suggestedNumbers: Array<IPhoneNumber> | undefined = await UserNumber?.aggregate([
        { $match: { available: true, usedBy: null, agentOwner: null } },
        { $sample: { size: suggestionCount } }, // select random numbers
      ]);

      if (!suggestedNumbers || suggestedNumbers.length === 0) {
        console.log("EMERGENCY: There are no available phone numbers in the database.");
        return res.status(500).send({ message: "please try again later" });
      }

      const data = suggestedNumbers.map((num) => num.number);
      return res.status(200).send({ message: "success", data });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  // TODO: add vat to amount
  static async buyNumber(req: Request, res: Response) {
    try {
      const { error, value } = validation.buyNumber(req.body);
      if (error) return res.status(400).send(error.details[0].message);
      const { skyId, mappedNumbers, withIVR, withIVM } = value;

      let amount = 20_000; // primary mapping cost
      for (let i = 1 /* skip index 0 (primary mapping) */; i < mappedNumbers.length; i++) {
        amount += 15_000; // additional mapping cost
      }

      if (withIVR) amount += 20_000; // ivr cost
      if (withIVM) amount += 20_000; // ivm cost

      const user = await User.findById(req.body?._id);
      if (!user) return res.status(401).send({ message: "user not found" });

      amount = amount * 100; // convert from naira to kobo
      const transaction = await Paystack.initializeTransaction(amount.toString(), user.email!, {
        skyId,
        userId: user._id.toString(),
      } satisfies BuyNumberMeta);

      const skyIdRecord = new SkyId({
        skyId,
        mappedNumbers,
        withIVR,
        withIVM,
        userId: user._id,
        status: "pending",
        amount,
        txnRef: transaction.reference,
      });
      await skyIdRecord.save();
      await UserNumber?.updateOne({ number: skyId }, { available: false, usedBy: user._id, platform: "SKYID" });

      return res.status(200).send({ message: "success", data: transaction });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async getUserNumbers(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { error } = validation.checkPhoneNumber(id);
      if (error) return res.status(400).send(error.details[0].message);

      let skyIdNumber = await SkyId?.findOne({ userId: id });
      if (!skyIdNumber) return res.status(403).send({ message: "number does not exist" });

      return res.status(200).send({ message: "success", data: skyIdNumber });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
  static async sendSwitchBuyNumberRequest(req: Request, res: Response) {
    const { id, skyid, mappedNumber, request_type, account_type, status, network_type } = req.body;
    try {
      const { error } = validation.checkPhoneNumber(id);
      if (error) return res.status(400).send(error.details[0].message);

      let skyIdNumber = await SkyId?.findOne({ userId: id });
      if (!skyIdNumber) return res.status(403).send({ message: "number does not exist" });

      return res.status(200).send({ message: "success", data: skyIdNumber });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async replaceBuyNumber(req: Request, res: Response) {
    const { id } = req.params;
    const { current_number, new_number } = req.body;
    try {
      const { error } = validation.checkPhoneNumber(id);
      if (error) return res.status(400).send(error.details[0].message);

      let skyIdNumber = await SkyId?.findOne({ userId: id });
      if (!skyIdNumber) return res.status(403).send({ message: "number does not exist" });

      //check current_number exist

      // console.log(skyIdNumber.mappedNumbers, "mapped");
      // console.log(current_number, "logs");

      if (!skyIdNumber.mappedNumbers.includes(current_number))
        return res.status(403).send({ message: "mapped number does not exist" });

      let number = skyIdNumber.mappedNumbers.map((number) => (number === current_number ? new_number : number)); // find and replace number
      await SkyId.findOneAndUpdate(
        { userId: id },
        {
          $set: { mappedNumbers: number },
        }
      );
      return res.status(200).send({ message: "success", data: skyIdNumber });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async getUserNumbersTransactionHistory(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const { error } = validation.checkPhoneNumber(id);
      if (error) return res.status(400).send(error.details[0].message);

      let skyIdNumber = await SkyId?.findOne({ userId: id });
      if (!skyIdNumber) return res.status(403).send({ message: "number does not exist" });

      return res.status(200).send({ message: "success", data: skyIdNumber });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
}
