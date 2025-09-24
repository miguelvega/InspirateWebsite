import React, { useState, useRef, useEffect } from 'react';
import './Igirl.css';
import { igirlData } from './IgirlData';
import { motion, AnimatePresence } from 'framer-motion';

export const Igirl = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const imageRef = useRef(null);
  const modalContentRef = useRef(null);

  // Abrir modal con la información completa
  const openModal = (item) => {
    setSelectedItem(item);
    setShowModal(true);
    setImageLoaded(false);
    setImageError(false);
    document.body.style.overflow = 'hidden';
  };

  // Cerrar modal
  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      setSelectedItem(null);
      setImageLoaded(false);
      setImageError(false);
    }, 300);
    document.body.style.overflow = 'auto';
  };

  // Manejar carga de imagen
  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight
      });
    }
    setImageLoaded(true);
  };

  // Manejar error de carga de imagen
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  // Cerrar modal con la tecla Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.keyCode === 27) closeModal();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <motion.div 
      className="igirl-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      <header className="igirl-header">
        <div className="igirl-logo">
          <i className="fas fa-female"></i>
        </div>
        <h1>Inspírate Girl 💜👩‍🔬</h1>
        <p>Programa de Inspírate UNI para promover carreras STEM en niñas y jóvenes</p>
      </header>

      <section className="igirl-about">
        <h2>¿Qué es Inspírate Girl?</h2>
        <p>Inspírate Girl es un programa especializado de Inspírate UNI que busca inspirar a niñas, adolescentes y jóvenes mujeres peruanas a seguir carreras STEM (Ciencia, Tecnología, Ingeniería y Matemáticas), rompiendo barreras y estereotipos de género.</p>
        <p>A través de testimonios de egresadas destacadas, talleres prácticos, charlas inspiradoras y actividades vivenciales, promovemos referentes femeninos que motiven la próxima generación de líderes en STEAM.</p>
      </section>

      <div className="igirl-gallery">
        {igirlData.map(item => (
          <motion.div 
            key={item.id}
            className="igirl-item"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={item.portada} alt={item.titulo} className="igirl-image" />
            <div className="igirl-content">
              <h2>{item.titulo}</h2>
              <p>{item.desc}</p>
              <button className="view-more-btn" onClick={() => openModal(item)}>
                Ver más <i className="fas fa-arrow-right"></i>
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal para mostrar información completa */}
      <AnimatePresence>
        {showModal && selectedItem && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              ref={modalContentRef}
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="close-modal" onClick={closeModal}>
                <i className="fas fa-times"></i>
              </button>
              
              <div className="modal-image-container">
                {!imageLoaded && (
                  <div className="image-loading">
                    <i className="fas fa-spinner fa-spin"></i>
                    <p>Cargando imagen...</p>
                  </div>
                )}
                
                {imageError ? (
                  <div className="image-error">
                    <i className="fas fa-exclamation-triangle"></i>
                    <p>Error al cargar la imagen</p>
                  </div>
                ) : (
                  <img 
                    ref={imageRef}
                    src={selectedItem.imagenCompleta || selectedItem.portada} 
                    alt={selectedItem.titulo} 
                    className="modal-full-image"
                    onLoad={handleImageLoad}
                    onError={handleImageError}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                  />
                )}
              </div>
              
              <div className="modal-info">
                <h2>{selectedItem.titulo}</h2>
                <p className="modal-description">{selectedItem.descCompleta || selectedItem.desc}</p>
                
                {selectedItem.detalles && (
                  <div className="modal-details">
                    <h3>Detalles:</h3>
                    <ul>
                      {selectedItem.detalles.map((detalle, index) => (
                        <li key={index}>{detalle}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="igirl-info">
        <h2>Información acerca de Inspirate Girl</h2>
        <ul className="igirl-info-list">
          <li><strong>Público objetivo:</strong> Niñas, adolescentes y jóvenes mujeres (12-25 años)</li>
          <li><strong>Enfoque:</strong> Carreras STEM (Ciencia, Tecnología, Ingeniería, Matemáticas)</li>
          <li><strong>Modalidad:</strong> Presencial y virtual</li>
          <li><strong>Actividades:</strong> Talleres, charlas, mentorías, ferias y competencias</li>
          <li><strong>Objetivo:</strong> Romper estereotipos de género en carreras técnicas</li>
        </ul>
      </section>

      <section className="igirl-cta">
        <h2>¡Únete a la Revolución STEM Femenina!</h2>
        <p>Descubre tu potencial en carreras científicas y tecnológicas. Sé parte del cambio y conviértete en la próxima líder innovadora del Perú.</p>
        <button className="igirl-btn">Quiero participar</button>
      </section>

      <footer className="igirl-footer">
        <div className="igirl-social-links">
          <a href="#" title="Facebook"><i className="fab fa-facebook"></i></a>
          <a href="#" title="Instagram"><i className="fab fa-instagram"></i></a>
          <a href="#" title="TikTok"><i className="fab fa-tiktok"></i></a>
          <a href="#" title="YouTube"><i className="fab fa-youtube"></i></a>
        </div>
        <p>Inspírate Girl - Programa de Inspírate UNI</p>
        <p>"Una joven que inspira, inspira una nación" 💜✨️</p>
      </footer>

    </motion.div>
  );
};