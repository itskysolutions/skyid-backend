"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const database = () => {
    try {
        dotenv_1.default.config();
        mongoose_1.default.connect(process.env.MONGOOSE_URL);
        console.log("MongoDB is connected");
    }
    catch (error) {
        console.log(error);
    }
};
exports.database = database;
