"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import validation from "../utils/validation";
const userModel_1 = __importDefault(require("../models/userModel"));
const dotenv_1 = __importDefault(require("dotenv"));
const depositModel_1 = __importDefault(require("../models/depositModel"));
const sendMail_1 = require("../utils/sendMail");
const registration_1 = require("../views/registration");
const walletModel_1 = __importDefault(require("../models/walletModel"));
dotenv_1.default.config();
class WalletController {
    static async wallet(req, res) {
        try {
            // const { error } = validation.kyc({ ...req.body });
            // if (error) return res.status(400).send(error.details[0].message);
            let user = await userModel_1.default.findOne({ _id: req.body._id });
            if (!user)
                return res.status(400).send({ message: "User does not exist." });
            let wallet = await walletModel_1.default.findOne({ _id: req.body._id });
            if (wallet)
                return res.status(400).send({ message: "The same account can not have multiple wallet" });
            // Generate a unique 10-digit account number
            let accountNumber;
            let isUnique = false;
            while (!isUnique) {
                accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();
                // Check if account number already exists
                const existingWallet = await walletModel_1.default.findOne({ accountNumber });
                if (!existingWallet) {
                    isUnique = true;
                }
            }
            wallet = new walletModel_1.default({ ...req.body, accountNumber });
            await wallet.save();
            return res.status(200).json({ message: "success", data: wallet });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
    static async getWallet(req, res) {
        try {
            const userId = req.params.userId; // or req.body._id depending on how you want to pass the ID
            // Find the user
            const user = await userModel_1.default.findOne({ _id: userId });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            // Find the wallet
            const wallet = await walletModel_1.default.findOne({ _id: userId });
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
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
    static async deposit(req, res) {
        try {
            // const { error } = validation.kyc({ ...req.body });
            // if (error) return res.status(400).send(error.details[0].message);
            let user = await userModel_1.default.findOne({ _id: req.body._id });
            if (!user)
                return res.status(400).send({ message: "User does not exist." });
            let wallet = await walletModel_1.default.findOne({ _id: req.body._id });
            if (!wallet)
                return res.status(400).send({ message: "This account does not have a wallet" });
            await walletModel_1.default.updateOne({ _id: req.body._id }, { amount: `${Number(wallet.amount) + Number(req.body.amount)}` });
            let depositData = { ...req.body, amount: req.body.amount }; // Increment amount
            delete depositData._id;
            let deposit = new depositModel_1.default(depositData);
            await deposit.save();
            (0, sendMail_1.sendMail)({
                to: user?.email,
                from: "Skyid",
                name: user?.firstName,
                subject: "Deposit Successful!",
                html: (0, registration_1.depositMoneyTemplate)(user?.firstName, req.body.amount),
                text: "",
            });
            return res.status(200).json({ message: "success" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
}
exports.default = WalletController;
//# sourceMappingURL=walletController.js.map