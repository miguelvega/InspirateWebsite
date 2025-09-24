import React, { useState, useRef, useEffect } from 'react';
import './OpenDay.css';
import { openDayData } from './OpenDayData';
import { motion, AnimatePresence } from 'framer-motion';

export const OpenDay = () => {
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
      className="open-day-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      <header className="open-day-header">
        <div className="open-day-logo">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <h1>Open Day Inspírate UNI</h1>
        <p>Vive la experiencia universitaria y descubre tu vocación</p>
      </header>

      <section className="open-day-about">
        <h2>¿Qué es el Open Day de Inspírate UNI?</h2>
        <p>El Open Day de Inspírate UNI es un evento organizado por la Universidad Nacional de Ingeniería (UNI) en Lima, Perú, dirigido a estudiantes de 4.º y 5.º de secundaria. Su objetivo principal es ofrecerles una experiencia directa de la vida universitaria, permitiéndoles conocer de cerca las diversas carreras y programas académicos que ofrece la UNI.</p>
        <p>Durante este evento, los participantes tienen la oportunidad de recorrer los campus y laboratorios, interactuar con docentes y estudiantes actuales, participar en talleres prácticos y obtener información sobre procesos de admisión y becas.</p>
      </section>

      <div className="open-day-gallery">
        {openDayData.map(item => (
          <motion.div 
            key={item.id}
            className="open-day-item"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img src={item.portada} alt={item.titulo} className="open-day-image" />
            <div className="open-day-content">
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

      <section className="open-day-info">
        <h2>Información Importante</h2>
        <ul className="open-day-info-list">
          <li><strong>Dirigido a:</strong> Estudiantes de 4.º y 5.º de secundaria y publico en general</li>
          <li><strong>Fecha:</strong> Por definir (sigue nuestras redes para más información)</li>
          <li><strong>Lugar:</strong> Campus de la Universidad Nacional de Ingeniería, Lima</li>
          <li><strong>Inscripciones:</strong> Gratuitas con previo registro</li>
        </ul>
      </section>

      <section className="open-day-cta">
        <h2>¡No te pierdas esta oportunidad!</h2>
        <p>Descubre si la UNI es la opción ideal para tu futuro profesional. Regístrate ahora para recibir más información sobre el próximo Open Day.</p>
        <button className="open-day-btn">Quiero más información</button>
      </section>

    </motion.div>
  );
};