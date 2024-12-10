"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const depositSchema = new mongoose_1.Schema({
    refId: String,
    // accountNumber: String,
    type: String,
    amount: String,
    status: String,
    date: { type: Date, default: Date.now },
});
// 3 Create a Model
const Deposit = (0, mongoose_1.model)("deposit", depositSchema);
exports.default = Deposit;
//# sourceMappingURL=depositModel.js.map