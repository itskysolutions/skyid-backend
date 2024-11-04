import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";
import validation from "../utils/validation";
import User from "../models/userModel";
import Otp from "../models/otpModels";
import generate from "../utils/generate";
import Bcrypt from "../utils/bcryptService";

dotenv.config();

export default class SMSController {
  static async sendSms(req: Request, res: Response) {
    const { email, to, gateway, callback_url, customer_reference } = req.body;

    try {
      const { value, error } = validation.forgotPassword({ email });
      if (error) return res.status(400).send(error.details[0].message);

      let user = await User.findOne({ email: value.email });
      if (!user) return res.status(400).send({ message: "User does not exist" });

      // clear any old record
      await Otp.deleteOne({ email: user.email });

      const getOtp = generate.otp();
      await new Otp({
        email,
        otp: Bcrypt.shared().encode(getOtp),
        createdAt: Date.now(),
        expiresAt: Date.now() + 5_00_000,
      }).save();

      // send sms

      // const data = {
      //   from: "AGIS",
      //   to,
      //   body: `Your One-Time Code (OTP) is ${getOtp}. Please, don't disclose this to anyone.`,
      //   api_token: process.env.BULKSMS_API_TOKEN,
      //   gateway: "direct-refund",
      //   callback_url: "https://www.airtimenigeria.com/api/reports/sms",
      //   customer_reference: "HXYSJWKKSLOX",
      // };

      const data = {
        from: "AGIS",
        to,
        body: `Your One-Time Code (OTP) is ${getOtp}. Please, don't disclose this to anyone.`,
        api_token: process.env.BULKSMS_API_TOKEN,
        gateway: gateway,
        // customer_reference: customer_reference,
        // callback_url: callback_url,
      };
      const response = await axios.post("https://www.bulksmsnigeria.com/api/v2/sms", data, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.error) {
        return res.status(400).json({ error: response.data.error.message });
      }

      return res.status(200).json({ message: "Message sent successfully", data: response.data });
    } catch (error) {
      console.error("Error sending SMS:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async checkBalance(req: Request, res: Response) {
    const data = {
      api_token: process.env.BULKSMS_API_TOKEN,
    };

    try {
      const response = await axios.get("https://www.bulksmsnigeria.com/api/v2/balance", {
        params: data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.message === "Unauthenticated.") {
        return res.status(401).json({ message: "Invalid API token" });
      }

      return res.status(200).json({ message: "Balance Inquiry Successful", balance: response.data.balance });
    } catch (error) {
      console.error("Error checking balance:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
