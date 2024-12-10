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

      // Generate a unique 10-digit account number
      let accountNumber;
      let isUnique = false;
      while (!isUnique) {
        accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
        // Check if account number already exists
        const existingWallet = await Wallet.findOne({ accountNumber });
        if (!existingWallet) {
          isUnique = true;
        }
      }

      wallet = new Wallet({ ...req.body, accountNumber });
      await wallet.save();

      return res.status(200).json({ message: "success", data: wallet });
    } catch (error) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  }

  static async getWallet(req: Request, res: Response) {
    try {
      const userId = req.params.userId; // or req.body._id depending on how you want to pass the ID

      // Find the user
      const user = await User.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Find the wallet
      const wallet = await Wallet.findOne({ _id: userId });
      if (!wallet) {
        return res.status(404).json({ message: "Wallet not found for this user" });
      }

      // Return wallet details
      return res.status(200).json({
        message: "success",
        data: {
          accountNumber: wallet.accountNumber,
          balance: wallet.amount,
          userId: wallet._id,
          // Add any other wallet details you want to return
        },
      });
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
