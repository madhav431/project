"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiImpl = void 0;
const types_1 = __importDefault(require("./appointments/types"));
const types_2 = __importDefault(require("./doctor/types"));
const types_3 = __importDefault(require("./user/types"));
const types_4 = __importDefault(require("./users/types"));
class apiImpl {
    constructor() {
        this.appointments = new types_1.default;
        this.doctor = new types_2.default;
        this.user = new types_3.default;
        this.users = new types_4.default;
    }
}
exports.apiImpl = apiImpl;
