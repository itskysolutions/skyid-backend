import type { Response, Request } from "express";
import crypto from "crypto";
import { Paystack } from "../utils/paystack";
import { BuyNumberMeta } from "../types";
import SkyId from "../models/skyIdModel";

export default class WebhookController {
  static async paystackWebhook(req: Request, res: Response) {
    //validate event
    const hash = crypto
      .createHmac("sha512", Paystack.secretKey)
      .update(JSON.stringify(req.body))
      .digest("hex");

    res.send(200);

    if (hash !== req.headers["x-paystack-signature"]) {
      console.log("Invalid signature");
      return;
    }

    // handle event
    if (req.body.event === "charge.success") {
      // update skyid status
      const { status, data } = await Paystack.verifyTransaction<BuyNumberMeta>(
        req.body.data.reference,
      );
      if (!status) {
        console.log("Failed to verify transaction");
        return;
      }

      await SkyId.updateOne(
        { skyId: data.metadata.skyId },
        { status: "active" },
      );
    } else {
      console.log("Received paystack webhook event: ", req.body.event);
    }
  }
}
