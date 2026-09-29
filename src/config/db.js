import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'admin123',
  database: process.env.DB_NAME || 'grupo_maderero_db',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  ssl: process.env.DB_HOST ? { rejectUnauthorized: false } : false // Requiere SSL para Aiven/Railway
});