import { Request, Response, NextFunction } from "express";
import { connect, queryMysql } from "../config/mysql";
import { validateInput, validateUpdate } from "../validation/input.validate";

export const insertBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid = validateInput(req.body);

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
    const connection = await connect();
    await queryMysql(connection, createTableQuery);
    await queryMysql(connection, insertBookQuery, insertBookValues);
    const insertedBook = { author, title, pages, year };
    res.status(200).json({ book: insertedBook });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const valid = validateUpdate(req.body);

    if (!valid) {
      return res.status(500).send("Input not valid.");
    }

    const updateQuery = `UPDATE books SET author = ?, title = ?, pages = ?, year = ? WHERE id = ?`;
    const bookID = req.params.bookID;
    const { author, title, pages, year } = req.body;
    const updateValue = [author, title, pages, year, bookID];
    const connection = await connect();
    const result = await queryMysql(connection, updateQuery, updateValue);
    res.status(200).json({ update: updateValue });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const getBookQuery = `SELECT * FROM books WHERE id = ?`;
    const getBookValue = req.params.bookID;
    const connection = await connect();
    const result = await queryMysql(connection, getBookQuery, getBookValue);
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const searchQuery = `SELECT * FROM books`;
    const connection = await connect();
    const result = await queryMysql(connection, searchQuery);
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleteQuery = `DELETE FROM books WHERE id = ?`;
    const deleteValue = req.params.bookID;
    const connection = await connect();
    const result = await queryMysql(connection, deleteQuery, deleteValue);
    console.log(result);
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export const deleteAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const deleteAllQuery = `TRUNCATE TABLE books`;
    const connection = await connect();
    const result = await queryMysql(connection, deleteAllQuery);
    res.status(200).json({ result });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
