const API_URL = import.meta.env.VITE_API_URL;

// Función para obtener el token de localStorage
const obtenerToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token no encontrado en localStorage");
    window.location.href = "/login";
  }
  return token;
};

// Obtener todos los productos (para administradores)
export const obtenerProductos = async () => {
  try {
    const token = obtenerToken();
    const url = `${API_URL}/producto`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    console.log("Llamada a la API - obtenerProductos", url);

    if (!response.ok) {
      throw new Error("No se pudieron obtener los productos");
    }

    const data = await response.json();
    console.log("Datos obtenidos:", data);
    return data; // Retorna los productos obtenidos
  } catch (error) {
    console.error("Error en obtenerProductos:", error);
    throw new Error(error.message);
  }
};

// Crear un nuevo producto
export const crearProducto = async (productoData, file) => {
  try {
    const token = obtenerToken(); // Obtener el token desde localStorage
    const formData = new FormData();

    // Validar los datos antes de enviarlos (incluyendo descripcion_producto)
    if (
      !productoData.nombre_producto ||
      !productoData.marca_producto ||
      !productoData.precio_producto ||
      !productoData.id_categoria ||
      !productoData.descripcion_producto // Se añade validación para descripcion_producto
    ) {
      throw new Error(
        "El nombre, la marca, el precio, la descripción y la categoría son obligatorios"
      );
    }

    formData.append("nombre_producto", productoData.nombre_producto);
    formData.append("descripcion_producto", productoData.descripcion_producto);
    formData.append("marca_producto", productoData.marca_producto);
    formData.append("precio_producto", productoData.precio_producto);
    formData.append("id_categoria", productoData.id_categoria);

    // Si hay archivo (imagen del producto), agregarlo
    if (file) {
      formData.append("imagen", file);
    }

    const response = await fetch(`${API_URL}/producto`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`, // Token de autenticación
      },
    });

    console.log("Llamada a la API - crearProducto", `${API_URL}/producto`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al crear el producto:", errorData);
      throw new Error(errorData.message || "Error al crear el producto");
    }

    const data = await response.json(); // Respuesta exitosa
    return data;
  } catch (error) {
    console.error("Error en crearProducto:", error);
    throw new Error(error.message);
  }
};

// Editar un producto existente
export const editarProducto = async (id, productoData, file) => {
  try {
    const token = obtenerToken(); // Obtener el token desde localStorage
    const formData = new FormData();

    // Asegurarse de que los datos obligatorios estén presentes
    if (
      !productoData.nombre_producto ||
      !productoData.marca_producto ||
      !productoData.precio_producto ||
      !productoData.id_categoria ||
      !productoData.descripcion_producto // Se añade validación para descripcion_producto
    ) {
      throw new Error(
        "El nombre, la marca, el precio, la descripción y la categoría son obligatorios"
      );
    }

    formData.append("nombre_producto", productoData.nombre_producto);
    formData.append("descripcion_producto", productoData.descripcion_producto);
    formData.append("marca_producto", productoData.marca_producto);
    formData.append("precio_producto", productoData.precio_producto);
    formData.append("id_categoria", productoData.id_categoria);

    // Solo agregamos la imagen si se pasa un archivo
    if (file) {
      formData.append("imagen", file); // Asegúrate de pasar el archivo directamente
    }

    const response = await fetch(`${API_URL}/producto/${id}`, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`, // Token de autenticación
      },
    });

    console.log(
      "Llamada a la API - editarProducto",
      `${API_URL}/producto/${id}`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error al editar el producto:", errorData);
      throw new Error(errorData.message || "Error al editar el producto");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en editarProducto:", error);
    throw new Error(error.message);
  }
};

// Cambiar el estado de un producto
export const cambiarEstadoProducto = async (id, estado) => {
  try {
    // Verifica si el estado es válido
    const estadosValidos = ["activo", "descontinuado"];
    if (!estadosValidos.includes(estado)) {
      throw new Error("Estado inválido");
    }

    const token = obtenerToken();
    const response = await fetch(`${API_URL}/producto/${id}/estado`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ estado: estado }),
    });

    console.log(
      "Llamada a la API - cambiarEstadoProducto",
      `${API_URL}/producto/${id}/estado`
    );

    if (!response.ok) {
      throw new Error("Error al cambiar el estado del producto");
    }

    const data = await response.json();
    return data; // Retorna la respuesta con el producto actualizado
  } catch (error) {
    console.error("Error en cambiarEstadoProducto:", error);
    throw new Error(error.message);
  }
};

// Obtener productos activos (para clientes)
export const obtenerProductosActivos = async () => {
  try {
    const url = `${API_URL}/producto/activos`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });


    if (!response.ok) {
      throw new Error("No se pudieron obtener los productos activos");
    }

    const data = await response.json();
    return data; // Retorna los productos activos
  } catch (error) {
    console.error("Error en obtenerProductosActivos:", error);
    throw new Error(error.message);
  }
};

// Obtener un producto por ID (para administradores o usuarios con permisos)
export const obtenerProductoPorId = async (productoId) => {
  try {
    const url = `${API_URL}/producto/activos/${productoId}`;  // Usamos el ID en la URL

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Llamada a la API - obtenerProductoPorId", url);

    if (!response.ok) {
      throw new Error("No se pudo obtener el producto");
    }

    const data = await response.json();
    return data; // Retorna el producto encontrado
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obtener productos activos por categoría (para clientes)
export const obtenerProductosActivosPorCategoria = async (categoriaId) => {
  try {
    const url = `${API_URL}/producto/activos/categoria/${categoriaId}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data; // Retorna los productos activos filtrados por categoría
  } catch (error) {
    throw new Error(error.message);
  }
};

// Obtener productos activos por marca (para clientes)
export const obtenerProductosActivosPorMarca = async (marca) => {
  try {
    const url = `${API_URL}/producto/activos/marca/${marca}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Llamada a la API - obtenerProductosActivosPorMarca", url);

    if (!response.ok) {
      throw new Error("No se pudieron obtener los productos activos por marca");
    }

    const data = await response.json();
    return data; // Retorna los productos activos filtrados por marca
  } catch (error) {
    console.error("Error en obtenerProductosActivosPorMarca:", error);
    throw new Error(error.message);
  }
};
