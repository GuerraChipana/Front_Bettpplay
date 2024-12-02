import React, { useState, useEffect } from 'react';
import {
    obtenerCategoriasActivas,
    listarAbastecimientos,
    obtenerProveedoresPorCategoria,
    obtenerProductosPorCategoria,
    registrarAbastecimiento
} from '../../../services/abastecimiento';
import '../../../styles/dashAbastecimineto.css'

function DashAbastecimiento() {
    const [categorias, setCategorias] = useState([]);
    const [proveedores, setProveedores] = useState([]);
    const [productos, setProductos] = useState([]);
    const [marcas, setMarcas] = useState([]);
    const [selectedCategoria, setSelectedCategoria] = useState('');
    const [selectedProveedor, setSelectedProveedor] = useState('');
    const [selectedMarca, setSelectedMarca] = useState('');
    const [selectedProducto, setSelectedProducto] = useState('');
    const [cantidad, setCantidad] = useState(0);
    const [precioUnitario, setPrecioUnitario] = useState(0);
    const [abastecimientos, setAbastecimientos] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const categoriasData = await obtenerCategoriasActivas();
                setCategorias(categoriasData);
            } catch (error) {
                console.error('Error al obtener categorías:', error);
            }
        };

        fetchCategorias();
    }, []);

    useEffect(() => {
        const fetchAbastecimientos = async () => {
            try {
                const abastecimientosData = await listarAbastecimientos();
                setAbastecimientos(abastecimientosData);
            } catch (error) {
                console.error('Error al obtener abastecimientos:', error);
            }
        };

        fetchAbastecimientos();
    }, []);

    const handleCategoriaChange = async (event) => {
        const categoriaId = event.target.value;
        setSelectedCategoria(categoriaId);

        try {
            const proveedoresData = await obtenerProveedoresPorCategoria(categoriaId);
            setProveedores(proveedoresData);
            setProductos([]);
            setMarcas([]);
            setSelectedProveedor('');
            setSelectedMarca('');
            setSelectedProducto('');
            setCantidad(0);
            setPrecioUnitario(0);
        } catch (error) {
            console.error('Error al obtener proveedores:', error);
        }
    };

    const handleProveedorChange = async (event) => {
        const proveedorId = event.target.value;
        setSelectedProveedor(proveedorId);

        try {
            const productosData = await obtenerProductosPorCategoria(selectedCategoria, proveedorId);
            setProductos(productosData);

            const marcasData = [...new Set(productosData.map((producto) => producto.marca_producto))];
            setMarcas(marcasData);

            setSelectedProducto('');
            setCantidad(0);
            setPrecioUnitario(0);
        } catch (error) {
            console.error('Error al obtener productos:', error);
        }
    };

    const handleMarcaChange = (event) => {
        const marca = event.target.value;
        setSelectedMarca(marca);

        const productosFiltrados = productos.filter((producto) => producto.marca_producto === marca);
        setProductos(productosFiltrados);

        setSelectedProducto('');
        setCantidad(0);
        setPrecioUnitario(0);
    };

    const handleProductoChange = (event) => {
        const productoId = event.target.value;
        setSelectedProducto(productoId);

        const productoSeleccionado = productos.find((producto) => producto.id === productoId);
        if (productoSeleccionado) {
            setPrecioUnitario(productoSeleccionado.precio_unitario);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const abastecimientoData = {
            id_proveedor: parseInt(selectedProveedor),
            id_categoria: parseInt(selectedCategoria),
            marca_producto: selectedMarca,
            id_producto: parseInt(selectedProducto),
            cantidad: parseInt(cantidad),
            precio_unitario: parseFloat(precioUnitario)
        };

        try {
            const response = await registrarAbastecimiento(abastecimientoData);

            setAbastecimientos((prevAbastecimientos) => [...prevAbastecimientos, response]);

            setSelectedCategoria('');
            setSelectedProveedor('');
            setSelectedMarca('');
            setSelectedProducto('');
            setCantidad(0);
            setPrecioUnitario(0);

            alert('Abastecimiento registrado correctamente');
        } catch (error) {
            console.error('Error al registrar abastecimiento:', error);
            alert('Hubo un error al registrar el abastecimiento');
        }
    };

    return (
        <div className="dash-abastecimiento-container">
            <h2 className="dash-abastecimiento-title">Registrar Abastecimiento</h2>
            <form className="dash-abastecimiento-form" onSubmit={handleSubmit}>
                {/* Categoría */}
                <div className="dash-abastecimiento-form-group">
                    <label htmlFor="categoria">Categoría:</label>
                    <select
                        id="categoria"
                        value={selectedCategoria}
                        onChange={handleCategoriaChange}
                        required
                    >
                        <option value="">Selecciona una categoría</option>
                        {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                                {categoria.nombre_categoria}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Proveedor */}
                <div className="dash-abastecimiento-form-group">
                    <label htmlFor="proveedor">Proveedor:</label>
                    <select
                        id="proveedor"
                        value={selectedProveedor}
                        onChange={handleProveedorChange}
                        required
                        disabled={!selectedCategoria}
                    >
                        <option value="">Selecciona un proveedor</option>
                        {proveedores.map((proveedor) => (
                            <option key={proveedor.id} value={proveedor.id}>
                                {proveedor.nombre_proveedor}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Marca */}
                <div className="dash-abastecimiento-form-group">
                    <label htmlFor="marca">Marca:</label>
                    <select
                        id="marca"
                        value={selectedMarca}
                        onChange={handleMarcaChange}
                        required
                        disabled={!selectedProveedor}
                    >
                        <option value="">Selecciona una marca</option>
                        {marcas.map((marca) => (
                            <option key={marca} value={marca}>
                                {marca}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Producto */}
                <div className="dash-abastecimiento-form-group">
                    <label htmlFor="producto">Producto:</label>
                    <select
                        id="producto"
                        value={selectedProducto}
                        onChange={handleProductoChange}
                        required
                        disabled={!selectedMarca}
                    >
                        <option value="">Selecciona un producto</option>
                        {productos
                            .filter((producto) => producto.marca_producto === selectedMarca)
                            .map((producto) => (
                                <option key={producto.id} value={producto.id}>
                                    {producto.nombre_producto} - {producto.marca_producto}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Cantidad */}
                <div className="dash-abastecimiento-form-group">
                    <label htmlFor="cantidad">Cantidad:</label>
                    <input
                        type="number"
                        id="cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                        min="1"
                    />
                </div>

                {/* Precio Unitario */}
                <div className="dash-abastecimiento-form-group">
                    <label htmlFor="precio_unitario">Precio unitario:</label>
                    <input
                        type="number"
                        id="precio_unitario"
                        value={precioUnitario}
                        onChange={(e) => setPrecioUnitario(e.target.value)}
                        required
                        step="0.01"
                    />
                </div>

                <button type="submit" className="dash-abastecimiento-button">Registrar Abastecimiento</button>
            </form>

            <h2 className="dash-abastecimiento-subtitle">Abastecimientos Registrados</h2>
            {/* Tabla de abastecimientos */}
            <table className="dash-abastecimiento-table">
                <thead>
                    <tr>
                        <th>Proveedor</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unitario</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {abastecimientos.map((abastecimiento) => (
                        <tr key={abastecimiento.id_abastecimiento}>
                            <td>{abastecimiento.nombre_proveedor}</td>
                            <td>{abastecimiento.nombre_producto}</td>
                            <td>{abastecimiento.cantidad}</td>
                            <td>{abastecimiento.precio_unitario}</td>
                            <td>{(abastecimiento.cantidad * abastecimiento.precio_unitario).toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default DashAbastecimiento;
