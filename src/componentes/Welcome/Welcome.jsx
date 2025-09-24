import React, { useEffect, useRef, useState } from "react";
import "./styleWelcome.css";
import { Card, Row, Col, Container, CardImg, Carousel } from "react-bootstrap";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import { Users, BookOpen, Heart, Target } from "lucide-react";

function Section({ children, hasLeftTransition }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const animationVariants = {
    hidden: { opacity: 0, x: hasLeftTransition ? -200 : 200 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", duration: 1.4, bounce: 0.5 },
    },
  };

  return (
    <section ref={ref}>
      <motion.span
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={animationVariants}
        style={{ display: "block" }}
      >
        {children}
      </motion.span>
    </section>
  );
}

const StyledCarousel = styled(Carousel)`
  .carousel-item {
    height: 500px;
  }

  .carousel-item img {
    height: 500px;
    object-fit: cover;
    filter: brightness(0.7);
  }

  .carousel-caption {
    background: rgba(0, 0, 0, 0.6);
    border-radius: 15px;
    padding: 2rem;
    bottom: 20%;
  }

  .carousel-caption h3 {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }

  .carousel-caption p {
    font-size: 1.25rem;
    margin-bottom: 0;
  }
`;

export const Welcome = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);

  const carouselData = [
    {
      image:
        "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop&q=80",
      title: "Estudiantes Comprometidos",
      description:
        "Equipo multidisciplinario trabajando por el futuro de la educación",
    },
    {
      image:
        "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=600&fit=crop&q=80",
      title: "Orientación Universitaria",
      description: "Guiamos a futuros estudiantes hacia decisiones acertadas",
    },
    {
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop&q=80",
      title: "Voluntariado Activo",
      description: "Promovemos el servicio a la comunidad universitaria",
    },
    {
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop&q=80",
      title: "Excelencia Académica",
      description: "Contribuyendo a la calidad de la educación superior",
    },
  ];

  const handleCarouselSelect = (selectedIndex) => {
    setCarouselIndex(selectedIndex);
  };

  return (
    <div className="welcome-page">
      {/* 1. CARRUSEL - Después del navbar */}
      <Section hasLeftTransition={false}>
        <StyledCarousel
          activeIndex={carouselIndex}
          onSelect={handleCarouselSelect}
          interval={4000}
          controls={true}
          indicators={true}
        >
          {carouselData.map((item, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={item.image}
                alt={item.title}
              />
              <Carousel.Caption>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </StyledCarousel>
      </Section>

      {/* 2. BIENVENIDA - Después del carrusel */}
      <Section hasLeftTransition={true}>
        <div className="hero-welcome-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10} xl={8}>
                <Card className="hero-welcome-card" border="light" bg="light">
                  <Card.Body className="text-center p-5">
                    <Card.Title className="display-4 text-primary mb-4">
                      Bienvenido a INSPIRATE UNI
                    </Card.Title>
                    <Card.Subtitle className="mb-4 text-muted h3">
                      ¿Quiénes somos?
                    </Card.Subtitle>
                    <Card.Text className="lead">
                      Somos un equipo multidisciplinario de estudiantes
                      comprometidos con promover el voluntariado y contribuir a
                      que los futuros estudiantes de la Universidad Nacional de
                      Ingeniería estén plenamente informados para tomar
                      decisiones acertadas sobre su futuro profesional.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Section>

      <Container className="my-5">
        {/* 3. SECCIONES ALTERNADAS - Después de la bienvenida */}

        {/* Orientación Vocacional - Derecha */}
        <Section hasLeftTransition={false}>
          <div className="flex-container-right">
            <Card className="mb-4" border="primary" style={{ width: "40rem" }}>
              <Row className="g-0">
                <Col md={7}>
                  <Card.Body>
                    <Card.Title className="text-primary">
                      <Target className="me-2" size={24} />
                      Orientación Vocacional
                    </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      Para estudiantes de colegios y academias
                    </Card.Subtitle>
                    <Card.Text>
                      Ofrecemos charlas informativas, talleres de orientación
                      vocacional y asesoramiento personalizado para ayudarte a
                      descubrir tu verdadera vocación y elegir la carrera que
                      mejor se adapte a tus habilidades e intereses.
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col md={5}>
                  <CardImg
                    src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop&q=80"
                    alt="Orientación Vocacional"
                    className="h-100"
                    style={{ objectFit: "cover" }}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        </Section>

        {/* Programa de Voluntariado - Izquierda */}
        <Section hasLeftTransition={true}>
          <div className="flex-container-left">
            <Card className="mb-4" border="success" style={{ width: "40rem" }}>
              <Row className="g-0">
                <Col md={5}>
                  <CardImg
                    src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=300&fit=crop&q=80"
                    alt="Voluntariado"
                    className="h-100"
                    style={{ objectFit: "cover" }}
                  />
                </Col>
                <Col md={7}>
                  <Card.Body>
                    <Card.Title className="text-success">
                      <Heart className="me-2" size={24} />
                      Programa de Voluntariado
                    </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      Únete a nuestra causa
                    </Card.Subtitle>
                    <Card.Text>
                      Forma parte de nuestro equipo de voluntarios y contribuye
                      al desarrollo educativo del país. Participamos en ferias
                      educativas, charlas en colegios y actividades de
                      responsabilidad social universitaria.
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </div>
        </Section>

        {/* Nuestro Impacto - Derecha */}
        <Section hasLeftTransition={false}>
          <div className="flex-container-right">
            <Card className="mb-4" border="info" style={{ width: "40rem" }}>
              <Row className="g-0">
                <Col md={7}>
                  <Card.Body>
                    <Card.Title className="text-info">
                      <BookOpen className="me-2" size={24} />
                      Nuestro Impacto
                    </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      Resultados que nos enorgullecen
                    </Card.Subtitle>
                    <Card.Text>
                      Hemos orientado a más de 5,000 estudiantes de secundaria,
                      participado en 150+ actividades de voluntariado y
                      contribuido significativamente a mejorar la calidad de
                      información disponible para futuros ingenieros.
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col md={5}>
                  <CardImg
                    src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=400&h=300&fit=crop&q=80"
                    alt="Nuestro Impacto"
                    className="h-100"
                    style={{ objectFit: "cover" }}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        </Section>

        {/* Nuestro Equipo - Izquierda */}
        <Section hasLeftTransition={true}>
          <div className="flex-container-left">
            <Card className="mb-4" border="warning" style={{ width: "40rem" }}>
              <Row className="g-0">
                <Col md={5}>
                  <CardImg
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&q=80"
                    alt="Nuestro Equipo"
                    className="h-100"
                    style={{ objectFit: "cover" }}
                  />
                </Col>
                <Col md={7}>
                  <Card.Body>
                    <Card.Title className="text-warning">
                      <Users className="me-2" size={24} />
                      Nuestro Equipo
                    </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      Estudiantes comprometidos con la excelencia
                    </Card.Subtitle>
                    <Card.Text>
                      Somos estudiantes de diferentes facultades de la UNI:
                      Ingeniería Civil, Sistemas, Industrial, Electrónica,
                      Química y más. Nuestra diversidad académica nos permite
                      ofrecer una perspectiva integral de las carreras.
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </div>
        </Section>

        {/* Calidad Educativa - Derecha */}
        <Section hasLeftTransition={false}>
          <div className="flex-container-right">
            <Card className="mb-4" border="dark" style={{ width: "40rem" }}>
              <Row className="g-0">
                <Col md={7}>
                  <Card.Body>
                    <Card.Title className="text-dark">
                      <BookOpen className="me-2" size={24} />
                      Calidad Educativa
                    </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      Compromiso con la excelencia
                    </Card.Subtitle>
                    <Card.Text>
                      Contribuimos activamente a la mejora de la calidad de la
                      educación superior y la pertinencia del capital humano que
                      demanda el mercado nacional, trabajando de la mano con
                      instituciones educativas y empresas.
                    </Card.Text>
                  </Card.Body>
                </Col>
                <Col md={5}>
                  <CardImg
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&q=80"
                    alt="Calidad Educativa"
                    className="h-100"
                    style={{ objectFit: "cover" }}
                  />
                </Col>
              </Row>
            </Card>
          </div>
        </Section>

        {/* Mascota Cai - Izquierda */}
        <Section hasLeftTransition={true}>
          <div className="flex-container-left">
            <Card
              className="mb-4"
              border="light"
              bg="light"
              style={{ width: "40rem" }}
            >
              <Row className="g-0">
                <Col md={5}>
                  <CardImg
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVsvwe1NThCm_LKYGsAt_Cb-WL_fUrUrZ2Mg&s"
                    alt="Mascota Cai"
                    className="h-100"
                    style={{ objectFit: "contain", padding: "1rem" }}
                  />
                </Col>
                <Col md={7}>
                  <Card.Body>
                    <Card.Title className="text-primary">
                      Conoce a Cai 🐕
                    </Card.Title>
                    <Card.Subtitle className="mb-3 text-muted">
                      Nuestra querida mascota
                    </Card.Subtitle>
                    <Card.Text>
                      Nuestra querida mascota que nos acompaña en todas nuestras
                      aventuras y actividades. Cai representa el espíritu jovial
                      y comprometido de INSPIRATE UNI, siempre dispuesto a
                      apoyar a los estudiantes.
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          </div>
        </Section>
      </Container>
    </div>
  );
};
