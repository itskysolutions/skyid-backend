"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const validateToken_1 = require("../middleware/validateToken");
const UserRoutes = express_1.default.Router();
UserRoutes.post("/check-email", userController_1.default.checkEmail);
UserRoutes.post("/check-phone", userController_1.default.checkPhoneNumber);
UserRoutes.post("/signup", userController_1.default.signup);
UserRoutes.post("/signin", userController_1.default.signin);
UserRoutes.get("/user-profile", validateToken_1.validateToken, userController_1.default.userProfile);
// UserRoutes.post("/forgot-password", UserController.forgotPassword);
// UserRoutes.post("/reset-password", UserController.resetPassword);
exports.default = UserRoutes;
