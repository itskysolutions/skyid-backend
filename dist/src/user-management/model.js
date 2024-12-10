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
    accountType: String,
    verified: String,
    date: { type: Date, default: Date.now },
});
// 3 Create a Model
const AdminUser = (0, mongoose_1.model)("admin", userSchema);
exports.default = AdminUser;
//# sourceMappingURL=model.js.map