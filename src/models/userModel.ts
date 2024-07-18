import { model, Schema } from "mongoose";
import { IUser } from "../types";

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phoneNumber: String,
  date: { type: Date, default: Date.now },
});

// 3 Create a Model
const User = model("users", userSchema);

export default User;
