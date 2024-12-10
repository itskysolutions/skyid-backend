"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptService_1 = __importDefault(require("../utils/bcryptService"));
const sendMail_1 = require("../utils/sendMail");
const registration_1 = require("../views/registration");
const dotenv_1 = __importDefault(require("dotenv"));
const model_1 = __importDefault(require("./model"));
const validation_schema_1 = __importDefault(require("./validation-schema"));
dotenv_1.default.config();
class UserManagementController {
    static async signup(req, res) {
        try {
            const { error } = validation_schema_1.default.signup({ ...req.body });
            if (error)
                return res.status(400).send(error.details[0].message);
            let user = await model_1.default.findOne({ email: req.body.email });
            if (user)
                return res.status(400).send({ message: "Email is taken already." });
            user = new model_1.default({
                ...req.body,
                verified: "false",
                password: bcryptService_1.default.shared().encode(req.body.password), // encrypt password
            });
            await user.save();
            (0, sendMail_1.sendMail)({
                to: req.body.email,
                from: "Skyid",
                name: req.body.firstName,
                subject: "Welcome to SKYID",
                html: (0, registration_1.registration)(req.body.firstName),
                text: "",
            });
            return res.status(200).json({ message: "success" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
    static async userProfile(req, res, next) {
        try {
            const profileData = await model_1.default.findById(req.user?._id).select("-password -__v");
            return res.status(200).json({ message: "success", data: profileData });
        }
        catch (error) {
            return res.status(500).json({ message: error });
        }
    }
}
exports.default = UserManagementController;
//# sourceMappingURL=controller.js.map