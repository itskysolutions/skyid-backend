"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = __importDefault(require("../utils/validation"));
const userModel_1 = __importDefault(require("../models/userModel"));
const bcryptService_1 = __importDefault(require("../utils/bcryptService"));
const sendMail_1 = require("../utils/sendMail");
const registration_1 = require("../views/registration");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class UserController {
    static checkEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const { error } = validation_1.default.checkEmail(email);
                if (error)
                    return res.status(400).send(error.details[0].message);
                // ready to go
                let user = yield userModel_1.default.findOne({ email });
                if (user) {
                    res.status(400).send({ message: "email is already taken." });
                }
                else {
                    return res.status(201).json({ message: "success", data: "available" });
                }
            }
            catch (error) {
                return res.status(500).json({ message: "Internal Server Error!" });
            }
        });
    }
    static checkPhoneNumber(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phoneNumber } = req.body;
            try {
                const { error } = validation_1.default.checkPhoneNumber(phoneNumber);
                if (error)
                    return res.status(400).send(error.details[0].message);
                // ready to go
                let user = yield userModel_1.default.findOne({ phoneNumber });
                if (user) {
                    res.status(400).send({ message: "phone number exists." });
                }
                else {
                    return res.status(201).json({ message: "success", data: "available" });
                }
            }
            catch (error) {
                console.log(error, "error");
                return res.status(500).json({ message: "Internal Server Error!" });
            }
        });
    }
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password, phoneNumber, address, nin, currency } = req.body;
            try {
                const { error } = validation_1.default.signup({
                    firstName,
                    lastName,
                    email,
                    password,
                    phoneNumber,
                    address,
                    nin,
                    currency,
                });
                if (error)
                    return res.status(400).send(error.details[0].message);
                let user = yield userModel_1.default.findOne({ email });
                if (user)
                    return res.status(400).send({ message: "User already registered." });
                user = new userModel_1.default({
                    firstName,
                    lastName,
                    email,
                    password: bcryptService_1.default.getInstance().encode(password), // encrypt password
                    phoneNumber,
                    address,
                    nin,
                    currency,
                });
                yield user.save();
                (0, sendMail_1.sendMail)({
                    to: email,
                    from: "Kirani",
                    name: firstName,
                    subject: "Welcome to Kirani",
                    html: (0, registration_1.registration)(firstName),
                    text: "",
                });
                return res.status(201).json({ message: "success", data: "User created" });
            }
            catch (error) {
                return res.status(500).json({ message: "Internal Server Error!" });
            }
        });
    }
    static signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const { value, error } = validation_1.default.signIn({ email, password });
                if (error)
                    return res.status(400).send(error.details[0].message);
                let user = yield userModel_1.default.findOne({ email: req.body.email });
                if (!user)
                    return res.status(400).send({ message: "Invalid email or password." });
                if (!bcryptService_1.default.getInstance().compare(password, user.password))
                    return res.status(400).send({ message: "Invalid email or password." });
                const token = jsonwebtoken_1.default.sign({ _id: user._id }, process.env.JWT_PRIVATE_KEY);
                return res.status(200).json({ message: "success", accessToken: token });
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        });
    }
    static userProfile(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const profileData = yield userModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).select("-password -__v");
                return res.status(200).json({ message: "success", data: profileData });
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
        });
    }
    forgotPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email } = req.body;
            try {
                const { value, error } = validation_1.default.forgotPassword({ email });
                if (error)
                    return res.status(400).send(error.details[0].message);
                // ready to go
                return res.status(200).json({ message: "success/forgot", data: value });
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
            next();
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            try {
                const { value, error } = validation_1.default.signIn({ email, password });
                if (error)
                    return res.status(400).send(error.details[0].message);
                // ready to go
                return res.status(200).json({ message: "success/reset", data: value });
            }
            catch (error) {
                return res.status(500).json({ message: error });
            }
            next();
        });
    }
}
exports.default = UserController;
//@desc Post signin
//@route POST /api/auth/signup
//@access public
//@desc Post signin
//@route POST /api/auth/signup
//@access public
// const signin = async (req: Request, res: Response, next: NextFunction) => {
//   const { email, password } = req.body;
//   try {
//     const { value, error } = validation.signIn({ email, password });
//     if (error) return res.status(400).send(error.details[0].message);
//     // ready to go
//     return res.status(200).json({ message: "success", data: value });
//   } catch (error) {
//     console.log(error, "here");
//     return res.status(500).json({ message: error });
//   }
//   next();
// };
// const forgotPassword = (req: Request, res: Response) => {
//   const { email } = req.body;
//   try {
//     const { value, error } = validation.forgotPassword({ email });
//     if (error) return res.status(400).send(error.details[0].message);
//     return res.status(200).json({ message: "success", data: value });
//   } catch (error) {
//     console.log("Server error 500");
//     return res.status(500).json({ message: "Server error" });
//   }
// };
// const resetPassword = (req: Request, res: Response) => {
//   return res.status(200).json({ message: "reset" });
// };
