"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const walletSchema = new mongoose_1.Schema({
    accountNumber: String,
    amount: String,
    status: String,
    date: { type: Date, default: Date.now },
});
// 3 Create a Model
const Wallet = (0, mongoose_1.model)("wallet", walletSchema);
exports.default = Wallet;
//# sourceMappingURL=walletModel.js.map