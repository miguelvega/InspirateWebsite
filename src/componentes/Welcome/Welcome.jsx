import React, { useEffect, useRef, useState } from "react";
import "./styleWelcome.css";
import {
  Card,
  Row,
  Col,
  Container,
  CardImg,
  Carousel,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import styled from "styled-components";
import { motion, useInView } from "framer-motion";
import {
  Users,
  BookOpen,
  Heart,
  Target,
  CheckCircle2,
  CalendarDays,
  Clock3,
  MapPin,
  Download,
} from "lucide-react";

/* ------- Animación ------- */
function Section({ children, hasLeftTransition }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const variants = {
    hidden: { opacity: 0, x: hasLeftTransition ? -200 : 200 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", duration: 1, bounce: 0.25 } },
  };
  return (
    <section ref={ref} className="section-tight">
      <motion.span initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants} style={{ display: "block" }}>
        {children}
      </motion.span>
    </section>
  );
}

/* ------- Carrusel ------- */
const StyledCarousel = styled(Carousel)`
  .carousel-item { height: 560px; }
  .carousel-item img { height: 560px; width: 100%; object-fit: cover; filter: brightness(0.96); }
  .carousel-item::after { content: ""; position: absolute; inset: 0; background: linear-gradient(to top, rgba(2,6,23,.45) 18%, rgba(2,6,23,0) 48%); pointer-events: none; }
  .carousel-caption { background: transparent; padding: 0; bottom: 12%; text-shadow: 0 2px 10px rgba(0,0,0,.55); }
  .carousel-caption h3 { font-size: 3.05rem; font-weight: 800; margin-bottom: .4rem; }
  .carousel-caption p { font-size: 1.12rem; margin-bottom: 1rem; }
`;

/* ------- Contador para métricas ------- */
function CountUp({ to = 0, duration = 1200, suffix = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    let startTs; const startVal = 0;
    const raf = (ts) => { if (!startTs) startTs = ts;
      const p = Math.min((ts - startTs) / duration, 1);
      const val = Math.floor(startVal + (to - startVal) * p);
      if (ref.current) ref.current.textContent = val.toLocaleString() + suffix;
      if (p < 1) requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }, [to, duration, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

/* ------- Franja de métricas compacta ------- */
function StatsStrip() {
  return (
    <div className="stats-strip">
      <Container>
        <Row className="text-center g-0 g-md-3">
          <Col xs={6} md={3}><div className="stat"><Heart size={22}/><div className="stat-value"><CountUp to={150} suffix="+"/></div><div className="stat-label">Actividades</div></div></Col>
          <Col xs={6} md={3}><div className="stat"><BookOpen size={22}/><div className="stat-value"><CountUp to={5000} suffix="+"/></div><div className="stat-label">Estudiantes</div></div></Col>
          <Col xs={6} md={3}><div className="stat"><Target size={22}/><div className="stat-value"><CountUp to={80} suffix="+"/></div><div className="stat-label">Charlas</div></div></Col>
          <Col xs={6} md={3}><div className="stat"><Users size={22}/><div className="stat-value"><CountUp to={120} suffix="+"/></div><div className="stat-label">Voluntarios</div></div></Col>
        </Row>
      </Container>
    </div>
  );
}

/* ------- Fila densa sin huecos ------- */
function FeatureRow({
  icon, title, subtitle, text, image, reverse = false,
  border = "primary", textColorClass = "text-primary", id,
  bullets = [], meta = [], tags = [],
  primaryLabel, secondaryLabel, onPrimary, onSecondary
}) {
  return (
    <Row id={id} className="align-items-stretch g-0 feature-row">
      <Col md={6} className={reverse ? "order-md-2" : ""}>
        <Card className={`h-100 border-${border} feature-card`}>
          <Card.Body className="p-4 p-md-5 d-flex flex-column">
            <Card.Title className={`${textColorClass} mb-2`}>{icon} {title}</Card.Title>
            <Card.Subtitle className="mb-3 text-muted">{subtitle}</Card.Subtitle>
            <Card.Text className="mb-3">{text}</Card.Text>

            {bullets?.length > 0 && (
              <ul className="feature-bullets">
                {bullets.map((b, i) => (
                  <li key={i}><CheckCircle2 size={18} /> <span>{b}</span></li>
                ))}
              </ul>
            )}

            {meta?.length > 0 && (
              <div className="feature-meta">
                {meta.map((m, i) => (
                  <div key={i} className="meta-item">{m.icon}{m.text}</div>
                ))}
              </div>
            )}

            {tags?.length > 0 && (
              <div className="feature-tags">
                {tags.map((t, i) => <span key={i} className="tag-chip">{t}</span>)}
              </div>
            )}

            <div className="feature-actions mt-3">
              {primaryLabel && <Button className="btn-cta-primary" onClick={onPrimary}>{primaryLabel}</Button>}
              {secondaryLabel && <Button variant="outline-primary" onClick={onSecondary}>{secondaryLabel}</Button>}
            </div>
          </Card.Body>
        </Card>
      </Col>

      <Col md={6} className={reverse ? "order-md-1" : ""}>
        <div className="feature-image-wrapper">
          <CardImg src={image} alt={title} className="feature-image" />
          <div className="image-badge">Programa 2025</div>
        </div>
      </Col>
    </Row>
  );
}

/* ------- Modales ------- */
function ActionModal({ show, onHide, title, ctaLabel }) {
  return (
    <Modal show={show} onHide={onHide} centered contentClassName="modal-surface">
      <Modal.Header closeButton closeVariant="white" className="modal-header-gradient">
        <Modal.Title className="modal-title-strong">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="modal-form">
          <Row className="g-2">
            <Col md={6}><Form.Group controlId="nombre"><Form.Label>Nombre</Form.Label><Form.Control type="text" placeholder="Tu nombre" /></Form.Group></Col>
            <Col md={6}><Form.Group controlId="correo"><Form.Label>Correo</Form.Label><Form.Control type="email" placeholder="tucorreo@ejemplo.com" /></Form.Group></Col>
          </Row>
          <Form.Group controlId="mensaje" className="mt-2">
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={3} placeholder="Cuéntanos brevemente..." />
          </Form.Group>
          <div className="d-flex gap-2 justify-content-end mt-3">
            <Button variant="light" onClick={onHide}>Cancelar</Button>
            <Button className="btn-cta-primary" onClick={onHide}>{ctaLabel}</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export const Welcome = () => {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [showJoin, setShowJoin] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const carouselData = [
    {
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=1600&h=900&fit=crop&q=80",
      title: "Descubre tu camino",
      description: "Orientación vocacional y talleres con mentores UNI",
    },
    {
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600&h=900&fit=crop&q=80",
      title: "Voluntariado INSPÍRATE",
      description: "Únete y genera impacto en la comunidad educativa",
    },
  ];

  return (
    <div className="welcome-page">
      {/* CARRUSEL */}
      <Section hasLeftTransition={false}>
        <StyledCarousel activeIndex={carouselIndex} onSelect={(i) => setCarouselIndex(i)} interval={4800} controls indicators>
          {carouselData.map((item, idx) => (
            <Carousel.Item key={idx}>
              <img className="d-block w-100" src={item.image} alt={item.title} />
              <Carousel.Caption>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <div className="caption-actions">
                  <Button size="lg" className="btn-cta-primary" onClick={() => setShowJoin(true)}>Únete ahora</Button>
                  <Button size="lg" variant="outline-light" className="btn-cta-ghost" onClick={() => setShowInfo(true)}>Conoce más</Button>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </StyledCarousel>
      </Section>

      {/* HERO */}
      <Section hasLeftTransition>
        <div className="hero-welcome-section">
          <Container>
            <Row className="justify-content-center">
              <Col lg={10} xl={8}>
                <Card className="hero-welcome-card" border="light" bg="light">
                  <Card.Body className="text-center p-5">
                    <div className="hero-eyebrow">Programa estudiantil de impacto</div>
                    <Card.Title className="display-4 text-primary mb-2">Bienvenido a INSPÍRATE UNI</Card.Title>
                    <Card.Subtitle className="mb-4 text-muted h3">¿Quiénes somos?</Card.Subtitle>
                    <Card.Text className="lead">
                      Somos un equipo multidisciplinario que promueve el voluntariado y acompaña a futuros ingresantes de la UNI para tomar decisiones acertadas.
                    </Card.Text>
                    <div className="hero-actions">
                      <Button size="lg" className="btn-cta-primary" onClick={() => setShowJoin(true)}>Quiero ser voluntario</Button>
                      <Button size="lg" variant="outline-primary" onClick={() => setShowInfo(true)}>Ver próximos talleres</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </Section>

      {/* MÉTRICAS */}
      <StatsStrip />

      {/* SECCIONES LLENAS DE CONTENIDO */}
      <Container className="section-block">

        {/* Orientación */}
        <Section>
          <FeatureRow
            id="orientacion"
            icon={<Target className="me-2" size={22} />}
            title="Orientación Vocacional"
            subtitle="Para estudiantes de colegios y academias"
            text="Te guiamos para descubrir tu vocación y elegir la carrera ideal."
            image="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&h=800&fit=crop&q=80"
            border="primary"
            textColorClass="text-primary"
            bullets={[
              "Test vocacional + feedback personalizado",
              "Rutas de carreras por facultad",
              "Opciones de becas y simulaciones",
              "Mentoría 1:1 con estudiantes UNI",
            ]}
            meta={[
              { icon: <CalendarDays size={18} />, text: "Sáb 26 Oct" },
              { icon: <Clock3 size={18} />, text: "10:00–12:00" },
              { icon: <MapPin size={18} />, text: "Campus UNI" },
            ]}
            tags={["Colegios", "Academias", "Padres"]}
            primaryLabel="Inscribirme"
            secondaryLabel="Descargar temario"
            onPrimary={() => setShowInfo(true)}
            onSecondary={() => window.open("#", "_blank")}
          />
        </Section>

        {/* Voluntariado */}
        <Section hasLeftTransition>
          <FeatureRow
            id="unete"
            icon={<Heart className="me-2" size={22} />}
            title="Programa de Voluntariado"
            subtitle="Únete a nuestra causa"
            text="Participa en ferias, charlas y proyectos de responsabilidad social universitaria."
            image="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1200&h=800&fit=crop&q=80"
            reverse
            border="success"
            textColorClass="text-success"
            bullets={[
              "Capacitaciones y mentorías",
              "Horarios flexibles",
              "Certificación de horas",
              "Trabajo colaborativo",
            ]}
            meta={[
              { icon: <CalendarDays size={18} />, text: "Postulaciones abiertas" },
              { icon: <MapPin size={18} />, text: "Modalidad híbrida" },
            ]}
            tags={["Responsabilidad social", "Eventos", "Comunidad"]}
            primaryLabel="Postular"
            secondaryLabel="Beneficios"
            onPrimary={() => setShowJoin(true)}
            onSecondary={() => setShowInfo(true)}
          />
        </Section>

        {/* Impacto */}
        <Section>
          <FeatureRow
            id="impacto"
            icon={<BookOpen className="me-2" size={22} />}
            title="Nuestro Impacto"
            subtitle="Resultados que nos enorgullecen"
            text="Datos actualizados de nuestras actividades y alcance."
            image="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=1200&h=800&fit=crop&q=80"
            border="info"
            textColorClass="text-info"
            bullets={[
              "5,000+ estudiantes orientados",
              "150+ actividades realizadas",
              "80+ charlas y talleres",
              "120+ voluntarios activos",
            ]}
            meta={[
              { icon: <CalendarDays size={18} />, text: "Reporte 2025" },
              { icon: <Download size={18} />, text: "Brochure PDF" },
            ]}
            tags={["Transparencia", "Resultados"]}
            primaryLabel="Ver reportes"
            secondaryLabel="Descargar brochure"
            onPrimary={() => setShowInfo(true)}
            onSecondary={() => window.open("#", "_blank")}
          />
        </Section>

        {/* Equipo */}
        <Section hasLeftTransition>
          <FeatureRow
            icon={<Users className="me-2" size={22} />}
            title="Nuestro Equipo"
            subtitle="Estudiantes comprometidos"
            text="Mentores y voceros por facultad, comité académico y equipo de logística."
            image="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=800&fit=crop&q=80"
            reverse
            border="warning"
            textColorClass="text-warning"
            bullets={[
              "Mentores por carrera",
              "Voceros por facultad",
              "Comité académico",
              "Equipo de logística",
            ]}
            meta={[
              { icon: <Target size={18} />, text: "7 facultades" },
              { icon: <BookOpen size={18} />, text: "20+ carreras" },
            ]}
            tags={["Diversidad", "Experiencia", "Acompañamiento"]}
            primaryLabel="Conocer mentores"
            secondaryLabel="Contacto"
            onPrimary={() => setShowInfo(true)}
            onSecondary={() => setShowJoin(true)}
          />
        </Section>

        {/* CTA final */}
        <Section>
          <div className="cta-final">
            <Container>
              <Row className="align-items-center">
                <Col md={9}>
                  <h3 className="cta-title">¿Listo para inspirarte?</h3>
                  <p className="cta-text">Súmate al voluntariado o agenda una charla para tu colegio.</p>
                </Col>
                <Col md={3} className="text-md-end">
                  <Button size="lg" className="btn-cta-primary" onClick={() => setShowJoin(true)}>Únete</Button>
                </Col>
              </Row>
            </Container>
          </div>
        </Section>
      </Container>

      {/* MODALES */}
      <ActionModal show={showJoin} onHide={() => setShowJoin(false)} title="Únete al Voluntariado INSPÍRATE" ctaLabel="Enviar solicitud" />
      <ActionModal show={showInfo} onHide={() => setShowInfo(false)} title="Solicitar información / charla" ctaLabel="Enviar consulta" />
    </div>
  );
};
