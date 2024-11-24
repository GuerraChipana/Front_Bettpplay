const API_URL = import.meta.env.VITE_API_URL;

// Servicio de inicio de sesión
export const loginService = async (usuario, contraseña) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usuario,
        contraseña_usuario: contraseña,
      }),
    });

    if (!response.ok) {
      throw new Error("Credenciales inválidas o error en el servidor");
    }

    const data = await response.json();
    return data; // Retorna el token y cualquier otro dato que necesites
  } catch (error) {
    throw new Error(error.message);
  }
};
