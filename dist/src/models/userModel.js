"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uuid_1 = require("uuid");
// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        unique: true, // Ensuring it's unique
        default: uuid_1.v4, // Automatically generate a unique user_id using uuid
    },
    firstName: String,
    lastName: String,
    country: String,
    email: String,
    businessName: String,
    businessType: String,
    agentCode: String,
    password: String,
    phoneNumber: String,
    accountType: String,
    verified: String,
    date: { type: Date, default: Date.now },
});
// 3 Create a Model
const User = (0, mongoose_1.model)("users", userSchema);
exports.default = User;
//# sourceMappingURL=userModel.js.map