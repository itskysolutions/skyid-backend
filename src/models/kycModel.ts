import { model, Schema } from "mongoose";
import { IKYC } from "../types";

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IKYC>({
  user_id: String,
  phone: String,
  address: String,
  state: String,
  nin: String,
  date: { type: Date, default: Date.now },
});

// 3 Create a Model
const Kyc = model("kyc", userSchema);

export default Kyc;
