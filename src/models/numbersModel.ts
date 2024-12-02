import { model, Schema } from "mongoose";

import { KiraniDatabase } from "../config/db";

import { IPhoneNumber } from "../types";

const connection = KiraniDatabase();

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
const UserNumber = connection?.model("phoneNumbers", numberSchema);

export default UserNumber;

// const getKirani = async () => {
//   try {
//   } catch (error) {}
// };
