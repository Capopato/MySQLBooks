import dotenv from "dotenv";

dotenv.config();

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

export default {
  mysql: MYSQL,
  port,
};
