"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const otpSchema = new mongoose_1.Schema({
    email: String,
    otp: String,
    password: String,
    createdAt: Date,
    expiresAt: Date,
});
const Otp = (0, mongoose_1.model)("otps", otpSchema);
exports.default = Otp;
//# sourceMappingURL=otpModels.js.map