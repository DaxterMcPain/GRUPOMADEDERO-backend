import { Router } from 'express';
import { 
  obtenerProductos, 
  crearProducto, 
  actualizarProducto, 
  eliminarProducto 
} from '../controllers/productosController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', obtenerProductos); // Pública para los clientes
router.post('/', verificarToken, crearProducto); // Protegida para admin
router.put('/:id', verificarToken, actualizarProducto); // Protegida para admin
router.delete('/:id', verificarToken, eliminarProducto); // Protegida para admin

export default router;