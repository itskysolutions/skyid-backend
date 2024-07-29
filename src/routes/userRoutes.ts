import express from "express";
import UserController from "../controllers/userController";
import { validateToken } from "../middleware/validateToken";

const UserRoutes = express.Router();

UserRoutes.post("/check-email", UserController.checkEmail);
UserRoutes.post("/check-phone", UserController.checkPhoneNumber);
UserRoutes.post("/signup", UserController.signup);
UserRoutes.post("/signin", UserController.signin);
UserRoutes.post("/send-otp", UserController.verifyUserEmail);
UserRoutes.post("/verify-otp", UserController.confirmUserEmail);
UserRoutes.get("/user-profile", validateToken, UserController.userProfile);
UserRoutes.post("/forgot-password", UserController.forgotPassword);
UserRoutes.post("/reset-password", UserController.resetPassword);

export default UserRoutes;
