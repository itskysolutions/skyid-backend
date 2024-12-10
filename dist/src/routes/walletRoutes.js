"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const walletController_1 = __importDefault(require("../controllers/walletController"));
const WalletRoutes = express_1.default.Router();
WalletRoutes.post("/create", walletController_1.default.wallet);
WalletRoutes.get("/:userId", walletController_1.default.getWallet);
WalletRoutes.post("/deposit", walletController_1.default.deposit);
exports.default = WalletRoutes;
//# sourceMappingURL=walletRoutes.js.map