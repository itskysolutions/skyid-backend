"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validation = {
    checkEmail: (email) => {
        return joi_1.default.string().email().validate(email);
    },
    checkId: (_id) => {
        return (joi_1.default.string()
            // .pattern(/^\d+$/)
            .messages({
            "string.pattern.base": "_id is required.",
            "string.empty": "_id is required.",
        })
            .validate(_id));
    },
    checkPhoneNumber: (number) => {
        return (joi_1.default.string()
            // .pattern(/^\d+$/)
            .messages({
            "string.pattern.base": "Phone number must contain only digits.",
            "string.empty": "Phone number is required.",
        })
            .validate(number));
    },
    buyNumber: (payload) => {
        return joi_1.default.object({
            skyId: joi_1.default.string()
                // .pattern(/^(\+?234|0)[789][01]\d{8}$/, "Nigeria phone number")
                .required()
                .messages({
                "string.pattern.name": "Phone number must be a valid Nigerian phone number",
                "string.base": "Phone number must be a string",
                "string.empty": "Phone number is required",
                "any.required": "Phone number is required",
            }),
            mappedNumbers: joi_1.default.array().items(joi_1.default.string()).min(1).required(),
            withIVR: joi_1.default.boolean().required(),
            withIVM: joi_1.default.boolean().required(),
            _id: joi_1.default.string().required(),
        }).validate(payload);
    },
    signIn: (signin) => {
        return joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(8).required(),
        }).validate(signin);
    },
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
            country: joi_1.default.string()
                .messages({
                "any.required": "Country is required",
            })
                .required(),
            businessName: joi_1.default.string().messages({
                "any.required": "Business name is required",
            }),
            businessType: joi_1.default.string().messages({
                "any.required": "Business type is required",
            }),
            accountType: joi_1.default.string().messages({
                "any.required": "Business type is required",
            }),
            agentCode: joi_1.default.string().messages({
                "any.required": "Agent code is required",
            }),
        }).validate(signup);
    },
    kyc: (kyc) => {
        return joi_1.default.object({
            // user_id: Joi.string().required(),
            phone: joi_1.default.string()
                .pattern(/^(\+?234|0)[789][01]\d{8}$/, "Nigeria phone number")
                .required()
                .messages({
                "string.pattern.name": "Phone number must be a valid Nigerian phone number",
                "string.base": "Phone number must be a string",
                "string.empty": "Phone number is required",
                "any.required": "Phone number is required",
            }),
            address: joi_1.default.string().required(),
            state: joi_1.default.string().required(),
            nin: joi_1.default.string().min(11).required(),
        }).validate(kyc);
    },
    forgotPassword: (forgotPassword) => {
        return joi_1.default.object({
            email: joi_1.default.string().email().required(),
        }).validate(forgotPassword);
    },
    confirmEmail: (payload) => {
        return joi_1.default.object({
            email: joi_1.default.string().email().required(),
            otp: joi_1.default.string().min(6).required(),
        }).validate(payload);
    },
    resetPassword: (payload) => {
        return joi_1.default.object({
            email: joi_1.default.string().email().required(),
            password: joi_1.default.string().min(8).required(),
            otp: joi_1.default.string().min(6).required(),
        }).validate(payload);
    },
};
exports.default = exports.validation;
//# sourceMappingURL=validation.js.map