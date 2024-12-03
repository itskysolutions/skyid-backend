import { Router } from "express";
import homeRoutes from "./homeRoutes";
import UserRoutes from "./userRoutes";
import NumberRoutes from "./numberRoutes";
import WebhookRoutes from "./webhookRouter";

const routers = Router();

routers.use("/", homeRoutes);
routers.use("/api/v1/", UserRoutes);
routers.use("/api/v1/", NumberRoutes);
routers.use("/api/v1/", WebhookRoutes);

export default routers;
