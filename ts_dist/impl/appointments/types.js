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
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = require("../../dbConnection");
class Appointments {
    createAppointment(request) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                let createdAt = new Date().toLocaleDateString();
                let id = Math.random().toString(20).substring(2, 20).toUpperCase();
                let values = {
                    id,
                    doctor_id: request === null || request === void 0 ? void 0 : request.doctor_id,
                    patient_id: request === null || request === void 0 ? void 0 : request.patient_id,
                    appointment_date: request === null || request === void 0 ? void 0 : request.appointment_date,
                    appointment_time: request === null || request === void 0 ? void 0 : request.appointment_time,
                    created: createdAt.split("/").reverse().join("-"),
                    status: "Active",
                    fee: "500",
                };
                let sql = `INSERT INTO hms_appointments SET ?`;
                dbConnection_1.connection.query(sql, values, (err, result) => {
                    if (err)
                        throw err;
                    let res = {
                        status: 201,
                        body: {
                            message: "Appointment created successfully",
                        },
                    };
                    return resolve(res);
                });
                dbConnection_1.connection.end();
            }
            catch (err) {
                console.error(err);
                let res = {
                    status: 404,
                    body: {
                        message: "Appointment not created",
                    },
                };
                return resolve(res);
            }
        }));
    }
}
exports.default = Appointments;
