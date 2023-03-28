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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dbConnection_1 = require("../dbConnection");
class Utils {
    static generateToken(id, secret) {
        try {
            return jsonwebtoken_1.default.sign({
                data: id,
            }, secret, { expiresIn: "1h" });
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static verifyToken(token, secret) {
        try {
            return jsonwebtoken_1.default.verify(token, secret);
        }
        catch (err) {
            throw err;
        }
    }
    static hashPassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcryptjs_1.default.hash(password, 10);
        });
    }
    static checkEmailExists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                try {
                    let sql = `SELECT COUNT(*) FROM hms_patients WHERE email='${email}'`;
                    dbConnection_1.connection.query(sql, (err, result) => {
                        if (err)
                            throw err;
                        resolve(result);
                    });
                }
                catch (err) {
                    console.log(err);
                    return reject(err);
                }
            });
        });
    }
    static verifyPassword(email, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let sql = `SELECT password FROM hms_patients WHERE email='${email}'`;
                dbConnection_1.connection.query(sql, (err, result) => {
                    if (err)
                        return console.error(err);
                    return bcryptjs_1.default
                        .compare(userPassword, result[0].password)
                        .then((result) => {
                        resolve(result);
                    });
                });
            });
        });
    }
    static verifyDoctorPassword(email, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let sql = `SELECT password FROM hms_doctor WHERE email='${email}'`;
                dbConnection_1.connection.query(sql, (err, result) => {
                    if (err)
                        return console.error(err);
                    return bcryptjs_1.default
                        .compare(userPassword, result[0].password)
                        .then((result) => {
                        resolve(result);
                    });
                });
            });
        });
    }
    static get_user_with_id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let sql = `SELECT count(*) FROM hms_patients WHERE id=${id}`;
                dbConnection_1.connection.query(sql, (err, result) => {
                    console.log(result);
                    console.log("err", err);
                    if (err)
                        throw err;
                    resolve(result);
                });
            });
        });
    }
    static _check_doctor_exists_id(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                let sql = `SELECT count(*) FROM hms_doctor WHERE id=${id}`;
                dbConnection_1.connection.query(sql, (err, result) => {
                    console.log(result);
                    if (err)
                        throw err;
                    return resolve(result);
                });
            });
        });
    }
    static _check_doctor_exists(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                if (email.length <= 1)
                    throw new Error("email-invalid");
                let matchString = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!matchString.test(email))
                    throw new Error("email-invalid");
                let sql = `SELECT COUNT(*) FROM hms_doctor WHERE email='${email}'`;
                dbConnection_1.connection.query(sql, (err, result) => {
                    if (err)
                        throw err;
                    resolve(result);
                });
            }).catch((err) => {
                console.log(err);
                throw err;
            });
        });
    }
    static _check_appointment_exists_for_doctor(doctorId, appointment_date, appointment_time) {
        return __awaiter(this, void 0, void 0, function* () {
            let sql = `SELECT * from hms_appointments where id="${doctorId}"`;
            let data = [];
            dbConnection_1.connection.query(sql, (err, rows) => {
                if (err)
                    throw err;
                data.push(...rows);
            });
            console.log(data);
            data.filter((item) => {
                return (item.appointment_date === appointment_date &&
                    item.appointment_time === appointment_time);
            });
            return data;
        });
    }
}
Utils.saltRounds = 10;
exports.default = Utils;
