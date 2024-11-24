import React, { useState, useEffect } from "react";
import { agregarProveedorService, editarProveedorService, cambiarEstadoProveedorService, listarProveedoresService } from '../../../services/provedores.js';
import { obtenerCategorias } from '../../../services/categoria.js';  // Importamos la función de categorías
import { Modal, Button, Form, Toast } from 'react-bootstrap';

function DashProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [categoriasSeleccionadas, setCategoriasSeleccionadas] = useState([]);
  const [estado, setEstado] = useState("activo");
  const [error, setError] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [proveedorEditar, setProveedorEditar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Cargar proveedores y categorías al iniciar
  useEffect(() => {
    if (token) {
      listarProveedores();
      cargarCategorias();  // Cargar las categorías desde la API
    } else {
      window.location.href = "/login";
    }
  }, [token]);

  const listarProveedores = async () => {
    try {
      const data = await listarProveedoresService(token);
      setProveedores(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const cargarCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      setCategorias(data);  // Asumimos que la API retorna un array de categorías
    } catch (err) {
      setError(err.message);
    }
  };

  const agregarProveedor = async (e) => {
    e.preventDefault();

    const nuevoProveedor = {
      nombre_proveedor: nombre,
      telefono_proveedor: telefono,
      email_proveedor: email,
      direccion_proveedor: direccion,
      categorias: categoriasSeleccionadas,  // Pasamos las categorías seleccionadas
      id_user_creacion: 1,
    };

    try {
      const response = await agregarProveedorService(nuevoProveedor, token);
      setProveedores([...proveedores, response.proveedor]);
      mostrarToast('Proveedor agregado exitosamente', 'success');
      resetFormulario();
      setShowModal(false);
    } catch (err) {
      setError(err.message);
      mostrarToast('Error al agregar proveedor', 'error');
    }
  };

  const editarProveedor = async (id, e) => {
    e.preventDefault();

    const proveedorEditado = {
      nombre_proveedor: nombre,
      telefono_proveedor: telefono,
      email_proveedor: email,
      direccion_proveedor: direccion,
      categorias: categoriasSeleccionadas,  // Nuevas categorías a asociar al proveedor
    };

    try {
      const response = await editarProveedorService(id, proveedorEditado, token);
      setProveedores(proveedores.map((p) => (p.id === id ? response.proveedor : p)));
      mostrarToast('Proveedor editado exitosamente', 'success');
      setProveedorEditar(null);
      setShowModal(false);
    } catch (err) {
      setError(err.message);
      mostrarToast('Error al editar proveedor', 'error');
    }
  };

  const cambiarEstadoProveedor = async (id, estado) => {
    try {
      const response = await cambiarEstadoProveedorService(id, estado, token);
      setProveedores(proveedores.map((p) => (p.id === id ? response.proveedor : p)));
      mostrarToast(`Estado del proveedor cambiado a ${estado}`, 'success');
    } catch (err) {
      setError(err.message);
      mostrarToast('Error al cambiar estado del proveedor', 'error');
    }
  };

  const mostrarToast = (mensaje, tipo) => {
    setToastMessage(mensaje);
    setToastType(tipo);
    setShowToast(true);
  };

  const resetFormulario = () => {
    setNombre("");
    setTelefono("");
    setEmail("");
    setDireccion("");
    setCategoriasSeleccionadas([]);
    setEstado("activo");
  };

  const handleEditForm = (proveedor) => {
    setProveedorEditar(proveedor);
    setNombre(proveedor.nombre_proveedor);
    setTelefono(proveedor.telefono_proveedor);
    setEmail(proveedor.email_proveedor);
    setDireccion(proveedor.direccion_proveedor);
    setCategoriasSeleccionadas(proveedor.categorias || []);  // Asignar las categorías seleccionadas al editar
    setEstado(proveedor.estado_proveedor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setProveedorEditar(null);
    setShowModal(false);
    resetFormulario();
  };

  return (
    <div>
      <h2>Dashboard de Proveedores</h2>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Agregar Proveedor
      </Button>

      {/* Modal para agregar y editar proveedores */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{proveedorEditar ? 'Editar Proveedor' : 'Agregar Proveedor'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={proveedorEditar ? (e) => editarProveedor(proveedorEditar.id, e) : agregarProveedor}>
            <Form.Group controlId="formNombre">
              <Form.Label>Nombre del Proveedor</Form.Label>
              <Form.Control
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Nombre del proveedor"
                required
              />
            </Form.Group>

            <Form.Group controlId="formTelefono">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Teléfono del proveedor"
                required
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email del proveedor"
                required
              />
            </Form.Group>

            <Form.Group controlId="formDireccion">
              <Form.Label>Dirección</Form.Label>
              <Form.Control
                type="text"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Dirección del proveedor"
                required
              />
            </Form.Group>

            {/* Campo para seleccionar las categorías */}
            <Form.Group controlId="formCategorias">
              <Form.Label>Categorías</Form.Label>
              <Form.Control
                as="select"
                multiple
                value={categoriasSeleccionadas}
                onChange={(e) => setCategoriasSeleccionadas(Array.from(e.target.selectedOptions, option => option.value))}
              >
                {categorias.map((categoria) => (
                  <option key={categoria.ID} value={categoria.ID}>
                    {categoria.NOMBRE_CATEGORIA} {/* Asumimos que la API retorna 'nombre' y 'id' */}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              {proveedorEditar ? 'Editar Proveedor' : 'Agregar Proveedor'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Lista de proveedores en tabla */}
      <h3>Lista de Proveedores</h3>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id}>
              <td>{proveedor.nombre_proveedor}</td>
              <td>{proveedor.telefono_proveedor}</td>
              <td>{proveedor.email_proveedor}</td>
              <td>{proveedor.direccion_proveedor}</td>
              <td>{proveedor.estado_proveedor}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditForm(proveedor)}>Editar</Button>
                <Button
                  variant={proveedor.estado_proveedor === 'activo' ? 'danger' : 'success'}
                  onClick={() => cambiarEstadoProveedor(proveedor.id, proveedor.estado_proveedor === 'activo' ? 'inactivo' : 'activo')}
                >
                  {proveedor.estado_proveedor === 'activo' ? 'Desactivar' : 'Activar'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Toast para mostrar mensajes */}
      <Toast show={showToast} onClose={() => setShowToast(false)} bg={toastType === 'error' ? 'danger' : 'success'} delay={3000} autohide>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
}

export default DashProveedores;
