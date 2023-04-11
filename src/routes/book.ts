import express from "express";
import { insertBook, updateBook, getBook, getAllBooks, deleteBook, deleteAllBooks } from "../controllers/book";

const bookRoutes = express.Router();

bookRoutes.post("/insertBook", insertBook);
bookRoutes.put("/updateBook/:bookID", updateBook);
bookRoutes.get("/getBook/:bookID", getBook);
bookRoutes.get("/allBooks", getAllBooks);
bookRoutes.delete("/deleteBook/:bookID", deleteBook);
bookRoutes.delete("/deleteAllBooks", deleteAllBooks);

export default bookRoutes;
