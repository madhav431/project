"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
let connection = mysql2_1.default.createConnection({
    host: "34.122.10.249",
    user: "root",
    password: 'VLz{#O|h^9`Y|1lK',
    database: "hms",
    port: 3306,
});
exports.connection = connection;
connection.connect((err) => {
    if (err)
        console.log("Error in connecting to database");
    console.log("Database connected successfully");
});
