import React, { useState } from 'react'
import './Eventos.css'
import { eventosData } from './EventosData'
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

export const Eventos = () => {  
  const [activeFilter, setActiveFilter] = useState('todos');
  const [selectedEvento, setSelectedEvento] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const TabContent = styled(motion.div)`
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  `;

  const filteredEvents = activeFilter === 'todos' 
    ? eventosData 
    : eventosData.filter(event => event.categoria === activeFilter);

  const openModal = (evento) => {
    setSelectedEvento(evento);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden'; // Bloquear scroll del body
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvento(null);
    document.body.style.overflow = 'auto'; // Restaurar scroll del body
  };

  return (
    <>
      <TabContent
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="eventos-header">
          <h1>¿Qué actividades esperar de nosotros?</h1>
          <p>Como organización estudiantil dedicada a las orientaciones vocacionales, nos enfocamos en brindar experiencias significativas que ayuden a los estudiantes a descubrir su camino profesional.</p>
          
          <div className="filters">
            <button 
              className={activeFilter === 'todos' ? 'active' : ''} 
              onClick={() => setActiveFilter('todos')}
            >
              Todos
            </button>
            <button 
              className={activeFilter === 'presencial' ? 'active' : ''} 
              onClick={() => setActiveFilter('presencial')}
            >
              Presenciales
            </button>
            <button 
              className={activeFilter === 'charlas' ? 'active' : ''} 
              onClick={() => setActiveFilter('charlas')}
            >
              Charlas
            </button>
            <button 
              className={activeFilter === 'programa' ? 'active' : ''} 
              onClick={() => setActiveFilter('programa')}
            >
              Programas
            </button>
          </div>
        </div>

        <div className="eventos-grid">
          {filteredEvents.map((item) => (
            <motion.div 
              key={item.id} 
              className="evento-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="evento-card-inner">
                <div className="evento-image">
                  <img src={item.portada} alt={item.titulo} />
                  <div className="evento-badge">{item.categoria}</div>
                  {item.fecha && <div className="evento-fecha">{item.fecha}</div>}
                </div>
                <div className="evento-content">
                  <h3>{item.titulo}</h3>
                  <p>{item.desc}</p>
                  <button 
                    className="evento-cta"
                    onClick={() => openModal(item)}
                  >
                    Ver detalles →
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </TabContent>

      {/* Modal Popup */}
      <AnimatePresence>
        {isModalOpen && selectedEvento && (
          <motion.div 
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeModal}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              
              <div className="modal-image">
                <img src={selectedEvento.portada} alt={selectedEvento.titulo} />
              </div>
              
              <div className="modal-body">
                <div className="modal-header">
                  <span className="modal-badge">{selectedEvento.categoria}</span>
                  {selectedEvento.fecha && <span className="modal-date">{selectedEvento.fecha}</span>}
                </div>
                
                <h2>{selectedEvento.titulo}</h2>
                <p className="modal-description">{selectedEvento.desc}</p>
                
                <div className="modal-details">
                  <h3>Detalles del Evento</h3>
                  <div className="details-grid">
                    <div className="detail-item">
                      <span className="detail-label">Fecha:</span>
                      <span className="detail-value">{selectedEvento.fecha || 'Por confirmar'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Modalidad:</span>
                      <span className="detail-value">{selectedEvento.modalidad || 'Presencial/Virtual'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Duración:</span>
                      <span className="detail-value">{selectedEvento.duracion || 'Variable'}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-label">Público:</span>
                      <span className="detail-value">{selectedEvento.publico || 'Estudiantes escolares'}</span>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn-primary">Inscribirse</button>
                  <button className="btn-secondary">Compartir</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}