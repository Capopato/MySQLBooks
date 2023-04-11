import mysql from "mysql";
import config from "./config/config";
import express from "express";

const app = express();
app.use(express.json());
// create a MySQL connection
const connection = mysql.createConnection({
  user: config.mysql.user,
  password: config.mysql.password,
  host: config.mysql.host,
  database: config.mysql.database,
});

// connect to MySQL
connection.connect();

connection.query(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    email VARCHAR(255)
  )
`,
  (err, result) => {
    if (err) throw err;
    console.log("Users table created or already exists");
  }
);

// create an API endpoint to insert data into MySQL
app.post("/api/data", (req, res) => {
  //   const { name, email } = req.body;
  const name = req.body.name;
  const email = req.body.email;
  const query = `INSERT INTO users (name, email) VALUES ('${name}', '${email}')`;

  // execute the SQL query to insert data into MySQL
  connection.query(query, (err, result) => {
    if (err) throw err;
    res.send("Data inserted into MySQL");
  });
});

// start the Express app
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
