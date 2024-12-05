import React, { useState, useEffect } from "react";
import { obtenerProductos, crearProducto, editarProducto, cambiarEstadoProducto } from '../../../services/producto';
import { obtenerCategorias } from '../../../services/categoria';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import '../../../styles/DashProductos.css';

function DashProductos() {
  const [productos, setProductos] = useState([]);
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre_producto: "",
    descripcion_producto: "",
    marca_producto: "",
    precio_producto: "",
    id_categoria: "",
  });
  const [archivoImagen, setArchivoImagen] = useState(null);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create');

  const [filtroNombre, setFiltroNombre] = useState('');
  const [filtroMarca, setFiltroMarca] = useState('');

  useEffect(() => {
    cargarProductosYCategorias();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [filtroNombre, filtroMarca, productos]);

  const cargarProductosYCategorias = async () => {
    try {
      const productosData = await obtenerProductos();
      setProductos(productosData);
      setProductosFiltrados(productosData);

      const categoriasData = await obtenerCategorias();
      setCategorias(categoriasData);

      const marcasUnicas = [...new Set(productosData.map((producto) => producto.marca_producto))];
      setMarcas(marcasUnicas);
    } catch (error) {
      console.error("Error al obtener productos y categorías:", error);
      setError("Error al obtener productos y categorías");
    }
  };

  const aplicarFiltros = () => {
    let productosFiltrados = productos;

    if (filtroNombre) {
      productosFiltrados = productosFiltrados.filter((producto) =>
        producto.nombre_producto.toLowerCase().includes(filtroNombre.toLowerCase())
      );
    }

    if (filtroMarca) {
      productosFiltrados = productosFiltrados.filter((producto) =>
        producto.marca_producto.toLowerCase().includes(filtroMarca.toLowerCase())
      );
    }

    setProductosFiltrados(productosFiltrados);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoProducto((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setArchivoImagen(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (modoEdicion && productoEditando) {
        await editarProducto(productoEditando.id, nuevoProducto, archivoImagen);
        setProductos((prev) =>
          prev.map((producto) =>
            producto.id === productoEditando.id ? { ...producto, ...nuevoProducto } : producto
          )
        );
        setModoEdicion(false);
      } else {
        const productoCreado = await crearProducto(nuevoProducto, archivoImagen);
        setProductos((prev) => [...prev, productoCreado]);
      }

      resetForm();
      cargarProductosYCategorias();
    } catch (error) {
      console.error("Error al procesar el producto:", error);
      setError(error.message || "Error al procesar el producto");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setNuevoProducto({
      nombre_producto: "",
      descripcion_producto: "",
      marca_producto: "",
      precio_producto: "",
      id_categoria: "",
    });
    setArchivoImagen(null);
    setModalOpen(false);
  };

  const handleEditar = (producto) => {
    setModoEdicion(true);
    setProductoEditando(producto);
    setNuevoProducto({
      nombre_producto: producto.nombre_producto,
      descripcion_producto: producto.descripcion_producto,
      marca_producto: producto.marca_producto,
      precio_producto: producto.precio_producto,
      id_categoria: producto.id_categoria,
    });
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleCrear = () => {
    setModalMode('create');
    setModoEdicion(false);
    setProductoEditando(null);
    resetForm();
    setModalOpen(true);
  };

  const handleCambiarEstado = async (producto) => {
    try {
      const nuevoEstado = obtenerNuevoEstado(producto.estado_producto);
      const productoActualizado = await cambiarEstadoProducto(producto.id, nuevoEstado);
      setProductos((prev) =>
        prev.map((p) => (p.id === producto.id ? productoActualizado : p))
      );
      cargarProductosYCategorias();
    } catch (error) {
      console.error("Error al cambiar el estado del producto:", error);
      setError("Error al cambiar el estado del producto");
    }
  };

  const obtenerNuevoEstado = (estado) => {
    if (estado === "agotado") {
      return "activo";
    } else if (estado === "activo") {
      return "descontinuado";
    } else if (estado === "descontinuado") {
      return "activo";
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setError("");
  };

  return (
    <div className="container dash-productos">
      <h1 className="my-">Gestión de Productos</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar por nombre"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
          className="filtro-input"
        />
        <Form.Control
          as="select"
          value={filtroMarca}
          onChange={(e) => setFiltroMarca(e.target.value)}
          className="ms-2 filtro-select"
        >
          <option value="">Seleccionar marca</option>
          {marcas.map((marca) => (
            <option key={marca} value={marca}>
              {marca}
            </option>
          ))}
        </Form.Control>
      </div>

      <Button variant="success" onClick={handleCrear} className="btn-crear">
        Crear Nuevo Producto
      </Button>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <td>ID</td>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Detalle</th>
              <th>Marca</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.id}>
                <td>{producto.id}</td>
                <td>
                  <img
                    src={producto.imagen}
                    alt={producto.nombre_producto}
                    width={50}
                    height={50}
                  />
                </td>
                <td>{producto.nombre_producto}</td>
                <td>{producto.descripcion_producto}</td>
                <td>{producto.marca_producto}</td>
                <td>{producto.cantidad_producto}</td>
                <td>{producto.precio_producto}</td>
                <td>
                  {categorias.find(
                    (categoria) => categoria.id === producto.id_categoria
                  )?.nombre_categoria}
                </td>
                <td>{producto.estado_producto}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEditar(producto)}
                  >
                    Editar
                  </button>
                  <button
                    className="btn btn-info btn-sm"
                    onClick={() => handleCambiarEstado(producto)}
                  >
                    {producto.estado_producto === "activo"
                      ? "Descontinuar"
                      : producto.estado_producto === "descontinuado"
                        ? "Activar"
                        : "Activar"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'create' ? 'Crear Producto' : 'Editar Producto'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre_producto">
              <Form.Label>Nombre del Producto</Form.Label>
              <Form.Control
                type="text"
                name="nombre_producto"
                value={nuevoProducto.nombre_producto}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="descripcion_producto">
              <Form.Label>Descripción del Producto</Form.Label>
              <Form.Control
                type="text"
                name="descripcion_producto"
                value={nuevoProducto.descripcion_producto}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="marca_producto">
              <Form.Label>Marca del Producto</Form.Label>
              <Form.Control
                type="text"
                name="marca_producto"
                value={nuevoProducto.marca_producto}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="precio_producto">
              <Form.Label>Precio del Producto</Form.Label>
              <Form.Control
                type="number"
                name="precio_producto"
                value={nuevoProducto.precio_producto}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="id_categoria">
              <Form.Label>Categoría</Form.Label>
              <Form.Control
                as="select"
                name="id_categoria"
                value={nuevoProducto.id_categoria}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar categoría</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nombre_categoria}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="imagen_producto">
              <Form.Label>Imagen del Producto</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar Producto'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default DashProductos;
