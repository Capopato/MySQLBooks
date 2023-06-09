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
exports.queryMysql = exports.connect = void 0;
const mysql_1 = __importDefault(require("mysql"));
const config_1 = __importDefault(require("./config"));
const params = {
    user: config_1.default.mysql.user,
    password: config_1.default.mysql.password,
    host: config_1.default.mysql.host,
    database: config_1.default.mysql.database,
};
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        const connection = mysql_1.default.createConnection(params);
        connection.connect((error) => {
            if (error) {
                console.log(error);
                return reject(error);
            }
            console.log("Connected to Mysql Database.");
            resolve(connection);
        });
    });
});
exports.connect = connect;
const queryMysql = (connection, query, values) => __awaiter(void 0, void 0, void 0, function* () {
    return new Promise((resolve, reject) => {
        connection.query(query, values, (error, result) => {
            if (error) {
                console.log(error);
                return reject(error);
            }
            resolve(result);
            console.log(`Query executed: ${query}`);
        });
    });
});
exports.queryMysql = queryMysql;
