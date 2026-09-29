import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  ssl: process.env.DB_HOST && process.env.DB_HOST !== 'localhost' 
    ? { rejectUnauthorized: false } 
    : false,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Exportación nombrada (por si algún archivo usa { db })
export { db };

// Exportación por defecto (corrige el error SyntaxError)
export default db;