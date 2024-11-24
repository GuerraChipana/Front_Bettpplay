// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';  // Importar Navigate para redirigir

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');  // Verificar si existe el token en el localStorage

  if (!token) {
    // Si no hay token, redirigir al login
    return <Navigate to="/login" />;
  }

  // Si el token existe, renderizar el contenido protegido
  return children;
};

export default PrivateRoute;
