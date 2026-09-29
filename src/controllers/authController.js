import db from '../config/db.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  try {
    const { usuario, password } = req.body;

    // Buscar usuario en la base de datos
    const [filas] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    if (filas.length === 0) {
      return res.status(401).json({ ok: false, mensaje: 'Credenciales incorrectas' });
    }

    const user = filas[0];

    // Verificar contraseña estrictamente con el hash guardado en MySQL
    const passwordValida = await bcrypt.compare(password, user.password);

    if (!passwordValida) {
      return res.status(401).json({ ok: false, mensaje: 'Credenciales incorrectas' });
    }

    // Generar Token JWT válido por 8 horas
    const token = jwt.sign(
      { id: user.id, usuario: user.usuario },
      process.env.JWT_SECRET || 'secreto_fallback',
      { expiresIn: '8h' }
    );

    res.json({
      ok: true,
      token,
      usuario: { id: user.id, usuario: user.usuario }
    });
  } catch (error) {
    console.error('Error en Login:', error);
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};

export const cambiarPassword = async (req, res) => {
  try {
    const { passwordActual, nuevaPassword } = req.body;

    // Obtener el usuario autenticado desde el token middleware
    const usuarioBusqueda = req.usuario?.usuario || 'admin';

    const [filas] = await db.query('SELECT * FROM usuarios WHERE usuario = ?', [usuarioBusqueda]);

    if (filas.length === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Usuario no encontrado' });
    }

    const user = filas[0];

    // Validar contraseña actual con el hash almacenado
    const esValida = await bcrypt.compare(passwordActual, user.password);

    if (!esValida) {
      return res.status(400).json({ ok: false, mensaje: 'La contraseña actual es incorrecta' });
    }

    // Encriptar la nueva contraseña con bcrypt
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(nuevaPassword, salt);

    // Actualizar en la base de datos de Aiven
    await db.query('UPDATE usuarios SET password = ? WHERE id = ?', [passwordHash, user.id]);

    res.json({ ok: true, mensaje: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('Error al cambiar contraseña:', error);
    res.status(500).json({ ok: false, mensaje: 'Error interno del servidor' });
  }
};