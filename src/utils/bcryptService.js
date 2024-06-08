"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class BcryptService {
    constructor() {
        this.encode = (value) => bcrypt_1.default.hashSync(value, bcrypt_1.default.genSaltSync(10));
        this.decode = (value) => bcrypt_1.default.hashSync(bcrypt_1.default.genSaltSync(10), value);
        this.compare = (value, hash) => bcrypt_1.default.compareSync(value, hash);
    }
    static getInstance() {
        if (!BcryptService.instance) {
            BcryptService.instance = new BcryptService();
        }
        return BcryptService.instance;
    }
}
exports.default = BcryptService;
