import React, { useState } from 'react';
import './carrito.css';

const Carrito = ({ carrito, eliminarDelCarrito, actualizarCantidad, finalizarCompra }) => {
  const [metodoPago, setMetodoPago] = useState('');
  const [compraFinalizada, setCompraFinalizada] = useState(false);
  const [datosPago, setDatosPago] = useState({});
  const [showModal, setShowModal] = useState(false); 
  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    direccion: '',
  });

  const [errorFormulario, setErrorFormulario] = useState('');

  const calcularTotal = () => {
    return carrito.reduce((total, producto) => total + producto.precio_producto * producto.cantidad, 0);
  };

  const handleCantidadChange = (productoId, nuevaCantidad, cantidadDisponible) => {
    if (nuevaCantidad >= 1 && nuevaCantidad <= cantidadDisponible) {
      actualizarCantidad(productoId, nuevaCantidad); 
    } else {
      alert(`La cantidad máxima disponible es ${cantidadDisponible}.`);
    }
  };

  const handleMetodoPagoChange = (event) => {
    setMetodoPago(event.target.value);
  };

  const handleInputChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value,
    });
  };

  const validarFormulario = () => {
    if (!formulario.nombre || !formulario.correo || !formulario.direccion) {
      setErrorFormulario('Por favor completa todos los campos del formulario.');
      return false;
    }
    setErrorFormulario('');
    return true;
  };

  const handleFinalizarCompra = () => {
    if (!metodoPago) {
      alert('Por favor selecciona un método de pago.');
      return;
    }

    if (!validarFormulario()) return;

    const datosDeCompra = {
      metodoPago,
      fecha: new Date().toLocaleString(),
      productos: carrito,
      total: calcularTotal(),
      cliente: formulario,
    };

    setDatosPago(datosDeCompra);
    setCompraFinalizada(true);
    setShowModal(true); 
    finalizarCompra();
  };

  const handleCloseModal = () => {
    setShowModal(false); 
  };

  return (
    <div className="plzvea-carrito-container">
      <h2 className="plzvea-carrito-title">Tu Carrito de Compras</h2>
      {carrito.length === 0 ? (
        <p className="plzvea-carrito-empty-message">No tienes productos en el carrito.</p>
      ) : (
        <>
          {carrito.map((producto) => (
            <div className="plzvea-carrito-item" key={producto.id}>
              <div className="plzvea-carrito-item-info">
                <div className="plzvea-carrito-image">
                  <img src={producto.imagen} alt={producto.nombre_producto} />
                </div>
                <div className="plzvea-carrito-item-details">
                  <h4 className="plzvea-carrito-item-name">{producto.nombre_producto}</h4>
                  <p className="plzvea-carrito-item-price">Precio: S/{producto.precio_producto}</p>
                  <p className="plzvea-carrito-item-total">Total: S/{(producto.precio_producto * producto.cantidad).toFixed(2)}</p>

                  <div className="plzvea-carrito-quantity">
                    <label htmlFor={`cantidad-${producto.id}`}>Cantidad:</label>
                    <input
                      type="number"
                      id={`cantidad-${producto.id}`}
                      value={producto.cantidad}
                      min="1"
                      max={producto.cantidad_producto} 
                      onChange={(e) => handleCantidadChange(producto.id, parseInt(e.target.value), producto.cantidad_producto)}
                    />
                  </div>
                </div>
              </div>
              <button
                className="plzvea-carrito-remove-item-button"
                onClick={() => eliminarDelCarrito(producto.id)}
              >
                Eliminar
              </button>
            </div>
          ))}

          <div className="plzvea-carrito-summary">
            <h3>Resumen de la Compra</h3>
            <p><strong>Total: </strong> S/{calcularTotal().toFixed(2)}</p>

            {!compraFinalizada ? (
              <>
                <div className="plzvea-carrito-payment-method">
                  <h4>Selecciona el Método de Pago:</h4>
                  <select value={metodoPago} onChange={handleMetodoPagoChange}>
                    <option value="">Seleccionar...</option>
                    <option value="tarjeta_credito">Tarjeta de Crédito</option>
                    <option value="tarjeta_debito">Tarjeta de Débito</option>
                    <option value="contra_entrega">Contra Entrega</option>
                  </select>
                </div>

                <div className="plzvea-carrito-customer-form">
                  <h4>Información del Comprador</h4>
                  <form>
                    <div className="plzvea-carrito-form-input">
                      <label htmlFor="nombre">Nombre:</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formulario.nombre}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="plzvea-carrito-form-input">
                      <label htmlFor="correo">Correo:</label>
                      <input
                        type="email"
                        id="correo"
                        name="correo"
                        value={formulario.correo}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="plzvea-carrito-form-input">
                      <label htmlFor="direccion">Dirección:</label>
                      <input
                        type="text"
                        id="direccion"
                        name="direccion"
                        value={formulario.direccion}
                        onChange={handleInputChange}
                      />
                    </div>

                    {errorFormulario && <p className="plzvea-carrito-error-message">{errorFormulario}</p>}

                    <button className="plzvea-carrito-summary-finalize-purchase-button" onClick={handleFinalizarCompra}>
                      Finalizar Compra
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="plzvea-carrito-receipt">
                <h3>Boleta de Compra</h3>
                <p><strong>Fecha: </strong>{datosPago.fecha}</p>
                <p><strong>Método de Pago: </strong>{datosPago.metodoPago}</p>
                <p><strong>Comprador: </strong>{datosPago.cliente.nombre}</p>
                <p><strong>Correo: </strong>{datosPago.cliente.correo}</p>
                <p><strong>Dirección: </strong>{datosPago.cliente.direccion}</p>

                <div className="plzvea-carrito-receipt-products">
                  {datosPago.productos.map((producto) => (
                    <div key={producto.id} className="plzvea-carrito-receipt-product">
                      <div className="plzvea-carrito-receipt-product-details">
                        <img src={producto.imagen} alt={producto.nombre_producto} className="plzvea-carrito-receipt-product-image" />
                        <p>{producto.nombre_producto} x {producto.cantidad} - S/{(producto.precio_producto * producto.cantidad).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p><strong>Total: </strong>S/{datosPago.total.toFixed(2)}</p>
                <p>Gracias por tu compra!</p>
              </div>
            )}
          </div>
        </>
      )}

      {showModal && (
        <div className="plzvea-carrito-modal-overlay">
          <div className="plzvea-carrito-modal-content">
            <h3>Detalles de la Compra</h3>
            <p><strong>Fecha:</strong> {datosPago.fecha}</p>
            <p><strong>Método de Pago:</strong> {datosPago.metodoPago}</p>
            <div className="plzvea-carrito-modal-receipt-products">
              {datosPago.productos.map((producto) => (
                <div key={producto.id} className="plzvea-carrito-modal-receipt-product">
                  <img src={producto.imagen} alt={producto.nombre_producto} className="plzvea-carrito-modal-receipt-image" />
                  <p>{producto.nombre_producto} x {producto.cantidad} - S/{(producto.precio_producto * producto.cantidad).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <p><strong>Total:</strong> S/{datosPago.total.toFixed(2)}</p>
            <button className="plzvea-carrito-close-modal-button" onClick={handleCloseModal}>Cerrar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
