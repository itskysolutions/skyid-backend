"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const numbersModel_1 = __importDefault(require("../models/numbersModel"));
const skyIdModel_1 = __importDefault(require("../models/skyIdModel"));
dotenv_1.default.config();
class SwitchTeamController {
    static async sendSwitchBuyNumberRequest(req, res) {
        const { userId, skyId, mappedNumber, request_type, account_type, status, network_type } = req.body;
        try {
            // const { error } = validation.checkRequest(userId);
            // if (error) return res.status(400).send(error.details[0].message);
            let skyIdNumber = await numbersModel_1.default?.findOne({ userId: userId });
            if (!skyIdNumber)
                return res.status(403).send({ message: "number does not exist" });
            console.log(skyId, mappedNumber, account_type, status, network_type, "checking");
            // let sendRequest = new BuyNumberRequest({
            //   ...req.body,
            //   request_type: "pending",
            // });
            // await sendRequest.save();
            return res.status(200).send({ message: "success" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
    static async updateSwitchBuyNumberRequest(req, res) {
        const { userId } = req.body;
        try {
            // const { error } = validation.checkId(userId);
            // if (error) return res.status(400).send(error.details[0].message);
            let skyIdNumber = await skyIdModel_1.default?.findOne({ userId });
            if (!skyIdNumber)
                return res.status(403).send({ message: "number does not exist" });
            console.log(userId, "update");
            await skyIdModel_1.default.updateOne({ userId }, { status: "completed" });
            return res.status(200).send({ message: "success" });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
}
exports.default = SwitchTeamController;
//# sourceMappingURL=controller.js.map