import express from "express";
import SMSController from "../controllers/smsController";

const SMSRoutes = express.Router();

SMSRoutes.post("/send-sms", SMSController.sendSms);
SMSRoutes.get("/sms-vault", SMSController.checkBalance);

export default SMSRoutes;
