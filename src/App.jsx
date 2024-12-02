import React, { useState } from 'react';
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

function App() {
  // Estado para el carrito
  const [carrito, setCarrito] = useState([]);

  return (
    <Router>
      {/* Pasando el carrito al componente Header */}
      <Header carrito={carrito} />
      <main>
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Homepage />} />
          <Route path="/Nosotros" element={<Nosotros />} />
          <Route path="/Categorias" element={<Categorias />} />
          <Route path="/productos/:categoriaId" element={<Productos />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/producto/:id" element={<DetalleProducto />} />

          {/* Rutas privadas bajo /dashboard */}
          <Route path="/login" element={<AdminLoginPage />} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
            <Route path="Bienvenida" element={<DashBienvenida />} />
            <Route path="Categorias" element={<DashCategorias />} />
            <Route path="Productos" element={<DashProductos />} />
            <Route path="Proveedores" element={<DashProveedores />} />
            <Route path="Abastecimiento" element={<DashAbastecimiento />} />
            <Route path="Usuarios" element={<DashUsuarios />} />
          </Route>
        </Routes>
      </main>
    </Router>
  );
}

export default App;
