"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validation = {
    signup: (signup) => {
        return joi_1.default.object({
            firstName: joi_1.default.string()
                .pattern(/^[a-zA-Z]+$/, "alphabet characters")
                .min(2)
                .max(30)
                .required()
                .messages({
                "string.pattern.name": "First name must only contain alphabet characters",
                "string.min": "First name must be at least 2 characters long",
                "string.max": "First name must be less than or equal to 30 characters long",
                "any.required": "First name is required",
            }),
            lastName: joi_1.default.string()
                .pattern(/^[a-zA-Z]+$/, "alphabet characters")
                .min(2)
                .max(30)
                .required()
                .messages({
                "string.pattern.name": "Last name must only contain alphabet characters",
                "string.min": "Last name must be at least 2 characters long",
                "string.max": "Last name must be less than or equal to 30 characters long",
                "any.required": "Last name is required",
            }),
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(5).required(),
            phoneNumber: joi_1.default.string()
                .pattern(/^(\+?234|0)[789][01]\d{8}$/, "Nigeria phone number")
                .required()
                .messages({
                "string.pattern.name": "Phone number must be a valid Nigerian phone number",
                "string.base": "Phone number must be a string",
                "string.empty": "Phone number is required",
                "any.required": "Phone number is required",
            }),
            accountType: joi_1.default.string().messages({
                "any.required": "Business type is required",
            }),
        }).validate(signup);
    },
};
exports.default = exports.validation;
//# sourceMappingURL=validation-schema.js.map