import React, { useEffect, useState } from 'react';
import '../../../styles/dashBienvenida.css';  // Asegúrate de importar el archivo CSS

function DashBienvenida() {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setUserInfo(user);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (!userInfo) {
    return <div className="text-center">Cargando...</div>;
  }

  const renderWelcomeMessage = () => {
    switch (userInfo.rol) {
      case 'superadministrador':
        return (
          <div className="dash-bienvenida-success">
            <p>Como <strong>Super Administrador</strong>, tienes control total sobre el sistema. Puedes gestionar todos los aspectos de la plataforma y supervisar las actividades de otros usuarios.</p>
            <p>¡Aprovecha tus privilegios al máximo!</p>
          </div>
        );
      case 'administrador':
        return (
          <div className="dash-bienvenida-warning">
            <p>Como <strong>Administrador</strong>, puedes gestionar productos, categorías, proveedores y más. Estás encargado de asegurar que todo funcione correctamente.</p>
            <p>¡Disfruta de tus tareas y responsabilidades!</p>
          </div>
        );
      case 'empleado':
        return (
          <div className="dash-bienvenida-info">
            <p>Como <strong>Empleado</strong>, tu rol es apoyar las operaciones diarias. Tienes acceso a ciertas funciones esenciales del sistema.</p>
            <p>¡Gracias por tu arduo trabajo y dedicación!</p>
          </div>
        );
      default:
        return (
          <div className="dash-bienvenida-secondary">
            <p>¡Bienvenido! Tu rol es desconocido, pero esperamos que disfrutes usando el sistema.</p>
          </div>
        );
    }
  };

  return (
    <div className="container dash-bienvenida-container">
      <div className="card dash-bienvenida-card shadow-sm">
        <h2 className="text-center dash-bienvenida-title mb-4">¡Bienvenido(a), {userInfo.usuario}!</h2>
        <p className="text-center dash-bienvenida-role">Tu rol es: <strong>{userInfo.rol}</strong></p>
        <div className="mt-4 dash-bienvenida-message">
          {renderWelcomeMessage()}
        </div>
      </div>
    </div>
  );
}

export default DashBienvenida;
