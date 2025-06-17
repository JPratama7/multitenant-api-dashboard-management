import {Sequelize} from "sequelize";
import pg from "pg";

const dbUrl = process.env.DB_URL_STRING;

if (!dbUrl) {
  throw new Error("DB_URL_STRING environment variable is not defined. Please set it in your .env.local file.");
}

export const db = new Sequelize(dbUrl, {
  dialect: 'postgres',
  dialectModule: pg
});

export default db;
