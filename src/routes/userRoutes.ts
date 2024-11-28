import express from "express";
import UserController from "../controllers/userController";
import { validateToken } from "../middleware/validateToken";

const UserRoutes = express.Router();

UserRoutes.post("/signin", UserController.signin);
UserRoutes.post("/send-otp", UserController.verifyUserEmail);
UserRoutes.post("/verify-otp", UserController.confirmUserEmail);

UserRoutes.post("/check-email", UserController.checkEmail);
UserRoutes.post("/verify-email", UserController.verifyNewUser);
UserRoutes.post("/signup", UserController.signup);
UserRoutes.get("/user-profile", validateToken, UserController.userProfile);

// UserRoutes.get("/check-number", UserController.getUsersByEmail);
UserRoutes.post("/forgot-password", UserController.forgotPassword);
UserRoutes.post("/reset-password", UserController.resetPassword);

UserRoutes.post("/kyc", UserController.kyc);

export default UserRoutes;
