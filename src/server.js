import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productosRoutes from './routes/productosRoutes.js';
import authRoutes from './routes/authRoutes.js';
import serviciosRoutes from './routes/serviciosRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de seguridad y parseo de JSON
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173'
}));
app.use(express.json());

// Rutas API
app.use('/api/productos', productosRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/servicios', serviciosRoutes);

// Ruta base de prueba
app.get('/', (req, res) => {
  res.send('API de Grupo Maderero en funcionamiento 🌲');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});