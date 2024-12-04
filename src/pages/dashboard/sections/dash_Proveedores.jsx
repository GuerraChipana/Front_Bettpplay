import React, { useState, useEffect } from "react";
import {
  cambiarEstadoProveedorService,
  listarProveedoresService,
  agregarProveedorService,
  editarProveedorService,
} from "../../../services/provedores.js";
import { obtenerCategorias } from "../../../services/categoria";
import { Toast, Button, Modal } from "react-bootstrap";
import '../../../styles/dashProveedores.css'

function DashProveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [formData, setFormData] = useState({
    nombre_proveedor: "",
    telefono_proveedor: "",
    email_proveedor: "",
    direccion_proveedor: "",
    categorias: [],
  });
  const [editingProviderId, setEditingProviderId] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (token) {
      listarProveedores();
      loadCategorias();
    } else {
      window.location.href = "/login";
    }
  }, [token]);

  const loadCategorias = async () => {
    try {
      const data = await obtenerCategorias();
      console.log('cateforias :',data)
      setCategorias(data);
    } catch (error) {
      setToastMessage("Error al cargar las categorías");
      setToastType("error");
      setShowToast(true);
    }
  };

  const listarProveedores = async () => {
    try {
      const data = await listarProveedoresService(token);
      setProveedores(data);
    } catch (error) {
      setToastMessage("Error al cargar los proveedores");
      setToastType("error");
      setShowToast(true);
    }
  };

  const cambiarEstadoProveedor = async (id, estado) => {
    try {
      await cambiarEstadoProveedorService(id, estado, token);
      setProveedores((prevProveedores) =>
        prevProveedores.map((p) =>
          p.id === id ? { ...p, estado_proveedor: estado } : p
        )
      );
      setToastMessage(`Estado del proveedor cambiado a ${estado}`);
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      setToastMessage("Error al cambiar estado del proveedor");
      setToastType("error");
      setShowToast(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, selectedOptions } = e.target;

    if (type === "select-multiple") {
      const selectedValues = Array.from(selectedOptions).map((option) => option.value);
      setFormData((prevState) => ({
        ...prevState,
        [name]: selectedValues,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingProviderId) {
        await editarProveedorService(editingProviderId, formData, token);
        setToastMessage("Proveedor editado con éxito");
      } else {
        await agregarProveedorService(formData, token);
        setToastMessage("Proveedor agregado con éxito");
      }
      setToastType("success");
      setShowToast(true);

      setFormData({
        nombre_proveedor: "",
        telefono_proveedor: "",
        email_proveedor: "",
        direccion_proveedor: "",
        categorias: [],
      });
      setEditingProviderId(null);
      setShowModal(false);

      listarProveedores();
    } catch (error) {
      setToastMessage(error.message || "Error al procesar la solicitud");
      setToastType("error");
      setShowToast(true);
    }
  };

  const handleEdit = (proveedor) => {
    setEditingProviderId(proveedor.id);
    setFormData({
      nombre_proveedor: proveedor.nombre_proveedor,
      telefono_proveedor: proveedor.telefono_proveedor,
      email_proveedor: proveedor.email_proveedor,
      direccion_proveedor: proveedor.direccion_proveedor,
      categorias: proveedor.categorias ? proveedor.categorias.map((cat) => cat.id) : [],
    });
    setShowModal(true);
  };

  return (
    <div className="dash-proveedores-container">
      <h2 className="page-title">Dashboard de Proveedores</h2>
      <Button onClick={() => setShowModal(true)} className="btn-crear mb-3">Agregar Proveedor</Button>

      <h3 className="section-title">Lista de Proveedores</h3>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Dirección</th>
              <th>Categorías</th>
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
                <td>{proveedor.categorias ? proveedor.categorias.map((categoria) => categoria.nombre_categoria).join(", ") : "No tiene categorías"}</td>
                <td>{proveedor.estado_proveedor}</td>
                <td>
                  <Button
                    variant={proveedor.estado_proveedor === "activo" ? "danger" : "success"}
                    onClick={() =>
                      cambiarEstadoProveedor(proveedor.id, proveedor.estado_proveedor === "activo" ? "inactivo" : "activo")
                    }
                    className="btn btn-info btn-sm"  // Reduce the size of the button
                  >
                    {proveedor.estado_proveedor === "activo" ? "Desactivar" : "Activar"}
                  </Button>

                  <Button
                    variant="warning"  // A more subtle color for editing
                    onClick={() => handleEdit(proveedor)}
                    className="btn btn-warning btn-sm"  // Smaller size for the button
                  >
                    Editar
                  </Button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editingProviderId ? "Editar Proveedor" : "Agregar Proveedor"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre_proveedor"
                value={formData.nombre_proveedor}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                name="telefono_proveedor"
                value={formData.telefono_proveedor}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email_proveedor"
                value={formData.email_proveedor}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Dirección</label>
              <input
                type="text"
                name="direccion_proveedor"
                value={formData.direccion_proveedor}
                onChange={handleInputChange}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Categorías</label>
              <select
                multiple
                name="categorias"
                value={formData.categorias}
                onChange={handleInputChange}
                className="form-control"
              >
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.NOMBRE_CATEGORIA}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">
              {editingProviderId ? "Guardar Cambios" : "Agregar Proveedor"}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        bg={toastType === "success" ? "success" : "danger"}
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
}

export default DashProveedores;
