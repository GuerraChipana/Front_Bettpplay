const API_URL = import.meta.env.VITE_API_URL;

// Obtener todas las categorías
export const obtenerCategorias = async () => {
  try {
    const url = `${API_URL}/categoria/client`; // Usar la ruta pública para clientes

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Llamada a la API - obtenerCategorias", url);

    if (!response.ok) {
      throw new Error("No se pudieron obtener las categorías");
    }

    const data = await response.json();
    return data; // Retorna las categorías obtenidas
  } catch (error) {
    throw new Error(error.message);
  }
};
