import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'grupo_maderero_db',
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  // OBLIGATORIO PARA AIVEN: Habilitar SSL rechazando certificados no autorizados
  ssl: process.env.DB_HOST && process.env.DB_HOST !== 'localhost' 
    ? { rejectUnauthorized: false } 
    : false,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});