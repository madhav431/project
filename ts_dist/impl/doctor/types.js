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
class Doctor {
    getDoctor(id) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let count = yield utils_1.default._check_doctor_exists_id(id);
                console.log("count", count);
                if (count[0]["count(*)"] == 0) {
                    let res = {
                        status: 404,
                        body: {
                            message: "Doctor not found"
                        }
                    };
                    return resolve(res);
                }
                let sql = `SELECT * FROM hms_doctor WHERE id=${id}`;
                dbConnection_1.connection.query(sql, (err, result) => {
                    if (err) {
                        console.error(err);
                        return reject(err);
                    }
                    let res = {
                        status: 200,
                        body: {
                            id: result[0].id,
                            email: result[0].email,
                            name: result[0].name,
                            mobile: result[0].mobile,
                            specialization: result[0].specialization,
                        }
                    };
                    return resolve(res);
                });
            }
            catch (err) {
                console.log(err);
                let res = {
                    status: 404,
                    body: {
                        message: "Doctor not found"
                    }
                };
                return resolve(res);
            }
        }));
    }
    doctorSign(request) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let doctor = yield utils_1.default._check_doctor_exists(request === null || request === void 0 ? void 0 : request.email);
                if (doctor[0]["COUNT(*)"] == 0) {
                    let res = {
                        status: 404,
                        body: {
                            message: "Email not found please register",
                        },
                    };
                    return resolve(res);
                }
                let passwordRef = yield utils_1.default.verifyDoctorPassword(request === null || request === void 0 ? void 0 : request.email, request === null || request === void 0 ? void 0 : request.password);
                if (!passwordRef) {
                    let res = {
                        status: 404,
                        body: {
                            message: "Password is incorrect",
                        },
                    };
                    return resolve(res);
                }
                if (doctor[0]["COUNT(*)"] > 0) {
                    let sql = `select * from hms_doctor where email='${request === null || request === void 0 ? void 0 : request.email}'`;
                    dbConnection_1.connection.query(sql, (err, result) => {
                        if (err) {
                            console.error(err);
                            return reject(err);
                        }
                        let res = {
                            status: 200,
                            body: {
                                id: result[0].id,
                                email: result[0].email,
                                name: result[0].name,
                                mobile: result[0].mobile,
                                specialization: result[0].specialization,
                            },
                        };
                        return resolve(res);
                    });
                }
            }
            catch (err) {
                console.log(err);
                let res = {
                    status: 404,
                    body: {
                        message: "Please try again with proper credentials",
                    },
                };
                return resolve(res);
            }
        }));
    }
    createDoctor(request) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let id = Math.random().toString(20).substring(2, 20).toUpperCase();
            let hashedPassword = yield utils_1.default.hashPassword(request === null || request === void 0 ? void 0 : request.password);
            let doctor = yield utils_1.default._check_doctor_exists(request === null || request === void 0 ? void 0 : request.email);
            if (doctor[0]["COUNT(*)"] > 0) {
                let res = {
                    status: 404,
                    body: {
                        message: "Email already exists",
                    },
                };
                return resolve(res);
            }
            try {
                let values = {
                    id,
                    name: request === null || request === void 0 ? void 0 : request.name,
                    email: request === null || request === void 0 ? void 0 : request.email,
                    password: hashedPassword,
                    address: request === null || request === void 0 ? void 0 : request.address,
                    mobile: request === null || request === void 0 ? void 0 : request.mobile,
                    specialization: request === null || request === void 0 ? void 0 : request.specialization,
                };
                let sql = `INSERT INTO hms_doctor set ?`;
                dbConnection_1.connection.query(sql, values, (err, result) => {
                    if (err)
                        throw err;
                    let res = {
                        status: 201,
                        body: {
                            message: "Doctor Created Successfully",
                        },
                    };
                    return resolve(res);
                });
                dbConnection_1.connection.end();
            }
            catch (err) {
                console.log(err);
                let res = {
                    status: 404,
                    body: {
                        message: "Something went wrong",
                    },
                };
                return resolve(res);
            }
        }));
    }
}
exports.default = Doctor;
