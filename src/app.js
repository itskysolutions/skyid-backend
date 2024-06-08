"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const homeRoutes_1 = __importDefault(require("./routes/homeRoutes"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// * Middleware
app.use(express_1.default.json());
// * Routes
app.use(homeRoutes_1.default);
app.use(routes_1.default);
app.listen(port, () => {
    console.log(`server is running at ${port}!`);
});
(0, db_1.database)();
