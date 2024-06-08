import Joi from "joi";
import { IUser } from "../types";

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
    const signUp = Joi.object({
      email: Joi.string().min(3).required(),
      password: Joi.string().min(5).required(),
      firstName: Joi.string().min(5).required(),
      phoneNumber: Joi.string().required(),
    });

    return signUp.validate(signup);
  },
  forgotPassword: (forgotPassword: IUser) => {
    return Joi.object({
      email: Joi.string().email().required(),
    }).validate(forgotPassword);
  },
};

export default validation;
