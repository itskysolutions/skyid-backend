import express from "express";
import NumberController from "../controllers/numberController";

const NumberRoutes = express.Router();

NumberRoutes.post("/check-number", NumberController.checkNumber);
NumberRoutes.post("/guessed-number", NumberController.checkNumber);

export default NumberRoutes;
