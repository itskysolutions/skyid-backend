import express from "express";
import { validateToken } from "../middleware/validateToken";
import SwitchTeamController from "../switch-team/controller";

const SwitchTeamRoute = express.Router();

SwitchTeamRoute.post("/send-buy-number-request", SwitchTeamController.sendSwitchBuyNumberRequest);
SwitchTeamRoute.post("/update-buy-number-request", SwitchTeamController.updateSwitchBuyNumberRequest);

export default SwitchTeamRoute;
