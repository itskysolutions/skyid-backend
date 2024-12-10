"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const numberController_1 = __importDefault(require("../controllers/numberController"));
const validateToken_1 = require("../middleware/validateToken");
const NumberRoutes = express_1.default.Router();
NumberRoutes.post("/check-number", numberController_1.default.checkNumber);
NumberRoutes.get("/suggest-number", numberController_1.default.suggestNumber);
NumberRoutes.post("/buy-number", validateToken_1.validateToken, numberController_1.default.buyNumber);
NumberRoutes.get("/get-user-number/:id", validateToken_1.validateToken, numberController_1.default.getUserNumbers);
NumberRoutes.put("/replace-number/:id", validateToken_1.validateToken, numberController_1.default.replaceBuyNumber);
exports.default = NumberRoutes;
//# sourceMappingURL=numberRoutes.js.map