import React, { useState, useEffect } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLoginPage from './pages/dashboard/auth/AdminLoginPage';
import Dashboard from './pages/dashboard/dashboard';
import Homepage from './pages/Homepage';
import PrivateRoute from './components/PrivateRoute';
import Header from './components/Header';

// Páginas internas del dashboard
import DashBienvenida from './pages/dashboard/sections/dash_Bienvenida';
import DashCategorias from './pages/dashboard/sections/dash_Categorias';
import DashProductos from './pages/dashboard/sections/dash_Productos';
import DashProveedores from './pages/dashboard/sections/dash_Proveedores';
import DashUsuarios from './pages/dashboard/sections/dash_Usuarios';
import DashAbastecimiento from './pages/dashboard/sections/dash_Abastecimiento';
import Nosotros from './pages/Nosotros';
import Categorias from './pages/Categorias';
import Productos from './pages/Productos';
import DetalleProducto from './pages/DetalleProducto.jsx';
import Carrito from './pages/Carrito';

function App() {
  const [carrito, setCarrito] = useState([]);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
    if (carritoGuardado) {
      setCarrito(carritoGuardado);
    }
  }, []);

  // Funciones para manejar el carrito
  const eliminarDelCarrito = (productoId) => {
    const nuevoCarrito = carrito.filter((producto) => producto.id !== productoId);
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const actualizarCantidad = (productoId, nuevaCantidad) => {
    const nuevoCarrito = carrito.map((producto) =>
      producto.id === productoId ? { ...producto, cantidad: parseInt(nuevaCantidad) } : producto
    );
    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const agregarAlCarrito = (producto) => {
    const nuevoCarrito = [...carrito];
    const productoExistente = nuevoCarrito.find((item) => item.id === producto.id);

    if (productoExistente) {
      productoExistente.cantidad += producto.cantidad;
    } else {
      nuevoCarrito.push(producto);
    }

    setCarrito(nuevoCarrito);
    localStorage.setItem('carrito', JSON.stringify(nuevoCarrito));
  };

  const finalizarCompra = () => {
    setCarrito([]);
    localStorage.removeItem('carrito');
    alert('¡Gracias por tu compra!');
  };

  return (
    <Router>
      {/* Condicional para mostrar el Header solo si no estamos en las rutas de administración o dashboard */}
      <Routes>
        {/* Rutas públicas */}
        <Route path="/" element={<><Header carrito={carrito} /><Homepage /></>} />
        <Route path="/Nosotros" element={<><Header carrito={carrito} /><Nosotros /></>} />
        <Route path="/Categorias" element={<><Header carrito={carrito} /><Categorias /></>} />
        <Route path="/productos/:categoriaId" element={<><Header carrito={carrito} /><Productos /></>} />
        <Route path="/producto/:id" element={<><Header carrito={carrito} /><DetalleProducto agregarAlCarrito={agregarAlCarrito} /></>} />
        <Route path="/productos" element={<><Header carrito={carrito} /><Productos agregarAlCarrito={agregarAlCarrito} /></>} />
        <Route path="/carrito"
          element={<><Header carrito={carrito} /><Carrito carrito={carrito} eliminarDelCarrito={eliminarDelCarrito} actualizarCantidad={actualizarCantidad} finalizarCompra={finalizarCompra} /></>}
        />

        {/* Rutas privadas bajo /dashboard, sin Header */}
        <Route path="/administracion" element={<AdminLoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="Bienvenida" element={<DashBienvenida />} />
          <Route path="Categorias" element={<DashCategorias />} />
          <Route path="Productos" element={<DashProductos />} />
          <Route path="Proveedores" element={<DashProveedores />} />
          <Route path="Abastecimiento" element={<DashAbastecimiento />} />
          <Route path="Usuarios" element={<DashUsuarios />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
