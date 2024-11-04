import { Router } from "express";
import homeRoutes from "./homeRoutes";
import UserRoutes from "./userRoutes";
import SMSRoutes from "./smsRoutes";

const routers = Router();

routers.use("/", homeRoutes);
routers.use("/api/v1/", UserRoutes);
routers.use("/api/v1/", SMSRoutes);

export default routers;
