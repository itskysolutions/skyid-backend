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
    checkPhoneNumber: (phoneNumber) => {
        return joi_1.default.string()
            .pattern(/^\d+$/)
            .messages({
            "string.pattern.base": "Phone number must contain only digits.",
            "string.empty": "Phone number is required.",
        })
            .validate(phoneNumber);
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
            // phoneNumber: Joi.string()
            //   .pattern(/^\+?[1-9]\d{1,14}$/, "phone number")
            //   .required()
            //   .messages({
            //     "string.pattern.name": "Phone number must be a valid international phone number",
            //     "string.base": "Phone number must be a string",
            //     "string.empty": "Phone number is required",
            //     "any.required": "Phone number is required",
            //   }),
            phoneNumber: joi_1.default.string()
                .pattern(/^(\+?234|0)[789][01]\d{8}$/, "Nigeria phone number")
                .required()
                .messages({
                "string.pattern.name": "Phone number must be a valid Nigerian phone number",
                "string.base": "Phone number must be a string",
                "string.empty": "Phone number is required",
                "any.required": "Phone number is required",
            }),
            address: joi_1.default.object({
                street: joi_1.default.string().min(5).max(100).required().messages({
                    "string.base": "Street must be a string",
                    "string.empty": "Street is required",
                    "string.min": "Street must be at least 5 characters long",
                    "string.max": "Street must be less than or equal to 100 characters long",
                    "any.required": "Street is required",
                }),
                state: joi_1.default.string().min(2).max(50).required().messages({
                    "string.base": "State must be a string",
                    "string.empty": "State is required",
                    "string.min": "State must be at least 2 characters long",
                    "string.max": "State must be less than or equal to 50 characters long",
                    "any.required": "State is required",
                }),
                country: joi_1.default.string().min(2).max(50).required().messages({
                    "string.base": "Country must be a string",
                    "string.empty": "Country is required",
                    "string.min": "Country must be at least 2 characters long",
                    "string.max": "Country must be less than or equal to 50 characters long",
                    "any.required": "Country is required",
                }),
            })
                .required()
                .messages({
                "object.base": "Address must be an object",
                "any.required": "Address is required",
            }),
            nin: joi_1.default.string().min(11).max(11).required(),
            currency: joi_1.default.string()
                .pattern(/^[A-Z]{3}$/, "currency code")
                .required()
                .messages({
                "string.pattern.name": "Currency must be a valid ISO 4217 currency code (3 uppercase letters)",
                "string.base": "Currency must be a string",
                "string.empty": "Currency is required",
                "any.required": "Currency is required",
            }),
        }).validate(signup);
    },
    forgotPassword: (forgotPassword) => {
        return joi_1.default.object({
            email: joi_1.default.string().email().required(),
        }).validate(forgotPassword);
    },
};
exports.default = exports.validation;
