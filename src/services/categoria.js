const API_URL = import.meta.env.VITE_API_URL;

// Función para obtener el token de localStorage
const obtenerToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token no encontrado en localStorage");
    // Redirigir a la página de login si no hay token
    window.location.href = "/login"; // O el path de login que tengas
  }
  return token;
};

// Obtener todas las categorías
export const obtenerCategorias = async () => {
  try {
    const token = obtenerToken(); // Obtener el token del localStorage
    const url = token ? `${API_URL}/categoria` : `${API_URL}/categoria/client`; // Usar la ruta pública para clientes

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}), // Solo agregar el header de Authorization si hay token
      },
    });

    console.log("Llamada a la API - obtenerCategorias", url);

    if (!response.ok) {
      throw new Error("No se pudieron obtener las categorías");
    }

    const data = await response.json();
    console.log("Datos obtenidos:", data);
    return data; // Retorna las categorías obtenidas
  } catch (error) {
    console.error("Error en obtenerCategorias:", error);
    throw new Error(error.message);
  }
};

// Buscar categorías por nombre
export const buscarCategoriasPorNombre = async (nombre) => {
  try {
    const token = obtenerToken();
    const url = token
      ? `${API_URL}/categoria/nom/${nombre}`
      : `${API_URL}/categoria/client/${nombre}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    console.log("Llamada a la API - buscarCategoriasPorNombre", url);

    if (!response.ok) {
      throw new Error("Error al buscar las categorías");
    }

    const data = await response.json();
    return data; // Retorna las categorías que coinciden con el nombre
  } catch (error) {
    console.error("Error en buscarCategoriasPorNombre:", error);
    throw new Error(error.message);
  }
};

// Crear una nueva categoría
export const crearCategoria = async (categoriaData, file) => {
  try {
    const token = obtenerToken(); // Obtener el token desde localStorage
    const formData = new FormData();

    // Aseguramos que los datos obligatorios estén presentes
    if (!categoriaData.nombre_categoria || !categoriaData.detalle_categoria) {
      throw new Error(
        "El nombre y el detalle de la categoría son obligatorios"
      );
    }

    formData.append("nombre_categoria", categoriaData.nombre_categoria);
    formData.append("detalle_categoria", categoriaData.detalle_categoria);

    // Si hay imagen, la agregamos
    if (file) {
      formData.append("imagen", file); // Agregar imagen si se proporcionó
    }

    const response = await fetch(`${API_URL}/categoria`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`, // Token de autenticación
      },
    });

    console.log("Llamada a la API - crearCategoria", `${API_URL}/categoria`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al crear la categoría:", errorData);
      throw new Error(errorData.message || "Error al crear la categoría");
    }

    const data = await response.json(); // Respuesta exitosa
    return data;
  } catch (error) {
    console.error("Error en crearCategoria:", error);
    throw new Error(error.message);
  }
};

// Editar una categoría existente
export const editarCategoria = async (id, categoriaData, file) => {
  try {
    const token = obtenerToken(); // Obtener el token desde localStorage
    const formData = new FormData();

    // Aseguramos que los datos obligatorios estén presentes
    if (!categoriaData.nombre_categoria || !categoriaData.detalle_categoria) {
      throw new Error(
        "El nombre y el detalle de la categoría son obligatorios"
      );
    }

    // Solo agregamos los datos si están presentes
    if (categoriaData.nombre_categoria) {
      formData.append("nombre_categoria", categoriaData.nombre_categoria);
    }
    if (categoriaData.detalle_categoria) {
      formData.append("detalle_categoria", categoriaData.detalle_categoria);
    }

    // Solo agregamos la imagen si se pasa un archivo
    if (file) {
      formData.append("imagen", file); // Asegúrate de pasar el archivo directamente
    }

    console.log("FormData antes de enviar esto es servicio :", formData);

    const response = await fetch(`${API_URL}/categoria/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`, // Token de autenticación
      },
    });

    console.log(
      "Llamada a la API - editarCategoria",
      `${API_URL}/categoria/${id}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al editar la categoría:", errorData);
      throw new Error(errorData.message || "Error al editar la categoría");
    }

    // Respuesta exitosa
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en editarCategoria:", error.message);
    throw new Error(error.message);
  }
};

// Cambiar el estado de una categoría
export const cambiarEstadoCategoria = async (id, estado) => {
  try {
    const token = obtenerToken(); // Obtener el token del localStorage
    const response = await fetch(`${API_URL}/categoria/${id}/estado`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Añadir el token al header
      },
      body: JSON.stringify({ estado_categoria: estado }),
    });

    console.log(
      "Llamada a la API - cambiarEstadoCategoria",
      `${API_URL}/categoria/${id}/estado`
    );

    if (!response.ok) {
      throw new Error("Error al cambiar el estado de la categoría");
    }

    const data = await response.json();
    return data; // Retorna el mensaje con la categoría actualizada
  } catch (error) {
    console.error("Error en cambiarEstadoCategoria:", error);
    throw new Error(error.message);
  }
};
