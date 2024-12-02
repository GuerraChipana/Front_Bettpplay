// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function BurguerButton() {
    const [clicked, setClicked] = useState(false);

    return (
        <div>
            <Burguer>
                <div
                    className={`icon ${clicked ? 'open' : ''}`}
                    onClick={() => setClicked(!clicked)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </Burguer>
            <Menu className={clicked ? 'open' : ''}>
                <Link to="/" onClick={() => setClicked(false)}>Inicio</Link>
                <Link to="/Nosotros" onClick={() => setClicked(false)}>Nosotros</Link>
                <Link to="/Categorias" onClick={() => setClicked(false)}>Categorias</Link>
                <Link to="#" onClick={() => setClicked(false)}>Contactanos</Link>
            </Menu>
        </div>
    );
}

export default BurguerButton;

const Burguer = styled.div`
    .icon {
        width: 35px;
        height: 30px;
        position: relative;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1001; /* Asegúrate de que el z-index sea mayor que el del slider */
    }

    .icon span {
        background-color: #ffffff;
        border-radius: 10px;
        display: block;
        position: absolute;
        height: 4px;
        width: 100%;
        transition: all 0.3s ease;
    }

    .icon span:nth-child(1) {
        top: 0px;
    }

    .icon span:nth-child(2) {
        top: 12px;
    }

    .icon span:nth-child(3) {
        top: 24px;
    }

    .icon.open span:nth-child(1) {
        transform: rotate(45deg);
        top: 12px;
    }

    .icon.open span:nth-child(2) {
        opacity: 0;
    }

    .icon.open span:nth-child(3) {
        transform: rotate(-45deg);
        top: 12px;
    }

    @media (min-width: 768px) {
        display: none;
    }
`;

const Menu = styled.div`
    display: none;
    background-color: rgb(15, 18, 37);
    position: absolute;
    top: 112.2px; /* Ajusta según sea necesario */
    right: 0;
    width: 250px; /* Ajusta según sea necesario */
    height: 0; 
    overflow: hidden;
    text-align: center; 
    border-radius: 0 0 10px 10px; /* Ajusta el radio del borde */
    display: flex;
    flex-direction: column;
    justify-content: center; 
    transition: height 0.7s ease, background-color 0.7s ease;
    z-index: 1000; /* Asegúrate de que el z-index sea mayor que el del slider */

    &.open {
        display: flex;
        height: 250px; /* Altura expandida */
    }

    a {
        color: #fff;
        padding: 15px; /* Ajusta el padding para mayor comodidad */
        text-decoration: none;
        font-size: 17px;
    }

    a:hover {
        background-color: rgba(255, 255, 255, 0.25); /* Color más claro al pasar el mouse */
    }

    @media (min-width: 768px) {
        display: none;
    }
`;
