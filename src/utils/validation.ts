import Joi from "joi";
import { IBuyNumber, ICheckEmail, IKYC, IOtp, IUser } from "../types";

export const validation = {
  checkEmail: (email: string) => {
    return Joi.string().email().validate(email);
  },

  checkPhoneNumber: (number: string) => {
    return (
      Joi.string()
        // .pattern(/^\d+$/)
        .messages({
          "string.pattern.base": "Phone number must contain only digits.",
          "string.empty": "Phone number is required.",
        })
        .validate(number)
    );
  },

  buyNumber: (payload: IBuyNumber) => {
    return Joi.object<IBuyNumber>({
      skyId: Joi.string()
        // .pattern(/^(\+?234|0)[789][01]\d{8}$/, "Nigeria phone number")
        .required()
        .messages({
          "string.pattern.name": "Phone number must be a valid Nigerian phone number",
          "string.base": "Phone number must be a string",
          "string.empty": "Phone number is required",
          "any.required": "Phone number is required",
        }),
      mappedNumbers: Joi.array().items(Joi.string()).min(1).required(),
      withIVR: Joi.boolean().required(),
      withIVM: Joi.boolean().required(),
    }).validate(payload);
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
      phoneNumber: Joi.string()
        .pattern(/^(\+?234|0)[789][01]\d{8}$/, "Nigeria phone number")
        .required()
        .messages({
          "string.pattern.name": "Phone number must be a valid Nigerian phone number",
          "string.base": "Phone number must be a string",
          "string.empty": "Phone number is required",
          "any.required": "Phone number is required",
        }),
      country: Joi.string()
        .messages({
          "any.required": "Country is required",
        })
        .required(),
      businessName: Joi.string().messages({
        "any.required": "Business name is required",
      }),
      businessType: Joi.string().messages({
        "any.required": "Business type is required",
      }),
      accountType: Joi.string().messages({
        "any.required": "Business type is required",
      }),
      agentCode: Joi.string().messages({
        "any.required": "Agent code is required",
      }),
    }).validate(signup);
  },

  kyc: (kyc: IKYC) => {
    return Joi.object({
      // user_id: Joi.string().required(),
      phone: Joi.string()
        .pattern(/^(\+?234|0)[789][01]\d{8}$/, "Nigeria phone number")
        .required()
        .messages({
          "string.pattern.name": "Phone number must be a valid Nigerian phone number",
          "string.base": "Phone number must be a string",
          "string.empty": "Phone number is required",
          "any.required": "Phone number is required",
        }),
      address: Joi.string().required(),
      state: Joi.string().required(),
      nin: Joi.string().min(11).required(),
    }).validate(kyc);
  },

  forgotPassword: (forgotPassword: IUser) => {
    return Joi.object({
      email: Joi.string().email().required(),
    }).validate(forgotPassword);
  },

  confirmEmail: (payload: ICheckEmail) => {
    return Joi.object({
      email: Joi.string().email().required(),
      otp: Joi.string().min(6).required(),
    }).validate(payload);
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
