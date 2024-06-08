"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtp = void 0;
const generateOtp = () => {
    try {
        return `${Math.floor(100000 + Math.random() * 900000)}`;
    }
    catch (ex) {
        throw ex;
    }
};
exports.generateOtp = generateOtp;
