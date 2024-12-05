import { Router } from "express";
import homeRoutes from "./homeRoutes";
import UserRoutes from "./userRoutes";
import NumberRoutes from "./numberRoutes";
import WebhookRoutes from "./webhookRouter";
import WalletRoutes from "./walletRoutes";

const routers = Router();

routers.use("/", homeRoutes);
routers.use("/api/v1/", UserRoutes);
routers.use("/api/v1/", NumberRoutes);
routers.use("/api/v1/", WebhookRoutes);
routers.use("/api/v1/", WalletRoutes);

export default routers;
