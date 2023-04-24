"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const connection = mysql2_1.default.createPool({
    host: "34.122.10.249",
    user: "root",
    password: "root@1234",
    database: "hms",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
exports.connection = connection;
connection.getConnection((err, connection) => {
    if (err) {
        console.log(err);
        return;
    }
    else {
        console.log("Connected to database");
        connection.release();
    }
});
