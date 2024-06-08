// const mongoose = require("mongoose");
import { model, Schema } from "mongoose";
import { IUser } from "../types";

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  phoneNumber: String,
  address: String,
  nin: String,
  currency: String,
  date: { type: Date, default: Date.now },
});

// 3 Create a Model
const User = model("users", userSchema);

export default User;

// // 4 Create a user
// async function createUser() {
//   const auth = new User({
//     email: "bawasuru@gmail.com",
//     tags: ["node", "backend"],
//     isPublished: true,
//   });

//   try {
//     const result = await auth.save();
//     console.log(result, "save sucesss");
//   } catch (error) {
//     console.log(error, "not working");
//   }
// }

// createUser();
