import { Router } from "express";
import homeRoutes from "./homeRoutes";
import UserRoutes from "./userRoutes";

const routers = Router();

routers.use("/", homeRoutes);
routers.use("/api/v1/", UserRoutes);

export default routers;
