import db from '../config/db.js';

export const obtenerProductos = async (req, res) => {
  try {
    const [filas] = await db.query('SELECT * FROM productos');

    // Parsear el campo JSON 'detalles' si llega como string desde la BD
    const productosFormateados = filas.map(prod => ({
      ...prod,
      detalles: typeof prod.detalles === 'string' ? JSON.parse(prod.detalles) : prod.detalles
    }));

    res.json({
      ok: true,
      data: productosFormateados
    });
  } catch (error) {
    console.error('Error al consultar productos en MySQL:', error);
    res.status(500).json({
      ok: false,
      mensaje: 'Error interno al consultar la base de datos'
    });
  }
};