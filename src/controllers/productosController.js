export const obtenerProductos = (req, res) => {
  const productos = [
    {
      id: 1,
      nombre: "Parihuela de Durmientes",
      categoria: "Embalajes Industriales",
      descripcion: "Parihuela reforzada para carga pesada y minería."
    },
    {
      id: 2,
      nombre: "Madera Habilitada a Medida",
      categoria: "Dimensionados",
      descripcion: "Corte de alta precisión listo para obra."
    }
  ];

  res.json({
    ok: true,
    data: productos
  });
};