"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validation_1 = __importDefault(require("../utils/validation"));
const userModel_1 = __importDefault(require("../models/userModel"));
const dotenv_1 = __importDefault(require("dotenv"));
const numbersModel_1 = __importDefault(require("../models/numbersModel"));
const paystack_1 = require("../utils/paystack");
const skyIdModel_1 = __importDefault(require("../models/skyIdModel"));
dotenv_1.default.config();
class NumberController {
    static async checkNumber(req, res) {
        const { number } = req.body;
        try {
            const { error } = validation_1.default.checkPhoneNumber(number);
            if (error)
                return res.status(400).send(error.details[0].message);
            let userNumber = await numbersModel_1.default?.findOne({ number });
            // not our number
            if (!userNumber)
                return res.status(403).send({ message: "number does not exist" });
            // console.log(userNumber.available, "logs");
            // if (!userNumber.available || userNumber.usedBy || userNumber.agentOwner)
            if (userNumber.available === "false")
                return res.status(403).send({ message: "number is already taken", data: userNumber?.number });
            return res.status(200).send({ message: "available", data: userNumber.available });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
    static async suggestNumber(req, res) {
        const { count } = req.query;
        try {
            const suggestionCount = parseInt(count);
            if (!Number.isInteger(suggestionCount)) {
                return res.status(400).send({ message: "Invalid suggestion count" });
            }
            const suggestedNumbers = await numbersModel_1.default?.aggregate([
                { $match: { available: true, usedBy: null, agentOwner: null } },
                { $sample: { size: suggestionCount } }, // select random numbers
            ]);
            if (!suggestedNumbers || suggestedNumbers.length === 0) {
                console.log("EMERGENCY: There are no available phone numbers in the database.");
                return res.status(500).send({ message: "please try again later" });
            }
            const data = suggestedNumbers.map((num) => num.number);
            return res.status(200).send({ message: "success", data });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
    // TODO: add vat to amount
    static async buyNumber(req, res) {
        try {
            const { error, value } = validation_1.default.buyNumber(req.body);
            if (error)
                return res.status(400).send(error.details[0].message);
            const { skyId, mappedNumbers, withIVR, withIVM } = value;
            let amount = 20_000; // primary mapping cost
            for (let i = 1 /* skip index 0 (primary mapping) */; i < mappedNumbers.length; i++) {
                amount += 15_000; // additional mapping cost
            }
            if (withIVR)
                amount += 20_000; // ivr cost
            if (withIVM)
                amount += 20_000; // ivm cost
            const user = await userModel_1.default.findById(req.body?._id);
            if (!user)
                return res.status(401).send({ message: "user not found" });
            amount = amount * 100; // convert from naira to kobo
            const transaction = await paystack_1.Paystack.initializeTransaction(amount.toString(), user.email, {
                skyId,
                userId: user._id.toString(),
            });
            const skyIdRecord = new skyIdModel_1.default({
                skyId,
                mappedNumbers,
                withIVR,
                withIVM,
                userId: user._id,
                status: "pending",
                amount,
                txnRef: transaction.reference,
            });
            await skyIdRecord.save();
            await numbersModel_1.default?.updateOne({ number: skyId }, { available: false, usedBy: user._id, platform: "SKYID" });
            return res.status(200).send({ message: "success", data: transaction });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
    static async getUserNumbers(req, res) {
        const { id } = req.params;
        try {
            const { error } = validation_1.default.checkPhoneNumber(id);
            if (error)
                return res.status(400).send(error.details[0].message);
            let skyIdNumber = await skyIdModel_1.default?.findOne({ userId: id });
            if (!skyIdNumber)
                return res.status(403).send({ message: "number does not exist" });
            return res.status(200).send({ message: "success", data: skyIdNumber });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
    static async sendSwitchBuyNumberRequest(req, res) {
        const { id, skyid, mappedNumber, request_type, account_type, status, network_type } = req.body;
        try {
            const { error } = validation_1.default.checkPhoneNumber(id);
            if (error)
                return res.status(400).send(error.details[0].message);
            let skyIdNumber = await skyIdModel_1.default?.findOne({ userId: id });
            if (!skyIdNumber)
                return res.status(403).send({ message: "number does not exist" });
            return res.status(200).send({ message: "success", data: skyIdNumber });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
    static async replaceBuyNumber(req, res) {
        const { id } = req.params;
        const { current_number, new_number } = req.body;
        try {
            const { error } = validation_1.default.checkPhoneNumber(id);
            if (error)
                return res.status(400).send(error.details[0].message);
            let skyIdNumber = await skyIdModel_1.default?.findOne({ userId: id });
            if (!skyIdNumber)
                return res.status(403).send({ message: "number does not exist" });
            //check current_number exist
            // console.log(skyIdNumber.mappedNumbers, "mapped");
            // console.log(current_number, "logs");
            if (!skyIdNumber.mappedNumbers.includes(current_number))
                return res.status(403).send({ message: "mapped number does not exist" });
            let number = skyIdNumber.mappedNumbers.map((number) => (number === current_number ? new_number : number)); // find and replace number
            await skyIdModel_1.default.findOneAndUpdate({ userId: id }, {
                $set: { mappedNumbers: number },
            });
            return res.status(200).send({ message: "success", data: skyIdNumber });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
    static async getUserNumbersTransactionHistory(req, res) {
        const { id } = req.params;
        try {
            const { error } = validation_1.default.checkPhoneNumber(id);
            if (error)
                return res.status(400).send(error.details[0].message);
            let skyIdNumber = await skyIdModel_1.default?.findOne({ userId: id });
            if (!skyIdNumber)
                return res.status(403).send({ message: "number does not exist" });
            return res.status(200).send({ message: "success", data: skyIdNumber });
        }
        catch (error) {
            return res.status(500).json({ message: "Internal Server Error!" });
        }
    }
}
exports.default = NumberController;
//# sourceMappingURL=numberController.js.map