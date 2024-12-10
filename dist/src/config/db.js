"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KiraniDatabase = exports.database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const database = () => {
    try {
        mongoose_1.default.connect(process.env.MONGOOSE_URL);
        console.log("MongoDB is connected");
    }
    catch (error) {
        console.log(error, "error");
    }
};
exports.database = database;
const KiraniDatabase = () => {
    try {
        const connection = mongoose_1.default.createConnection(process.env.KIRANI_MONGOOSE_URL);
        console.log("Kirani Database is connected");
        return connection;
    }
    catch (error) {
        console.log(error, "error");
    }
};
exports.KiraniDatabase = KiraniDatabase;
//# sourceMappingURL=db.js.map