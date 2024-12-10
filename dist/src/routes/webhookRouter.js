"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const webhookController_1 = __importDefault(require("../controllers/webhookController"));
const WebhookRoutes = express_1.default.Router();
WebhookRoutes.post("/webhook/paystack", webhookController_1.default.paystackWebhook);
exports.default = WebhookRoutes;
//# sourceMappingURL=webhookRouter.js.map