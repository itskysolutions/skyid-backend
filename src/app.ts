import express, { Application } from "express";
import dotenv from "dotenv";
import { database } from "./config/db";
import homeRoute from "./routes/homeRoutes";
import routers from "./routes";
import cors from "cors";

dotenv.config();

const app: Application = express();
const port: number = (process.env.PORT as never) || 8000;

// * Middleware
app.use(express.json());
app.use(cors());

// * Routes
app.use(homeRoute);
app.use(routers);

app.listen(port, () => {
  console.log(`server is running at ${port}!`);
});

database();
