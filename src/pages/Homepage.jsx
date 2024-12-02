import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import Carousel from '../components/Carousel';

const Homepage = () => {
  return (
    <div className="homepage-container">
      {/* Sección de Carousel */}
      <Carousel />

      {/* Sección Conócenos */}
      <section id="homepage-conocenos" className="homepage-about">
        <div className="homepage-about-container">
          <h2 className="homepage-about-title">Conócenos</h2>
          <p className="homepage-about-text">
            Bienvenidos al Centro Comercial Futurista, un lugar donde la tecnología, la moda y el entretenimiento convergen.
            Ofrecemos una experiencia de compras única, con una amplia variedad de tiendas, restaurantes innovadores y actividades interactivas que te sorprenderán.
          </p>
        </div>

        <div className="homepage-about-content">
          {/* Tarjetas informativas */}
          <div className="homepage-info-cards">
            <div className="homepage-info-card">
              <i className="fas fa-store-alt"></i>
              <p>Tienda <br />Futurista</p>
            </div>
            <div className="homepage-info-card">
              <i className="fas fa-utensils"></i>
              <p>Gastronomía <br />Innovadora</p>
            </div>
            <div className="homepage-info-card">
              <i className="fas fa-cogs"></i>
              <p>Experiencias <br />Interactivas</p>
            </div>
          </div>

          {/* Imagen del centro comercial */}
          <div className="homepage-image-container">
            <img src="/public/image.png" alt="Centro Comercial Futurista" />
          </div>
        </div>
      </section>

      {/* Sección Categorías de Productos */}
      <section id="homepage-productos" className="homepage-specialties">
        <h2 className="homepage-specialties-title">Explora nuestras categorías</h2>
        <div className="homepage-specialty-container">
          <Link to="#" className="homepage-specialty">
            <img src="/public/img/images.jpeg" alt="Electrónica" />
            <i className="fas fa-tv icon"></i>
            <div className="homepage-text-content">
              <h4>Electrónica de Última Generación</h4>
              <p>Descubre gadgets, dispositivos inteligentes y tecnología avanzada para tu hogar y oficina.</p>
            </div>
          </Link>
          <Link to="#" className="homepage-specialty">
            <img src="/public/img/8886_1_736993.jpg" alt="Moda" />
            <i className="fas fa-tshirt icon"></i>
            <div className="homepage-text-content">
              <h4>Moda Innovadora</h4>
              <p>Encuentra las últimas tendencias en ropa futurista para todos los gustos.</p>
            </div>
          </Link>
          <Link to="#" className="homepage-specialty">
            <img src="/public/img/casa.jpeg" alt="Gastronomía" />
            <i className="fas fa-pizza-slice icon"></i>
            <div className="homepage-text-content">
              <h4>Artefacos para el hogas</h4>
              <p>Encuentra todo lo que necesites para remodelar tu sala.</p>
            </div>
          </Link>
          <Link to="#" className="homepage-specialty">
            <img src="/public/img/aaaa.jpeg" alt="Entretenimiento" />
            <i className="fas fa-gamepad icon"></i>
            <div className="homepage-text-content">
              <h4>Entretenimiento y Deportes</h4>
              <p>Todo lo que necesitas para disfrutar de tu tiempo libre y mejorar tu rendimiento deportivo.</p>
            </div>
          </Link>
        </div>

        {/* Enlace a más categorías */}
        <nav className="homepage-more-specialties">
          <Link to="/categorias">
            <p>Ver más áreas especializadas <i className="fas fa-arrow-right"></i></p>
          </Link>
        </nav>
      </section>

      {/* Sección de Contacto o Redes Sociales */}
      <section id="homepage-contacto" className="homepage-contact">
        <h2 className="homepage-contact-title">Conéctate con nosotros</h2>
        <p className="homepage-contact-text">
          Síguenos en nuestras redes sociales para estar al tanto de las últimas novedades, eventos y promociones.
        </p>
        <div className="homepage-social-links">
          <Link to="#" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </Link>
          <Link to="#" className="social-icon">
            <i className="fab fa-twitter"></i>
          </Link>
          <Link to="#" className="social-icon">
            <i className="fab fa-instagram"></i>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
