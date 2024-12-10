"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose_1.Schema({
    user_id: String,
    phone: String,
    address: String,
    state: String,
    nin: String,
    date: { type: Date, default: Date.now },
});
// 3 Create a Model
const Kyc = (0, mongoose_1.model)("kyc", userSchema);
exports.default = Kyc;
//# sourceMappingURL=kycModel.js.map