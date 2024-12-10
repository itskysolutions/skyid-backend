import { model, Schema } from "mongoose";
import { IBuyNumberRequest } from "./type";

// 2. Create a Schema corresponding to the document interface.
const SwitchTeamBuyNumberRequest = new Schema<IBuyNumberRequest>({
  userId: String,
  skyId: String,
  mappedNumbers: String,
  request_type: String,
  account_type: String,
  network_type: Number,
  // status: String,
});

// 3 Create a Model
const BuyNumberRequest = model("buyNumberRequest", SwitchTeamBuyNumberRequest);

export default BuyNumberRequest;
