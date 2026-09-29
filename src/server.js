import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import productosRoutes from './routes/productosRoutes.js';
import authRoutes from './routes/authRoutes.js';
import serviciosRoutes from './routes/serviciosRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configuración de orígenes permitidos (Local + Render)
const origenesPermitidos = [
  'http://localhost:5173',
  'https://grupomadedero-frontend.onrender.com',
  'https://grupomaderero-frontend.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (como llamadas directas del navegador, Postman) o si está en la lista
    if (!origin || origenesPermitidos.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, true); // O usa callback(new Error('Bloqueado por CORS')) si deseas restricción estricta
    }
  },
  credentials: true
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
  console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
});