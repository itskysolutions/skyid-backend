import { model, Schema } from "mongoose";
import { IUser } from "../types";
import { v4 as uuidv4 } from "uuid";

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  user_id: {
    type: String,
    unique: true, // Ensuring it's unique
    default: uuidv4, // Automatically generate a unique user_id using uuid
  },
  firstName: String,
  lastName: String,
  country: String,
  email: String,
  businessName: String,
  businessType: String,
  agentCode: String,
  password: String,
  phoneNumber: String,
  accountType: String,
  verified: String,
  date: { type: Date, default: Date.now },
});

// 3 Create a Model
const User = model("users", userSchema);

export default User;
