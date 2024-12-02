import express from "express";
import NumberController from "../controllers/numberController";

const NumberRoutes = express.Router();

NumberRoutes.post("/check-number", NumberController.checkNumber);
// NumberRoutes.post("/guessed-number", NumberController.guessedNumbers);
// NumberRoutes.post("/buy-number", NumberController.buyNumber);

export default NumberRoutes;
