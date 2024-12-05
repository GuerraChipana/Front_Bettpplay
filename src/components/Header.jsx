/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Importamos el icono de carrito
import BurguerButton from './BurguerButton';
import { Link } from 'react-router-dom';

const Header = ({ carrito }) => {
    return (
        <>
            <HeaderContainer>
                <div className="logo">
                    <Link to="/">
                        <img
                            src="src/assets/img/logo_DFEEC.png"
                            alt="Logo"
                            width="80"
                            height="80"
                        />
                    </Link>
                </div>

                <nav className="nav">
                    <Link to="/">Inicio</Link>
                    <Link to="/Nosotros">Nosotros</Link>
                    <Link to="/Categorias">Categorías</Link>
                    <Link to="/productos">Productos</Link>
                </nav>
                <div className="cart-icon">
                    <Link to="/carrito">
                        <FontAwesomeIcon icon={faShoppingCart} size="lg" />
                        {carrito.length > 0 && (
                            <span className="cart-count">{carrito.length}</span>
                        )}
                    </Link>
                </div>

                <div className="burguer">
                    <BurguerButton />
                </div>
            </HeaderContainer>

            <MainContent />
        </>
    );
};

export default Header;

const HeaderContainer = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: rgb(15, 18, 37);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    
    .logo {
        flex-shrink: 0;
    }

    .logo a img {
        display: block;
    }

    .nav {
        display: flex;
        gap: 1rem;
    }

    .nav a {
        color: white;
        text-decoration: none;
        font-weight: 500;
    }

    .nav a:hover {
        text-decoration: underline;
    }

    .user-action {
        display: flex;
        align-items: center;
        color: white;
    }

    .user-action a {
        color: white;
        text-decoration: none;
        margin-left: 10px;
        font-weight: 500;
    }

    .user-action a:hover {
        text-decoration: underline;
    }

    .cart-icon {
        position: relative;
        color: white;
        margin-right: 20px;
    }

    .cart-icon .cart-count {
        position: absolute;
        top: -10px;
        right: -10px;
        background-color: red;
        color: white;
        border-radius: 50%;
        padding: 5px;
        font-size: 0.8rem;
    }

    .burguer {
        display: none;
    }

    @media (max-width: 768px) {
        .nav {
            display: none;
        }

        .burguer {
            display: block;
        }
    }
`;

const MainContent = styled.main`
    padding-top: 100px;
`;
