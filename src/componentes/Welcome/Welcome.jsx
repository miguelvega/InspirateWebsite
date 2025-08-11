import React, {useEffect, useRef  } from 'react'
import './styleWelcome.css'
import { Card, Row, Col, Container, CardImg } from 'react-bootstrap';
import styled from 'styled-components';
import { motion, useInView } from 'framer-motion';

function Section({ children, hasLeftTransition}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }, );

  console.log('hasLeftTransition:', hasLeftTransition);

  const animationVariants = {
    hidden: { opacity: 0, x: hasLeftTransition ? -200 : 200},
    visible: { opacity: 1, x: 0 , transition: { type: 'spring', duration: 1.4, bounce: 0.5 }},
  };

  return (
    <section ref={ref}>
      <motion.span
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={animationVariants}
              style={{ display: 'block' }}
            >
        {children}
      </motion.span>
    </section>
  );
}

export const Welcome = () => {

  return (
    <Container>

      <Section hasLeftTransition={true}>
        <div className='flex-container-left'>
        <Card className="mb-4 end-0" border ="light" bg="light" style={{ width: '40rem'}}>
        <Card.Body >
          <Card.Title>Bienvenido a Inspirate UNI</Card.Title>
          <Card.Subtitle>
            ¿Quiénes somos?
          </Card.Subtitle>
          <Card.Text>
            Somos una Asociación Estudiantil formada en la Universidad Nacional de Ingeniería 
            dedicada a la orientacion vocacional para jóvenes estudiantes de colegios y academias.
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
    </Section>

    <Section hasLeftTransition={false}>
      <div className='flex-container-right'>
          <Card className="mb-4" border ="light" bg="light" style={{ width: '40rem' }}>
          <Card.Body>
            <Card.Title>Bienvenido a Inspirate UNI</Card.Title>
            <Card.Subtitle>
              ¿Quiénes somos?
            </Card.Subtitle>
            <Card.Text>
              Somos una Asociación Estudiantil formada en la Universidad Nacional de Ingeniería 
              dedicada a la orientacion vocacional para jóvenes estudiantes de colegios y academias.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Section>

    <Section hasLeftTransition={true}> 
      <div className='flex-container-left'>
          <Card className="mb-4" border ="light" bg="light" style={{ width: '40rem' }}>
          <Card.Body>
            <Card.Title>Bienvenido a Inspirate UNI</Card.Title>
            <Card.Subtitle>
              ¿Quiénes somos?
            </Card.Subtitle>
            <Card.Text>
              Somos una Asociación Estudiantil formada en la Universidad Nacional de Ingeniería 
              dedicada a la orientacion vocacional para jóvenes estudiantes de colegios y academias.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Section>

    <Section hasLeftTransition={false}>
      <div className='flex-container-right'>
          <Card className="mb-4" border ="light" bg="light" style={{ width: '40rem' }}>
          <Card.Body>
            <Card.Title>Bienvenido a Inspirate UNI</Card.Title>
            <Card.Subtitle>
              ¿Quiénes somos?
            </Card.Subtitle>
            <Card.Text>
              Somos una Asociación Estudiantil formada en la Universidad Nacional de Ingeniería 
              dedicada a la orientacion vocacional para jóvenes estudiantes de colegios y academias.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Section>

    <Section hasLeftTransition={true}>
      <div className='flex-container-left'>
          <Card className="mb-4" border ="light" bg="light" style={{ width: '40rem' }}>
          <Card.Body>
            <Card.Title>Bienvenido a Inspirate UNI</Card.Title>
            <Card.Subtitle>
              ¿Quiénes somos?
            </Card.Subtitle>
            <Card.Text>
              Somos una Asociación Estudiantil formada en la Universidad Nacional de Ingeniería 
              dedicada a la orientacion vocacional para jóvenes estudiantes de colegios y academias.
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </Section>

    <Section hasLeftTransition={false}>
      <div className='flex-container-right'>
          <Card className="mb-4" border ="light" bg="light" style={{ width: '40rem' }}>
          <Card.Body>
            <CardImg variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVsvwe1NThCm_LKYGsAt_Cb-WL_fUrUrZ2Mg&s"></CardImg>
            <Card.Footer>Nuestra mascota Cai</Card.Footer>
          </Card.Body>
        </Card>
      </div>
    </Section>
  </Container>
)
};
