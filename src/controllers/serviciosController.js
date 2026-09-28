import db from '../config/db.js';

// Obtener servicios
export const obtenerServicios = async (req, res) => {
  try {
    const [filas] = await db.query('SELECT * FROM servicios ORDER BY id DESC');
    const formateados = filas.map(s => ({
      ...s,
      caracteristicas: typeof s.caracteristicas === 'string' ? JSON.parse(s.caracteristicas) : s.caracteristicas
    }));
    res.json({ ok: true, data: formateados });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al consultar servicios' });
  }
};

// Crear servicio
export const crearServicio = async (req, res) => {
  try {
    const { titulo, resumen, descripcion, imagen, caracteristicas } = req.body;
    const jsonCaract = JSON.stringify(caracteristicas || []);

    const [resultado] = await db.query(
      `INSERT INTO servicios (titulo, resumen, descripcion, imagen, caracteristicas) VALUES (?, ?, ?, ?, ?)`,
      [titulo, resumen, descripcion || resumen, imagen, jsonCaract]
    );

    res.status(201).json({ ok: true, mensaje: 'Servicio creado exitosamente', id: resultado.insertId });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al guardar el servicio' });
  }
};

// Actualizar servicio
export const actualizarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, resumen, descripcion, imagen, caracteristicas } = req.body;
    const jsonCaract = JSON.stringify(caracteristicas || []);

    const [resultado] = await db.query(
      `UPDATE servicios SET titulo = ?, resumen = ?, descripcion = ?, imagen = ?, caracteristicas = ? WHERE id = ?`,
      [titulo, resumen, descripcion || resumen, imagen, jsonCaract, id]
    );

    if (resultado.affectedRows === 0) return res.status(404).json({ ok: false, mensaje: 'Servicio no encontrado' });

    res.json({ ok: true, mensaje: 'Servicio actualizado' });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al actualizar servicio' });
  }
};

// Eliminar servicio
export const eliminarServicio = async (req, res) => {
  try {
    const { id } = req.params;
    const [resultado] = await db.query('DELETE FROM servicios WHERE id = ?', [id]);

    if (resultado.affectedRows === 0) return res.status(404).json({ ok: false, mensaje: 'Servicio no encontrado' });

    res.json({ ok: true, mensaje: 'Servicio eliminado' });
  } catch (error) {
    res.status(500).json({ ok: false, mensaje: 'Error al eliminar servicio' });
  }
};