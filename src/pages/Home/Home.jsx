import React from 'react';

import { ImagesCarousel } from '../../componentes/Carrusel/ImagesCarousel'
import { Welcome } from '../../componentes/Welcome/Welcome'
import images from '../../componentes/Carrusel/Images';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import './styleHome.css'

const TabContent = styled(motion.div)`
  width: 100%;
`;

export const Home = () => {
  return (
    <TabContent
        initial={{ opacity: '0%' }}
        animate={{ opacity: '100%'}}
        transition={{ duration: '1.0' }}
      >
    <div className="home">
      <ImagesCarousel images={images} />
      <Welcome/>
    </div>
    </TabContent>
  );
}