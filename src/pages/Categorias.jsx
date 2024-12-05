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
        <div className="categorias-container-plaza">
            <h2 className="categorias-header-plaza">Explora nuestras Categorías</h2>

            {loading && <div className="loading-plaza">Cargando...</div>}
            {error && <p className="error-plaza">{error}</p>}

            <div className="categorias-grid-plaza">
                {categorias.length > 0 ? (
                    categorias.map((categoria) => (
                        <div className="categoria-card-plaza" key={categoria.id}>
                            <div className="categoria-image-plaza">
                                {categoria.imagen_categoria ? (
                                    <img
                                        src={categoria.imagen_categoria}
                                        alt={categoria.nombre_categoria}
                                        className="categoria-img-plaza"
                                    />
                                ) : (
                                    <div className="categoria-placeholder-plaza">
                                        <i className="fas fa-box-open"></i>
                                    </div>
                                )}
                            </div>
                            <div className="categoria-info-plaza">
                                <h3 className="categoria-name-plaza">{categoria.nombre_categoria}</h3>
                                <p className="categoria-detail-plaza">{categoria.detalle_categoria}</p>
                                <Link to={`/productos/${categoria.id}`} className="categoria-link-plaza">
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
