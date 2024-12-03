import express from "express";
import NumberController from "../controllers/numberController";
import { validateToken } from "../middleware/validateToken";

const NumberRoutes = express.Router();

NumberRoutes.post("/check-number", NumberController.checkNumber);
NumberRoutes.get("/suggest-number", NumberController.suggestNumber);
// NumberRoutes.post("/guessed-number", NumberController.guessedNumbers);
NumberRoutes.post("/buy-number", validateToken, NumberController.buyNumber);

export default NumberRoutes;
