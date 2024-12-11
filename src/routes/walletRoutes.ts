import express from "express";
import WalletController from "../controllers/walletController";

const WalletRoutes = express.Router();

WalletRoutes.post("/create", WalletController.wallet);
WalletRoutes.get("/:userId", WalletController.getWallet);
WalletRoutes.get("/history/:userId", WalletController.getWalletHistory);
WalletRoutes.post("/deposit", WalletController.deposit);

export default WalletRoutes;
