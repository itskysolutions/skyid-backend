import express, { Application } from "express";
import dotenv from "dotenv";
import { database } from "./config/db";
import homeRoute from "./routes/homeRoutes";
import routers from "./routes";

dotenv.config();

const app: Application = express();
const port: number = (process.env.PORT as never) || 9001;

// * Middleware
app.use(express.json());

// * Routes
app.use(homeRoute);
app.use(routers);

app.listen(port, () => {
  console.log(`server is running at ${port}!`);
});

database();
