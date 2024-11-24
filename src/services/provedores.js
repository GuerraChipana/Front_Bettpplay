const API_URL = import.meta.env.VITE_API_URL;

// Servicio para agregar un proveedor
export const agregarProveedorService = async (proveedorData, token) => {
  try {
    const response = await fetch(`${API_URL}/proveedor/agregar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Enviar el token de autenticación
      },
      body: JSON.stringify(proveedorData),
    });

    if (!response.ok) {
      throw new Error("Error al agregar proveedor");
    }

    const data = await response.json();
    return data; // Retorna el mensaje de éxito y el ID del proveedor
  } catch (error) {
    throw new Error(error.message || "Error desconocido");
  }
};

// Servicio para editar un proveedor
export const editarProveedorService = async (id, proveedorData, token) => {
  try {
    const response = await fetch(`${API_URL}/proveedor/edit/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Enviar el token de autenticación
      },
      body: JSON.stringify(proveedorData),
    });

    if (!response.ok) {
      throw new Error("Error al editar proveedor");
    }

    const data = await response.json();
    return data; // Retorna el mensaje de éxito y el proveedor editado
  } catch (error) {
    throw new Error(error.message || "Error desconocido");
  }
};

// Servicio para cambiar el estado de un proveedor
export const cambiarEstadoProveedorService = async (id, estado, token) => {
  try {
    const response = await fetch(`${API_URL}/proveedor/estado/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Enviar el token de autenticación
      },
      body: JSON.stringify({ estado_proveedor: estado }),
    });

    if (!response.ok) {
      throw new Error("Error al cambiar estado del proveedor");
    }

    const data = await response.json();
    return data; // Retorna el mensaje de éxito y el proveedor con el estado cambiado
  } catch (error) {
    throw new Error(error.message || "Error desconocido");
  }
};

// Servicio para listar proveedores
export const listarProveedoresService = async (token) => {
  try {
    const response = await fetch(`${API_URL}/proveedor/listar`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`, // Enviar el token de autenticación
      },
    });

    if (!response.ok) {
      throw new Error("Error al listar proveedores");
    }

    const data = await response.json();
    return data; // Retorna la lista de proveedores
  } catch (error) {
    throw new Error(error.message || "Error desconocido");
  }
};
