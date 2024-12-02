import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { obtenerProductosActivos, obtenerProductosActivosPorCategoria, obtenerProductosActivosPorMarca } from '../services/producto';
import '../styles/productos.css';
import { Link } from 'react-router-dom';

function Productos() {
    const { categoriaId } = useParams();
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [marcaSeleccionada, setMarcaSeleccionada] = useState('');
    const [marcasDisponibles, setMarcasDisponibles] = useState([]);

    useEffect(() => {
        const cargarProductos = async () => {
            setLoading(true);
            try {
                let data;
                if (categoriaId) {
                    data = await obtenerProductosActivosPorCategoria(categoriaId);
                } else if (marcaSeleccionada) {
                    data = await obtenerProductosActivosPorMarca(marcaSeleccionada);
                } else {
                    data = await obtenerProductosActivos();
                }

                setProductos(data);
                const marcas = [...new Set(data.map((producto) => producto.marca_producto))];
                setMarcasDisponibles(marcas);
            } catch (error) {
                setError('No se pudieron cargar los productos.');
            } finally {
                setLoading(false);
            }
        };

        cargarProductos();
    }, [categoriaId, marcaSeleccionada]);

    return (
        <div className="productos-container">
            <div className="productos-contenido">
                {/* Filtros */}
                <div className="filtros">
                    <h3>Filtrar por Marca</h3>
                    <select
                        className="filtro"
                        value={marcaSeleccionada}
                        onChange={(e) => setMarcaSeleccionada(e.target.value)}
                    >
                        <option value="">Seleccionar Marca</option>
                        {marcasDisponibles.map((marca) => (
                            <option key={marca} value={marca}>
                                {marca}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Mensajes de carga y error */}
                {loading && <div className="loading">Cargando...</div>}
                {error && <p className="error">{error}</p>}

                {/* Productos */}
                <div className="productos-grid">
                    {productos.length === 0 ? (
                        <div className="producto-placeholder">No hay productos disponibles</div>
                    ) : (
                        productos.map((producto) => (
                            <div key={producto.id} className="producto-card">
                                <div className="producto-image">
                                    <img
                                        src={producto.imagen}
                                        alt={producto.nombre_producto}
                                        className="producto-img"
                                    />
                                </div>
                                <div className="producto-info">
                                    <h4 className="producto-name">{producto.nombre_producto}</h4>
                                    <p className="producto-marca">{producto.marca_producto}</p>
                                    <p className="producto-precio">S/ {producto.precio_producto}</p>
                                    <Link to={`/producto/${producto.id}`} className="btn btn-primary">Ver más</Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Productos;
