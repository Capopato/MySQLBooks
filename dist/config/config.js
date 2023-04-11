"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mysqlHost = process.env.mysqlHost || "localhost";
const mysqlDB = process.env.mysqlDB || "";
const mysqlUser = process.env.mysqlUser || "";
const mysqlPassword = process.env.mysqlPassword || "";
const port = process.env.port || 3001;
const MYSQL = {
    host: mysqlHost,
    database: mysqlDB,
    user: mysqlUser,
    password: mysqlPassword,
};
exports.default = {
    mysql: MYSQL,
    port,
};
