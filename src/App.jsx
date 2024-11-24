import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminLoginPage from './pages/dashboard/auth/AdminLoginPage';  
import Dashboard from './pages/dashboard/dashboard';  
import Homepage from './pages/Homepage';  
import PrivateRoute from './components/PrivateRoute';  

// Páginas internas del dashboard
import DashBienvenida from './pages/dashboard/sections/dash_Bienvenida';
import DashCategorias from './pages/dashboard/sections/dash_Categorias';
import DashProductos from './pages/dashboard/sections/dash_Productos';
import DashProveedores from './pages/dashboard/sections/dash_Proveedores';
import DashUsuarios from './pages/dashboard/sections/dash_Usuarios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<AdminLoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
          <Route path="Bienvenida" element={<DashBienvenida />} />
          <Route path="Categorias" element={<DashCategorias />} />
          <Route path="Productos" element={<DashProductos />} />
          <Route path="Proveedores" element={<DashProveedores />} />
          <Route path="Usuarios" element={<DashUsuarios />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
