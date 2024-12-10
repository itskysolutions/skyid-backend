"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
class Bcrypt {
    static instance;
    constructor() { }
    static shared() {
        if (!Bcrypt.instance) {
            Bcrypt.instance = new Bcrypt();
        }
        return Bcrypt.instance;
    }
    encode = (value) => bcrypt_1.default.hashSync(value, bcrypt_1.default.genSaltSync(10));
    decode = (value) => bcrypt_1.default.hashSync(bcrypt_1.default.genSaltSync(10), value);
    compare = (value, hash) => bcrypt_1.default.compareSync(value, hash);
}
exports.default = Bcrypt;
//# sourceMappingURL=bcryptService.js.map