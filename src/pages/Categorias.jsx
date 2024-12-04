import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { obtenerCategorias } from '../services/cliente';
import '../styles/categoria.css';

function Categorias() {
    const [categorias, setCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const cargarCategorias = async () => {
            try {
                const data = await obtenerCategorias();
                setCategorias(data);
            } catch (error) {
                setError("No se pudieron cargar las categorías.");
            } finally {
                setLoading(false);
            }
        };

        cargarCategorias();
    }, []);

    return (
        <div className="categorias-container">
            <h2 className="categorias-header">Explora nuestras Categorías</h2>

            {loading && <div className="loading">Cargando...</div>}
            {error && <p className="error">{error}</p>}

            <div className="categorias-grid">
                {categorias.length > 0 ? (
                    categorias.map((categoria) => (
                        <div className="categoria-card" key={categoria.ID}>
                            <div className="categoria-image">
                                {categoria.imagen_categoria ? (
                                    <img
                                        src={categoria.imagen_categoria}
                                        alt={categoria.nombre_categoria}
                                        className="categoria-img"
                                    />
                                ) : (
                                    <div className="categoria-placeholder">
                                        <i className="fas fa-box-open"></i>
                                    </div>
                                )}
                            </div>
                            <div className="categoria-info">
                                <h3 className="categoria-name">{categoria.nombre_categoria}</h3>
                                <p className="categoria-detail">{categoria.detalle_categoria}</p>
                                <Link to={`/productos/${categoria.ID}`} className="categoria-link">
                                    Ver productos
                                </Link>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay categorías disponibles en este momento.</p>
                )}
            </div>
        </div>
    );
}

export default Categorias;
