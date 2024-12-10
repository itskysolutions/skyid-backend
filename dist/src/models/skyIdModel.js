"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const skyIdSchema = new mongoose_1.Schema({
    skyId: { type: String, required: true, unique: true },
    mappedNumbers: [String],
    withIVR: Boolean,
    withIVM: Boolean,
    userId: mongoose_1.Types.ObjectId,
    status: {
        type: String,
        required: true,
        enum: ["pending", "active", "inactive"],
    },
    amount: Number,
    txnRef: String,
    renewal: {
        type: Date,
        default: () => {
            const date = new Date();
            date.setFullYear(date.getFullYear() + 1);
            return date;
        },
    },
}, { timestamps: true });
const SkyId = (0, mongoose_1.model)("skyId", skyIdSchema);
exports.default = SkyId;
//# sourceMappingURL=skyIdModel.js.map