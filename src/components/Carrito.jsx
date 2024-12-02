import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from 'styled-components'; // Asegúrate de importar styled-components

const Carrito = () => {
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        // Cargar los productos del carrito desde localStorage
        const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
        setCarrito(carritoGuardado);
    }, []);

    return (
        <CarritoContainer>
            <h1>Carrito de Compras</h1>
            {carrito.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <ul>
                    {carrito.map((producto, index) => (
                        <li key={index}>
                            <div>
                                <img src={producto.imagen || 'default-image.jpg'} alt={producto.nombre} width="50" />
                                <h3>{producto.nombre}</h3>
                            </div>
                            <span>${producto.precio}</span>
                        </li>
                    ))}
                </ul>
            )}
            <Link to="/Productos">Continuar comprando</Link> {/* Puedes ajustar el enlace a donde quieras */}
        </CarritoContainer>
    );
};

export default Carrito;

const CarritoContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }

  li img {
    margin-right: 10px;
  }

  li h3 {
    margin: 0;
  }

  a {
    display: inline-block;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #3498db;
    color: white;
    text-decoration: none;
    border-radius: 4px;
  }

  a:hover {
    background-color: #2980b9;
  }
`;
