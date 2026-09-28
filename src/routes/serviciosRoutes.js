import { Router } from 'express';
import { 
  obtenerServicios, 
  crearServicio, 
  actualizarServicio, 
  eliminarServicio 
} from '../controllers/serviciosController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/', obtenerServicios);
router.post('/', verificarToken, crearServicio);
router.put('/:id', verificarToken, actualizarServicio);
router.delete('/:id', verificarToken, eliminarServicio);

export default router;