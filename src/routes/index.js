"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeRoutes_1 = __importDefault(require("./homeRoutes"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const routers = (0, express_1.Router)();
routers.use("/", homeRoutes_1.default);
routers.use("/api", userRoutes_1.default);
exports.default = routers;
