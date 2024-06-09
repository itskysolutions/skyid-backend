import mongoose from "mongoose";
import dotenv from "dotenv";

export const database = () => {
  try {
    dotenv.config();
    mongoose.connect(process.env.MONGOOSE_URL_PLAY as never);
    console.log("MongoDB is connected");
  } catch (error) {
    console.log(error);
  }
};
