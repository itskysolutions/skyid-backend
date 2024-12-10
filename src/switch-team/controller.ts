import { Response, Request } from "express";
import dotenv from "dotenv";
import validation from "./validation-schema";
import BuyNumberRequest from "./model";
import UserNumber from "../models/numbersModel";
import SkyId from "../models/skyIdModel";

dotenv.config();

export default class SwitchTeamController {
  static async sendSwitchBuyNumberRequest(req: Request, res: Response) {
    const { userId, skyId, mappedNumber, request_type, account_type, status, network_type } = req.body;
    try {
      // const { error } = validation.checkRequest(userId);
      // if (error) return res.status(400).send(error.details[0].message);

      let skyIdNumber = await UserNumber?.findOne({ userId: userId });
      if (!skyIdNumber) return res.status(403).send({ message: "number does not exist" });

      console.log(skyId, mappedNumber, account_type, status, network_type, "checking");
      // let sendRequest = new BuyNumberRequest({
      //   ...req.body,
      //   request_type: "pending",
      // });

      // await sendRequest.save();
      return res.status(200).send({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
  static async updateSwitchBuyNumberRequest(req: Request, res: Response) {
    const { userId } = req.body;
    try {
      // const { error } = validation.checkId(userId);
      // if (error) return res.status(400).send(error.details[0].message);

      let skyIdNumber = await SkyId?.findOne({ userId });
      if (!skyIdNumber) return res.status(403).send({ message: "number does not exist" });
      console.log(userId, "update");

      await SkyId.updateOne({ userId }, { status: "completed" });

      return res.status(200).send({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  // TODO: add vat to amount
}
