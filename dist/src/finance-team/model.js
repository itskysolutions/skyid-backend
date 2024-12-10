"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const SwitchTeamBuyNumberRequest = new mongoose_1.Schema({
    userId: String,
    skyId: String,
    mappedNumbers: String,
    request_type: String,
    account_type: String,
    network_type: Number,
    // status: String,
});
// 3 Create a Model
const BuyNumberRequest = (0, mongoose_1.model)("buyNumberRequest", SwitchTeamBuyNumberRequest);
exports.default = BuyNumberRequest;
//# sourceMappingURL=model.js.map