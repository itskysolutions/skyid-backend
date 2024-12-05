import { model, Schema } from "mongoose";
import { IWallet } from "../types";

// 2. Create a Schema corresponding to the document interface.
const walletSchema = new Schema<IWallet>({
  accountNumber: String,
  amount: String,
  status: String,
  date: { type: Date, default: Date.now },
});

// 3 Create a Model
const Wallet = model("wallet", walletSchema);

export default Wallet;
