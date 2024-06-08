"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose_1.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    phoneNumber: String,
    address: {
        street: String,
        state: String,
        country: String,
    },
    nin: String,
    currency: String,
    date: { type: Date, default: Date.now },
});
// 3 Create a Model
const User = (0, mongoose_1.model)("users", userSchema);
exports.default = User;
