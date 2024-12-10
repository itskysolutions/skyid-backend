"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paystack = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class Paystack {
    static secretKey = process.env.PAYSTACK_SECRET_KEY;
    static reqHelper = axios_1.default.create({
        baseURL: "https://api.paystack.co",
        headers: { Authorization: `Bearer ${this.secretKey}` },
    });
    static async initializeTransaction(amount, // amount in kobo
    email, metadata) {
        const res = await this.reqHelper.post("/transaction/initialize", { amount, email, metadata });
        if (res.status !== 200 || !res.data.status) {
            throw new Error("Failed to initialize transaction");
        }
        return res.data.data;
    }
    static async verifyTransaction(txnRef) {
        const res = await this.reqHelper.get(`/transaction/verify/${txnRef}`);
        return res.data;
    }
}
exports.Paystack = Paystack;
//# sourceMappingURL=paystack.js.map