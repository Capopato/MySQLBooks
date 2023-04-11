import mysql from "mysql";
import config from "./config";
import { connection } from "mongoose";

type queryValues = Array<string | number | boolean | null> | string;

const params = {
  user: config.mysql.user,
  password: config.mysql.password,
  host: config.mysql.host,
  database: config.mysql.database,
};

const connect = async () =>
  new Promise<mysql.Connection>((resolve, reject) => {
    const connection = mysql.createConnection(params);
    connection.connect((error) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
      console.log("Connected to Mysql Database.");
      resolve(connection);
    });
  });

const queryMysql = async (connection: mysql.Connection, query: string, values?: queryValues) => {
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
};

export { connect, queryMysql };
