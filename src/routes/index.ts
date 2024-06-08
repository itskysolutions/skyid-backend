import { Router } from "express";
import homeRoutes from "./homeRoutes";
import UserRoutes from "./userRoutes";

const routers = Router();

routers.use("/", homeRoutes);
routers.use("/api", UserRoutes);

export default routers;
