import React from 'react'
import './Eventos.css'
import { eventosData } from './EventosData'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

export const Eventos = () => {  

  const TabContent = styled(motion.div)`
  width: 100%;
`;

  return (
    <TabContent
      initial={{ opacity: '0%' }}
      animate={{ opacity: '100%'}}
      transition={{ duration: '1.0' }}>
        <h1>¿Que actividades esperar de nosotros?</h1>
        <p>Como organizacion estudiantil dedicada a las orientaciones vocacionales... (mucho texto)</p>
        <div className="eventos">
        {eventosData.map((item) => (
          <div key={eventosData.id} className="evento">
            <Link to={`/home/${encodeURIComponent(item.id)}`}>
            <h2>{item.titulo}</h2>
            <img src={item.portada} alt={item.titulo} />
            <p>{item.desc}</p>
            </Link>
          </div>
        ))}
      </div>
    </TabContent>

  )
}
