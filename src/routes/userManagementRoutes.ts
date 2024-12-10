import express from "express";
import { validateToken } from "../middleware/validateToken";
import UserManagementController from "../user-management/controller";

const UserManagementRoute = express.Router();

UserManagementRoute.post("/signup-admin", UserManagementController.signup);
UserManagementRoute.post("/user-admin", UserManagementController.userProfile);

export default UserManagementRoute;
