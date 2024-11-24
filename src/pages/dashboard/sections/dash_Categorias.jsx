import React, { useState, useEffect } from 'react';
import { obtenerCategorias, buscarCategoriasPorNombre, cambiarEstadoCategoria, crearCategoria, editarCategoria } from '../../../services/categoria';
import { Modal, Button, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import '../../../styles/dashCategoria.css';

const DashCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // Modo de modal: crear o editar
  const [currentCategory, setCurrentCategory] = useState(null); // Categoría en edición
  const [formData, setFormData] = useState({ nombre_categoria: '', detalle_categoria: '', imagen: null });

  // Cargar todas las categorías
  const obtenerTodasCategorias = async () => {
    setLoading(true);
    try {
      const categorias = await obtenerCategorias();
      setCategorias(categorias);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Buscar categorías por nombre
  const buscarCategorias = async () => {
    setLoading(true);
    try {
      const categorias = search ? await buscarCategoriasPorNombre(search) : await obtenerCategorias();
      setCategorias(categorias);
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Cambiar estado de categoría
  const handleCambiarEstado = async (id, estado) => {
    try {
      await cambiarEstadoCategoria(id, estado);
      setCategorias(categorias.map(categoria =>
        categoria.ID === id ? { ...categoria, ESTADO_CATEGORIA: estado } : categoria
      ));
      showSuccessMessage('Estado actualizado con éxito');
    } catch (error) {
      showErrorMessage(error.message);
    }
  };

  // Mostrar mensaje de éxito
  const showSuccessMessage = (message) => {
    Swal.fire({
      icon: 'success',
      title: 'Éxito',
      text: message,
      confirmButtonText: 'OK',
      background: '#fff',
      iconColor: '#28a745',
    });
  };

  // Mostrar mensaje de error
  const showErrorMessage = (message) => {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'Cerrar',
      background: '#fff',
      iconColor: '#e74c3c',
    });
  };

  // Abrir modal para crear o editar categoría
  const openModal = (categoria = null) => {
    setModalMode(categoria ? 'edit' : 'create');
    setCurrentCategory(categoria);
    setFormData({
      nombre_categoria: categoria ? categoria.NOMBRE_CATEGORIA : '',
      detalle_categoria: categoria ? categoria.DETALLE_CATEGORIA : '',
      imagen: null,
    });
    setModalOpen(true);
  };

  // Manejar cambios en el formulario
  const handleInputChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = ({ target: { files } }) => {
    setFormData(prev => ({ ...prev, imagen: files[0] }));
  };

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { nombre_categoria, detalle_categoria, imagen } = formData;

    if (!nombre_categoria || !detalle_categoria) {
      showErrorMessage('El nombre y el detalle son obligatorios');
      return;
    }

    setLoading(true);
    try {
      if (modalMode === 'create') {
        await crearCategoria(formData, imagen);
        showSuccessMessage('Categoría creada correctamente');
      } else {
        await editarCategoria(currentCategory.ID, formData, imagen);
        showSuccessMessage('Categoría actualizada correctamente');
      }
      obtenerTodasCategorias();
      closeModal();
    } catch (error) {
      showErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    obtenerTodasCategorias();
  }, []);

  return (
    <div className="dash-categorias-container">
      <h1>Categorías</h1>
      {message && <p className="message">{message}</p>}

      <div className="actions">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por nombre"
        />
        <button onClick={buscarCategorias} className="btn btn-outline-primary btn-sm">Buscar</button>
        <button onClick={() => openModal()} className="btn btn-primary btn-sm">Crear Nueva Categoría</button>
      </div>

      {loading ? (
        <p>Cargando...</p>
      ) : categorias.length === 0 ? (
        <p>No se encontraron categorías.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Detalle</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map(categoria => (
              <tr key={categoria.ID}>
                <td>{categoria.ID}</td>
                <td><img src={categoria.IMAGEN_CATEGORIA} alt={categoria.NOMBRE_CATEGORIA} /></td>
                <td>{categoria.NOMBRE_CATEGORIA}</td>
                <td>{categoria.DETALLE_CATEGORIA}</td>
                <td>{categoria.ESTADO_CATEGORIA}</td>
                <td>
                  <button onClick={() => openModal(categoria)} className="btn btn-warning btn-sm">Editar</button>
                  <button onClick={() => handleCambiarEstado(categoria.ID, categoria.ESTADO_CATEGORIA === 'activo' ? 'descontinuado' : 'activo')} className="btn btn-info btn-sm">
                    {categoria.ESTADO_CATEGORIA === 'activo' ? 'Descontinuar' : 'Activar'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      <Modal show={modalOpen} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalMode === 'create' ? 'Crear Categoría' : 'Editar Categoría'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nombre_categoria">
              <Form.Label>Nombre de la categoría</Form.Label>
              <Form.Control
                type="text"
                name="nombre_categoria"
                value={formData.nombre_categoria}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="detalle_categoria">
              <Form.Label>Detalle de la categoría</Form.Label>
              <Form.Control
                type="text"
                name="detalle_categoria"
                value={formData.detalle_categoria}
                onChange={handleInputChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="imagen">
              <Form.Label>Imagen de la categoría</Form.Label>
              <Form.Control
                type="file"
                name="imagen"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="btn-sm">
              {modalMode === 'create' ? 'Crear Categoría' : 'Actualizar Categoría'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default DashCategorias;
