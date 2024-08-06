import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const database = () => {
  try {
    mongoose.connect(process.env.MONGOOSE_URL as never);
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
