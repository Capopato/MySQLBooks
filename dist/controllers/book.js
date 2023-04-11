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
exports.deleteAllBooks = exports.deleteBook = exports.getAllBooks = exports.getBook = exports.updateBook = exports.insertBook = void 0;
const mysql_1 = require("../config/mysql");
const input_validate_1 = require("../validation/input.validate");
const insertBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, input_validate_1.validateInput)(req.body);
        if (!valid) {
            return res.status(500).send("Input not valid.");
        }
        const { author, title, pages, year } = req.body;
        const createTableQuery = `CREATE TABLE IF NOT EXISTS books (
      id INT AUTO_INCREMENT PRIMARY KEY,
      author VARCHAR(255),
      tile VARCHAR(255),
      pages INT,
      year INT
    )`;
        const insertBookQuery = `INSERT INTO books (author, title, pages, year) VALUES (?,?,?,?)`;
        const insertBookValues = [author, title, pages, year];
        const connection = yield (0, mysql_1.connect)();
        yield (0, mysql_1.queryMysql)(connection, createTableQuery);
        yield (0, mysql_1.queryMysql)(connection, insertBookQuery, insertBookValues);
        const insertedBook = { author, title, pages, year };
        res.status(200).json({ book: insertedBook });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.insertBook = insertBook;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const valid = (0, input_validate_1.validateUpdate)(req.body);
        if (!valid) {
            return res.status(500).send("Input not valid.");
        }
        const updateQuery = `UPDATE books SET author = ?, title = ?, pages = ?, year = ? WHERE id = ?`;
        const bookID = req.params.bookID;
        const { author, title, pages, year } = req.body;
        const updateValue = [author, title, pages, year, bookID];
        const connection = yield (0, mysql_1.connect)();
        const result = yield (0, mysql_1.queryMysql)(connection, updateQuery, updateValue);
        res.status(200).json({ update: updateValue });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.updateBook = updateBook;
const getBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getBookQuery = `SELECT * FROM books WHERE id = ?`;
        const getBookValue = req.params.bookID;
        const connection = yield (0, mysql_1.connect)();
        const result = yield (0, mysql_1.queryMysql)(connection, getBookQuery, getBookValue);
        console.log(result);
        res.status(200).json({ result });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.getBook = getBook;
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchQuery = `SELECT * FROM books`;
        const connection = yield (0, mysql_1.connect)();
        const result = yield (0, mysql_1.queryMysql)(connection, searchQuery);
        console.log(result);
        res.status(200).json({ result });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.getAllBooks = getAllBooks;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteQuery = `DELETE FROM books WHERE id = ?`;
        const deleteValue = req.params.bookID;
        const connection = yield (0, mysql_1.connect)();
        const result = yield (0, mysql_1.queryMysql)(connection, deleteQuery, deleteValue);
        console.log(result);
        res.status(200).json({ result });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.deleteBook = deleteBook;
const deleteAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteAllQuery = `TRUNCATE TABLE books`;
        const connection = yield (0, mysql_1.connect)();
        const result = yield (0, mysql_1.queryMysql)(connection, deleteAllQuery);
        res.status(200).json({ result });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
});
exports.deleteAllBooks = deleteAllBooks;
