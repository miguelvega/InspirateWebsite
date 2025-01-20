import React from 'react'
import { Button, Container, TabContent } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link
import './OvpgsMain.css'
import styled from 'styled-components';
import { motion } from 'framer-motion';


export const OvpgsMain = () => {

  const TabContent = styled(motion.div)`
  width: 100%;
`;

  return (
    <TabContent
    initial={{ opacity: '0%' }}
    animate={{ opacity: '100%'}}
    transition={{ duration: '1.0' }}>
        <div className='container-presentacion-ovpgs'>
            <h1>¿Qué son las OVPGs?</h1>
            <p>Las Ovpgs son .... (mucho texto)</p>
        </div>

        <div>
    
        <Link to="/home/ovpgs-inscripcion" className="button-activity">
          <div> Inscribirse aqui</div>
        </Link>
      </div>
    </TabContent>
  )
}
