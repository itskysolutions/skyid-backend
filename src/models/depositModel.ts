import { model, Schema } from "mongoose";
import { IDeposit } from "../types";

// 2. Create a Schema corresponding to the document interface.
const depositSchema = new Schema<IDeposit>({
  refId: String,
  accountNumber: String,
  type: String,
  amount: String,
  status: String,
  date: { type: Date, default: Date.now },
});

// 3 Create a Model
const Deposit = model("deposit", depositSchema);

export default Deposit;
