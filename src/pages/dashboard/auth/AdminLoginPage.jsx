import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../../services/authService';
import '../../../styles/dashLogin.css';

const AdminLoginPage = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!usuario || !contraseña) {
            setError('Por favor, completa todos los campos. ');
            return;
        }
        try {
            const response = await loginService(usuario, contraseña);

            const user = {
                id: response.id,
                usuario: response.usuario,
                rol: response.rol,
            };

            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', response.token);

            navigate('/dashboard/Bienvenida');
        } catch (error) {
            setError(error.message || 'Hubo un error en el login');
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-form-container">
                <h2 className="admin-login-title">Iniciar sesión como administrador</h2>
                {error && <p className="error-message">{error}</p>}
                <form onSubmit={handleSubmit} className="admin-login-form">
                    <div className="input-group">
                        <label className="input-label">Usuario</label>
                        <input
                            type="text"
                            value={usuario}
                            onChange={(e) => setUsuario(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>

                    <div className="input-group">
                        <label className="input-label">Contraseña</label>
                        <input
                            type="password"
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>

                    <button type="submit" className="submit-button">Iniciar sesión</button>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginPage;
