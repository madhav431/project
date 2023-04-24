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
const dbConnection_1 = require("../../dbConnection");
const utils_1 = __importDefault(require("../../utils/utils"));
class Users {
    createUser(request) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            console.log("request", request);
            if ((request === null || request === void 0 ? void 0 : request.email) === "" || (request === null || request === void 0 ? void 0 : request.name) === "" || (request === null || request === void 0 ? void 0 : request.password) === "") {
                let res = {
                    status: 404,
                    body: {
                        message: "Please Provide user details correctly",
                    },
                };
                return resolve(res);
            }
            let result = yield utils_1.default.checkEmailExists(request === null || request === void 0 ? void 0 : request.email);
            console.log("result", result);
            if (result[0]["COUNT(*)"] > 0) {
                let res = {
                    status: 404,
                    body: {
                        message: "Email already exists",
                    },
                };
                return resolve(res);
            }
            try {
                let id = Math.random().toString(20).substring(2, 20).toUpperCase();
                let token = utils_1.default.generateToken(id, "HMS");
                let hashedPassword = yield utils_1.default.hashPassword(request === null || request === void 0 ? void 0 : request.password);
                console.log("hashedPassword-😅", hashedPassword);
                let createdAt = new Date().toLocaleDateString();
                let values = {
                    id,
                    name: request === null || request === void 0 ? void 0 : request.name,
                    email: request === null || request === void 0 ? void 0 : request.email,
                    password: hashedPassword,
                    gender: request === null || request === void 0 ? void 0 : request.gender,
                    mobile: request === null || request === void 0 ? void 0 : request.mobile,
                    address: request === null || request === void 0 ? void 0 : request.address,
                    age: request === null || request === void 0 ? void 0 : request.age,
                    token: token,
                    medical_history: request === null || request === void 0 ? void 0 : request.medical_history,
                    createdAt: createdAt
                        .split("/")
                        .reverse()
                        .join("-"),
                };
                dbConnection_1.connection.query(`INSERT INTO hms_patients set ?`, values, (err, result) => {
                    if (err)
                        throw err;
                    console.log(result);
                    let res = {
                        status: 201,
                        body: {
                            message: "Successfully user created"
                        }
                    };
                    return resolve(res);
                });
            }
            catch (err) {
                let res = {
                    status: 404,
                    body: {
                        message: "Something went wrong!",
                    },
                };
                return resolve(res);
            }
        }));
    }
}
exports.default = Users;
