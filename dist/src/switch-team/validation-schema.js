"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validation = {
    checkRequest: (payload) => {
        return joi_1.default.object({
            userId: joi_1.default.string().required(),
            skyId: joi_1.default.string(),
            mappedNumbers: joi_1.default.string(),
            request_type: joi_1.default.string(),
            network_type: joi_1.default.string(),
            account_type: joi_1.default.string(),
        }).validate(payload);
    },
    checkId: (payload) => {
        return joi_1.default.object({
            id: joi_1.default.string().required(),
        }).validate(payload);
    },
};
exports.default = exports.validation;
//# sourceMappingURL=validation-schema.js.map