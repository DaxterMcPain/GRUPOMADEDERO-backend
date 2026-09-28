import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ ok: false, mensaje: 'Acceso denegado: Token requerido' });
  }

  try {
    const verificado = jwt.verify(token, process.env.JWT_SECRET || 'secreto_fallback');
    req.usuario = verificado;
    next();
  } catch (error) {
    res.status(403).json({ ok: false, mensaje: 'Token inválido o expirado' });
  }
};