"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
const paystack_1 = require("../utils/paystack");
const skyIdModel_1 = __importDefault(require("../models/skyIdModel"));
class WebhookController {
    static async paystackWebhook(req, res) {
        //validate event
        const hash = crypto_1.default.createHmac("sha512", paystack_1.Paystack.secretKey).update(JSON.stringify(req.body)).digest("hex");
        res.send(200);
        if (hash !== req.headers["x-paystack-signature"]) {
            console.log("Invalid signature");
            return;
        }
        // handle event
        if (req.body.event === "charge.success") {
            // update skyid status
            const { status, data } = await paystack_1.Paystack.verifyTransaction(req.body.data.reference);
            if (!status) {
                console.log("Failed to verify transaction");
                return;
            }
            await skyIdModel_1.default.updateOne({ skyId: data.metadata.skyId }, { status: "active" });
        }
        else {
            console.log("Received paystack webhook event: ", req.body.event);
        }
    }
}
exports.default = WebhookController;
//# sourceMappingURL=webhookController.js.map