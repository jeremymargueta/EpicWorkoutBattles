import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();
console.log("Entered db.ts Taco!");
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
console.log("Leaving db.ts Taco2!");

export default db;
