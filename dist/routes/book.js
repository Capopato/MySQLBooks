"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_1 = require("../controllers/book");
const bookRoutes = express_1.default.Router();
bookRoutes.post("/insertBook", book_1.insertBook);
bookRoutes.put("/updateBook/:bookID", book_1.updateBook);
bookRoutes.get("/getBook/:bookID", book_1.getBook);
bookRoutes.get("/allBooks", book_1.getAllBooks);
bookRoutes.delete("/deleteBook/:bookID", book_1.deleteBook);
bookRoutes.delete("/deleteAllBooks", book_1.deleteAllBooks);
exports.default = bookRoutes;
