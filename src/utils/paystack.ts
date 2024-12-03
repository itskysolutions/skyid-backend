import axios from "axios";
import type { PaystackTxnInit } from "../types";

export class Paystack {
  private static reqHelper = axios.create({ baseURL: "https://api.paystack.co" });

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
}
