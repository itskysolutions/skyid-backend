import express from "express";
import NumberController from "../controllers/numberController";
import { validateToken } from "../middleware/validateToken";

const NumberRoutes = express.Router();

NumberRoutes.post("/check-number", NumberController.checkNumber);
NumberRoutes.get("/suggest-number", NumberController.suggestNumber);
NumberRoutes.post("/buy-number", validateToken, NumberController.buyNumber);
NumberRoutes.get("/get-user-number/:id", validateToken, NumberController.getUserNumbers);
NumberRoutes.put("/replace-number/:id", validateToken, NumberController.replaceBuyNumber);

export default NumberRoutes;
