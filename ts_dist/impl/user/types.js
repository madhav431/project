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
const utils_1 = __importDefault(require("../../utils/utils"));
const dbConnection_1 = require("../../dbConnection");
class User {
    getProfile(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let result1 = yield utils_1.default.get_user_with_id(id);
            if (result1[0]["COUNT(*)"] < 0) {
                let res = {
                    status: 404,
                    body: {
                        message: "User not found!",
                    },
                };
                return resolve(res);
            }
            let sql = `SELECT * FROM hms_patients WHERE id=${id}`;
            dbConnection_1.connection.query(sql, (err, result) => {
                if (err) {
                    console.error(err);
                    return reject(err);
                }
                console.log(result);
                let res = {
                    status: 200,
                    body: {
                        id: result[0].id,
                        email: result[0].email,
                        gender: result[0].gender,
                        name: result[0].name,
                        mobile: result[0].mobile,
                        address: result[0].address,
                        age: result[0].age,
                        medical_history: result[0].medical_history,
                    },
                };
                return resolve(res);
            });
        }));
    }
    signIn(request) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let result = yield utils_1.default.checkEmailExists(request === null || request === void 0 ? void 0 : request.email);
            if (result[0]["COUNT(*)"] > 0) {
                let sql = `select * from hms_patients where email='${request === null || request === void 0 ? void 0 : request.email}'`;
                let passwordRef = yield utils_1.default.verifyPassword(request === null || request === void 0 ? void 0 : request.email, request === null || request === void 0 ? void 0 : request.password);
                if (!passwordRef) {
                    let res = {
                        status: 404,
                        body: {
                            message: "Password is incorrect!",
                        },
                    };
                    return resolve(res);
                }
                dbConnection_1.connection.query(sql, (err, result) => {
                    if (err)
                        throw err;
                    let res = {
                        status: 200,
                        body: {
                            id: result[0].id,
                            email: result[0].email,
                            token: result[0].token,
                        },
                    };
                    return resolve(res);
                });
            }
            else {
                let res = {
                    status: 404,
                    body: {
                        message: "Email not exists! please register first",
                    },
                };
                return resolve(res);
            }
        }));
    }
}
exports.default = User;
