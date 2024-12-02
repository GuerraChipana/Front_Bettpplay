import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerProductoPorId } from '../services/producto'; // Asegúrate de tener esta función
import '../styles/detalleproducto.css';

function DetalleProducto() {
    const { id } = useParams(); // Obtiene el parametro de la URL
    const [producto, setProducto] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarProducto = async () => {
            setLoading(true); // Inicia el loading
            try {
                const data = await obtenerProductoPorId(id); // Realiza la consulta para obtener el producto por id
                if (data && data.producto) { // Verificamos que 'producto' exista en la respuesta
                    setProducto(data.producto); // Guardamos solo el objeto 'producto'
                } else {
                    setError('Producto no encontrado.');
                }
            } catch (error) {
                setError('No se pudo cargar el producto.');
            } finally {
                setLoading(false); // Termina el loading
            }
        };

        cargarProducto();
    }, [id]); // Vuelve a cargar el producto si cambia el id

    if (loading) return <div>Cargando...</div>; // Muestra mensaje de carga
    if (error) return <p>{error}</p>; // Muestra mensaje de error

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
                        <p className="precio"><strong>Precio:</strong> ${producto.precio_producto}</p>
                        <p><strong>Cantidad disponible:</strong> {producto.cantidad_producto}</p>
                        <div className="botones">
                            <button className="boton">Añadir al carrito</button>
                            <button className="boton">Comprar ahora</button>
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
