"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const db_1 = require("../config/db");
const connection = (0, db_1.KiraniDatabase)();
// 2. Create a Schema corresponding to the document interface.
const numberSchema = new mongoose_1.Schema({
    number: String,
    accountId: String,
    amount: Number,
    available: String,
    billingPass: String,
    agentOwner: String,
    usedBy: String,
    platform: String,
});
// 3 Create a Model
const UserNumber = connection?.model("phoneNumbers", numberSchema);
exports.default = UserNumber;
// const getKirani = async () => {
//   try {
//   } catch (error) {}
// };
//# sourceMappingURL=numbersModel.js.map