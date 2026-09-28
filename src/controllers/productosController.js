import db from '../config/db.js';

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const [filas] = await db.query('SELECT * FROM productos ORDER BY id DESC');
    const productosFormateados = filas.map(prod => ({
      ...prod,
      detalles: typeof prod.detalles === 'string' ? JSON.parse(prod.detalles) : prod.detalles
    }));
    res.json({ ok: true, data: productosFormateados });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al consultar productos' });
  }
};

// Crear producto
export const crearProducto = async (req, res) => {
  try {
    const { nombre, categoria, etiqueta, resumen, descripcion, imagen, detalles } = req.body;
    const detallesJSON = JSON.stringify(detalles || []);

    const [resultado] = await db.query(
      `INSERT INTO productos (nombre, categoria, etiqueta, resumen, descripcion, imagen, detalles) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, categoria, etiqueta, resumen, descripcion || resumen, imagen, detallesJSON]
    );

    res.status(201).json({
      ok: true,
      mensaje: 'Producto creado exitosamente',
      id: resultado.insertId
    });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ ok: false, mensaje: 'Error al guardar el producto' });
  }
};

// Actualizar producto
export const actualizarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, categoria, etiqueta, resumen, descripcion, imagen, detalles } = req.body;
    const detallesJSON = JSON.stringify(detalles || []);

    const [resultado] = await db.query(
      `UPDATE productos 
       SET nombre = ?, categoria = ?, etiqueta = ?, resumen = ?, descripcion = ?, imagen = ?, detalles = ?
       WHERE id = ?`,
      [nombre, categoria, etiqueta, resumen, descripcion || resumen, imagen, detallesJSON, id]
    );

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    }

    res.json({ ok: true, mensaje: 'Producto actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    res.status(500).json({ ok: false, mensaje: 'Error al actualizar el producto' });
  }
};

// Eliminar producto
export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await db.query('DELETE FROM productos WHERE id = ?', [id]);

    if (resultado.affectedRows === 0) {
      return res.status(404).json({ ok: false, mensaje: 'Producto no encontrado' });
    }

    res.json({ ok: true, mensaje: 'Producto eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar el producto' });
  }
};