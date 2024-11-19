import { model, Schema } from "mongoose";
import { IPhoneNumber } from "../types";

// 2. Create a Schema corresponding to the document interface.
const numberSchema = new Schema<IPhoneNumber>({
  number: String,
  accountId: String,
  amount: Number,
  available: String,
  billingPass: String,
  agentOwner: String,
  usedBy: String,
});

// 3 Create a Model
const UserNumber = model("phoneNumbers", numberSchema);

export default UserNumber;
