import express from "express";
import WalletController from "../controllers/walletController";

const WalletRoutes = express.Router();

WalletRoutes.post("/deposit", WalletController.deposit);
WalletRoutes.post("/create-wallet", WalletController.wallet);

export default WalletRoutes;
