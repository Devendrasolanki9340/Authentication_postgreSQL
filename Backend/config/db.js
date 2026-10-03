

import pkg from "pg";
const { Pool } = pkg;
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.DB_USER);
console.log(process.env.DB_HOST);


const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_UESR,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on("connect", () => {
  console.log("Connected to the database");
});

export default pool;