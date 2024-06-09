import Joi from "joi";
import { IOtp, IUser } from "../types";

export const validation = {
  checkEmail: (email: string) => {
    return Joi.string().email().validate(email);
  },

  checkPhoneNumber: (phoneNumber: string) => {
    return Joi.string()
      .pattern(/^\d+$/)
      .messages({
        "string.pattern.base": "Phone number must contain only digits.",
        "string.empty": "Phone number is required.",
      })
      .validate(phoneNumber);
  },

  signIn: (signin: IUser) => {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }).validate(signin);
  },

  signup: (signup: IUser) => {
    return Joi.object({
      firstName: Joi.string()
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
      lastName: Joi.string()
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
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
      // phoneNumber: Joi.string()
      //   .pattern(/^\+?[1-9]\d{1,14}$/, "phone number")
      //   .required()
      //   .messages({
      //     "string.pattern.name": "Phone number must be a valid international phone number",
      //     "string.base": "Phone number must be a string",
      //     "string.empty": "Phone number is required",
      //     "any.required": "Phone number is required",
      //   }),
      phoneNumber: Joi.string()
        .pattern(/^(\+?234|0)[789][01]\d{8}$/, "Nigeria phone number")
        .required()
        .messages({
          "string.pattern.name": "Phone number must be a valid Nigerian phone number",
          "string.base": "Phone number must be a string",
          "string.empty": "Phone number is required",
          "any.required": "Phone number is required",
        }),
      address: Joi.object({
        street: Joi.string().min(5).max(100).required().messages({
          "string.base": "Street must be a string",
          "string.empty": "Street is required",
          "string.min": "Street must be at least 5 characters long",
          "string.max": "Street must be less than or equal to 100 characters long",
          "any.required": "Street is required",
        }),
        state: Joi.string().min(2).max(50).required().messages({
          "string.base": "State must be a string",
          "string.empty": "State is required",
          "string.min": "State must be at least 2 characters long",
          "string.max": "State must be less than or equal to 50 characters long",
          "any.required": "State is required",
        }),
        country: Joi.string().min(2).max(50).required().messages({
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

      nin: Joi.string().min(11).max(11).required(),
      currency: Joi.string()
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

  forgotPassword: (forgotPassword: IUser) => {
    return Joi.object({
      email: Joi.string().email().required(),
    }).validate(forgotPassword);
  },

  resetPassword: (payload: IOtp) => {
    return Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
      otp: Joi.string().min(6).required(),
    }).validate(payload);
  },
};

export default validation;
