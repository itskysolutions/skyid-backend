"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../switch-team/controller"));
const SwitchTeamRoute = express_1.default.Router();
SwitchTeamRoute.post("/send-buy-number-request", controller_1.default.sendSwitchBuyNumberRequest);
SwitchTeamRoute.post("/update-buy-number-request", controller_1.default.updateSwitchBuyNumberRequest);
exports.default = SwitchTeamRoute;
//# sourceMappingURL=switchTeamRoutes.js.map