const API_URL = import.meta.env.VITE_API_URL;

// Función para obtener el token de localStorage
const obtenerToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token no encontrado en localStorage");
    window.location.href = "/login"; // Redirigir a la página de login si no hay token
  }
  return token;
};

export const listarAbastecimientos = async () => {
  try {
    const token = obtenerToken(); // Obtener el token del localStorage
    const url = `${API_URL}/abas/listar`; // Usar la ruta pública para clientes

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // Solo agregar el header de Authorization si hay token
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los abastecimientos");
    }

    const data = await response.json();
    return data; // Regresar los datos obtenidos
  } catch (error) {
    console.error("Error en listarAbastecimientos:", error);
    throw error; // Propagar el error para ser manejado por el componente que llama esta función
  }
};

export const registrarAbastecimiento = async (abastecimientoData) => {
  try {
    const token = obtenerToken(); // Obtener el token del localStorage
    const url = `${API_URL}/abas/abastecer`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(abastecimientoData), // Enviar los datos en el cuerpo de la solicitud
    });

    if (!response.ok) {
      throw new Error("Error al registrar el abastecimiento");
    }

    const data = await response.json();
    return data; // Regresar los datos obtenidos
  } catch (error) {
    console.error("Error en registrarAbastecimiento:", error);
    throw error; // Propagar el error
  }
};

export const obtenerCategoriasActivas = async () => {
  try {
    const token = obtenerToken(); // Obtener el token del localStorage
    const url = `${API_URL}/abas/categorias/activas`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las categorías activas");
    }

    const data = await response.json();
    return data; // Regresar las categorías obtenidas
  } catch (error) {
    console.error("Error en obtenerCategoriasActivas:", error);
    throw error; // Propagar el error
  }
};

export const obtenerProveedoresPorCategoria = async (idCategoria) => {
  try {
    const token = obtenerToken(); // Obtener el token del localStorage
    const url = `${API_URL}/abas/proveedores/categoria/${idCategoria}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los proveedores por categoría");
    }

    const data = await response.json();
    return data; // Regresar los proveedores obtenidos
  } catch (error) {
    console.error("Error en obtenerProveedoresPorCategoria:", error);
    throw error; // Propagar el error
  }
};

export const obtenerProductosPorCategoria = async (idCategoria) => {
  try {
    const token = obtenerToken(); // Obtener el token del localStorage
    const url = `${API_URL}/abas/productos/categoria/${idCategoria}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener los productos por categoría");
    }

    const data = await response.json();
    return data; // Regresar los productos obtenidos
  } catch (error) {
    console.error("Error en obtenerProductosPorCategoria:", error);
    throw error; // Propagar el error
  }
};
