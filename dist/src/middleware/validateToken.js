"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const validateToken = async (req, res, next) => {
    // Correctly access the authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader)
        return res.status(401).send({ message: "Access Denied. No token provided" });
    try {
        // Verify the token and attach the user to the request object
        req.user = jsonwebtoken_1.default.verify(authHeader.split(" ")[1], process.env.JWT_PRIVATE_KEY);
        next();
    }
    catch (error) {
        res.status(400).send({ message: "Invalid token." });
    }
};
exports.validateToken = validateToken;
//# sourceMappingURL=validateToken.js.map