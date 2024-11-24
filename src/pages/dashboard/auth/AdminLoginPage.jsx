import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../../services/authService';

const AdminLoginPage = () => {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validaciones simples de los campos
        if (!usuario || !contraseña) {
            setError('Por favor, completa todos los campos.');
            return;
        }
        try {
            const response = await loginService(usuario, contraseña);

            // Guardar los datos del usuario en localStorage
            const user = {
                id: response.id,
                usuario: response.usuario,
                rol: response.rol,
            };

            localStorage.setItem('user', JSON.stringify(user));  // Guarda el objeto 'user'
            localStorage.setItem('token', response.token);  // Guarda el token

            // Redirigir al dashboard
            navigate('/dashboard/Bienvenida');
        } catch (error) {
            setError(error.message || 'Hubo un error en el login');
        }
    };

    return (
        <div>
            <h2>Iniciar sesión como administrador</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <div>
                    <label>Usuario</label>
                    <input
                        type="text"
                        value={usuario}
                        onChange={(e) => setUsuario(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Contraseña</label>
                    <input
                        type="password"
                        value={contraseña}
                        onChange={(e) => setContraseña(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Iniciar sesión</button>
            </form>
        </div>
    );
};

export default AdminLoginPage;
