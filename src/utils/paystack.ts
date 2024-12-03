import axios from "axios";
import dotenv from "dotenv";
import type { PaystackTxnInit, PaystackTxnVerify } from "../types";

dotenv.config();

export class Paystack {
  static secretKey = process.env.PAYSTACK_SECRET_KEY as string;
  private static reqHelper = axios.create({
    baseURL: "https://api.paystack.co",
    headers: { Authorization: `Bearer ${this.secretKey}` },
  });

  static async initializeTransaction(
    amount: string, // amount in kobo
    email: string,
    metadata: Record<string, unknown>,
  ) {
    const res = await this.reqHelper.post<PaystackTxnInit>(
      "/transaction/initialize",
      { amount, email, metadata },
    );
    if (res.status !== 200 || !res.data.status) {
      throw new Error("Failed to initialize transaction");
    }
    return res.data.data;
  }

  static async verifyTransaction<T>(txnRef: string) {
    const res = await this.reqHelper.get<PaystackTxnVerify<T>>(
      `/transaction/verify/${txnRef}`,
    );
    return res.data;
  }
}
