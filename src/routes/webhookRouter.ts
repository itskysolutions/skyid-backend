import express from "express";
import WebhookController from "../controllers/webhookController";

const WebhookRoutes = express.Router();

WebhookRoutes.post("/webhook/paystack", WebhookController.paystackWebhook);

export default WebhookRoutes;

