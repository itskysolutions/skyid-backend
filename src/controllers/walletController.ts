import { Response, Request } from "express";
// import validation from "../utils/validation";
import User from "../models/userModel";
import dotenv from "dotenv";
import Deposit from "../models/depositModel";
import { sendMail } from "../utils/sendMail";
import { depositMoneyTemplate } from "../views/registration";
import Wallet from "../models/walletModel";

dotenv.config();

export default class WalletController {
  static async wallet(req: Request, res: Response) {
    try {
      // const { error } = validation.kyc({ ...req.body });
      // if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ _id: req.body._id });
      if (!user) return res.status(400).send({ message: "User does not exist." });

      let wallet = await Wallet.findOne({ _id: req.body._id });
      if (wallet) return res.status(400).send({ message: "The same account can not have multiple wallet" });

      wallet = new Wallet({ ...req.body });
      await wallet.save();

      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async deposit(req: Request, res: Response) {
    try {
      // const { error } = validation.kyc({ ...req.body });
      // if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ _id: req.body._id });
      if (!user) return res.status(400).send({ message: "User does not exist." });

      let wallet = await Wallet.findOne({ _id: req.body._id });
      if (!wallet) return res.status(400).send({ message: "This account does not have a wallet" });

      await Wallet.updateOne({ _id: req.body._id }, { amount: `${Number(wallet.amount) + Number(req.body.amount)}` });

      let depositData = { ...req.body, amount: req.body.amount }; // Increment amount
      delete depositData._id;
      let deposit = new Deposit(depositData);
      await deposit.save();

      sendMail({
        to: user?.email as never,
        from: "Skyid",
        name: user?.firstName as never,
        subject: "Deposit Successful!",
        html: depositMoneyTemplate(user?.firstName as never, req.body.amount),
        text: "",
      });
      return res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }
}
