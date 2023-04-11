"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const config_1 = __importDefault(require("./config/config"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// create a MySQL connection
const connection = mysql_1.default.createConnection({
    user: config_1.default.mysql.user,
    password: config_1.default.mysql.password,
    host: config_1.default.mysql.host,
    database: config_1.default.mysql.database,
});
// connect to MySQL
connection.connect();
connection.query(`
  CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255)
  )
`, (err, result) => {
    if (err)
        throw err;
    console.log("Users table created or already exists");
});
// create an API endpoint to insert data into MySQL
app.post("/api/data", (req, res) => {
    //   const { name, email } = req.body;
    const name = req.body.name;
    const email = req.body.email;
    const query = `INSERT INTO users (name, email) VALUES ('${name}', '${email}')`;
    // execute the SQL query to insert data into MySQL
    connection.query(query, (err, result) => {
        if (err)
            throw err;
        res.send("Data inserted into MySQL");
    });
});
// start the Express app
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
