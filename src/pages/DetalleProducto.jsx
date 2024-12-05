import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerProductoPorId } from '../services/producto';
import '../styles/detalleproducto.css';

function DetalleProducto({ agregarAlCarrito }) {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cargarProducto = async () => {
      setLoading(true);
      try {
        const data = await obtenerProductoPorId(id);
        if (data && data.producto) {
          setProducto(data.producto);
        } else {
          setError('Producto no encontrado.');
        }
      } catch (error) {
        setError('No se pudo cargar el producto.');
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, [id]);

  const manejarCambioCantidad = (e) => {
    setCantidad(Math.max(1, e.target.value));  // Prevenir cantidades negativas
  };

  const manejarAñadirCarrito = () => {
    if (producto) {
      const productoConCantidad = { ...producto, cantidad: parseInt(cantidad) };
      agregarAlCarrito(productoConCantidad);
    }
  };

  if (loading) return <div>Cargando...</div>;
  if (error) return <p>{error}</p>;

  return (
    <div className="detalle-producto">
      {producto ? (
        <div className="contenido-producto">
          <div className="imagen">
            <img src={producto.imagen} alt={producto.nombre_producto} />
          </div>
          <div className="informacion">
            <h2>{producto.nombre_producto}</h2>
            <p className="descripcion"><strong>Descripción:</strong> {producto.descripcion_producto}</p>
            <p><strong>Marca:</strong> {producto.marca_producto}</p>
            <p className="precio"><strong>Precio:</strong> S/{producto.precio_producto}</p>
            <p><strong>Cantidad disponible:</strong> {producto.cantidad_producto}</p>

            <div className="cantidad">
              <label htmlFor="cantidad">Cantidad:</label>
              <input
                type="number"
                id="cantidad"
                value={cantidad}
                min="1"
                max={producto.cantidad_producto}
                onChange={manejarCambioCantidad}
              />
            </div>

            <div className="botones">
              <button className="boton" onClick={manejarAñadirCarrito}>Añadir al carrito</button>
            </div>
          </div>
        </div>
      ) : (
        <p>No se encontró el producto.</p>
      )}
    </div>
  );
}

export default DetalleProducto;
