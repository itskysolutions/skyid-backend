"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = __importDefault(require("../user-management/controller"));
const UserManagementRoute = express_1.default.Router();
UserManagementRoute.post("/signup-admin", controller_1.default.signup);
UserManagementRoute.post("/user-admin", controller_1.default.userProfile);
exports.default = UserManagementRoute;
//# sourceMappingURL=userManagementRoutes.js.map