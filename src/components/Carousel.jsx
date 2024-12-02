import React, { useState } from 'react';
import '../styles/carusel.css';  // Asegúrate de incluir los estilos del carrusel

const Carousel = () => {
  const images = [
    '/public/elefcctricos.png', // Cambia estos con las imágenes que necesites
    '/public/caa2.png',
    '/public/caa.jpg'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <img src={images[currentIndex]} alt={`carousel-img-${currentIndex}`} className="carousel-image" />
      </div>
      <button className="carousel-btn prev" onClick={goToPrevious}>
        &lt;
      </button>
      <button className="carousel-btn next" onClick={goToNext}>
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
