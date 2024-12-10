"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const validateToken_1 = require("../middleware/validateToken");
const UserRoutes = express_1.default.Router();
UserRoutes.post("/signin", userController_1.default.signin);
UserRoutes.post("/send-otp", userController_1.default.verifyUserEmail);
UserRoutes.post("/verify-otp", userController_1.default.confirmUserEmail);
UserRoutes.post("/check-email", userController_1.default.checkEmail);
UserRoutes.post("/verify-email", userController_1.default.verifyNewUser);
UserRoutes.post("/signup", userController_1.default.signup);
UserRoutes.get("/user-profile", validateToken_1.validateToken, userController_1.default.userProfile);
// UserRoutes.get("/check-number", UserController.getUsersByEmail);
UserRoutes.post("/forgot-password", userController_1.default.forgotPassword);
UserRoutes.post("/reset-password", userController_1.default.resetPassword);
UserRoutes.post("/kyc", userController_1.default.kyc);
exports.default = UserRoutes;
//# sourceMappingURL=userRoutes.js.map