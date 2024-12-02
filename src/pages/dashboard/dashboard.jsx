import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faTags, faBox, faTruck, faUsers, faSignOutAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../../styles/dashboard.css'; // Asegúrate de que la ruta sea correcta

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className={`dashboard-container ${collapsed ? 'sidebar-collapsed' : ''}`}>
      <div className={`dashboard-sidebar ${collapsed ? 'collapsed' : ''}`}>
        <ul className="dashboard-nav flex-column mb-auto">
          <li className="dashboard-nav-item">
            <Link to="/dashboard/Bienvenida" className="dashboard-nav-link" title="Bienvenida">
              <FontAwesomeIcon icon={faHome} size="lg" />
              {!collapsed && <span className="dashboard-nav-text">Bienvenida</span>}
            </Link>
          </li>
          <li className="dashboard-nav-item">
            <Link to="/dashboard/Categorias" className="dashboard-nav-link" title="Categorías">
              <FontAwesomeIcon icon={faTags} size="lg" />
              {!collapsed && <span className="dashboard-nav-text">Categorías</span>}
            </Link>
          </li>
          <li className="dashboard-nav-item">
            <Link to="/dashboard/Productos" className="dashboard-nav-link" title="Productos">
              <FontAwesomeIcon icon={faBox} size="lg" />
              {!collapsed && <span className="dashboard-nav-text">Productos</span>}
            </Link>
          </li>
          <li className="dashboard-nav-item">
            <Link to="/dashboard/Proveedores" className="dashboard-nav-link" title="Proveedores">
              <FontAwesomeIcon icon={faTruck} size="lg" />
              {!collapsed && <span className="dashboard-nav-text">Proveedores</span>}
            </Link>
          </li>
          <li className="dashboard-nav-item">
            <Link to="/dashboard/Abastecimiento" className="dashboard-nav-link" title="Usuarios">
              <FontAwesomeIcon icon={faUsers} size="lg" />
              {!collapsed && <span className="dashboard-nav-text">Abastecimiento</span>}
            </Link>
          </li>
          <li className="dashboard-nav-item">
            <Link to="/dashboard/Usuarios" className="dashboard-nav-link" title="Usuarios">
              <FontAwesomeIcon icon={faUsers} size="lg" />
              {!collapsed && <span className="dashboard-nav-text">Usuarios</span>}
            </Link>
          </li>
          <li className="dashboard-nav-item">
            <button className="dashboard-nav-link" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
              {!collapsed && <span className="dashboard-nav-text">Salir</span>}
            </button>
          </li>
        </ul>

        {/* Toggle Sidebar */}
        <div className="dashboard-sidebar-toggle" onClick={toggleSidebar}>
          <FontAwesomeIcon icon={collapsed ? faChevronRight : faChevronLeft} size="lg" />
        </div>
      </div>

      {/* Área principal del contenido */}
      <div className="dashboard-content">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
