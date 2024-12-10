"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeRoutes_1 = __importDefault(require("./homeRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const numberRoutes_1 = __importDefault(require("./numberRoutes"));
const webhookRouter_1 = __importDefault(require("./webhookRouter"));
const walletRoutes_1 = __importDefault(require("./walletRoutes"));
const switchTeamRoutes_1 = __importDefault(require("./switchTeamRoutes"));
const userManagementRoutes_1 = __importDefault(require("./userManagementRoutes"));
const routers = (0, express_1.Router)();
routers.use("/", homeRoutes_1.default);
routers.use("/api/v1/", userRoutes_1.default);
routers.use("/api/v1/", numberRoutes_1.default);
routers.use("/api/v1/", webhookRouter_1.default);
routers.use("/api/v1/wallet/", walletRoutes_1.default);
routers.use("/api/v1/", switchTeamRoutes_1.default);
routers.use("/api/v1/", userManagementRoutes_1.default);
exports.default = routers;
//# sourceMappingURL=index.js.map