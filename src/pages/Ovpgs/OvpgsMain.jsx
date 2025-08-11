import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./OvpgsMain.css";
import styled from "styled-components";
import { motion } from "framer-motion";

export const OvpgsMain = () => {
  const TabContent = styled(motion.div)`
    width: 100%;
  `;

  return (
    <TabContent
      initial={{ opacity: "0%" }}
      animate={{ opacity: "100%" }}
      transition={{ duration: 1.0 }}
    >
      <Container className="container-presentacion-ovpgs">
        <h1 className="text-center mb-4">¿Qué son las OVPGs?</h1>
        <p className="lead text-center mb-4">
          Las OVPGs son ... (descripción más detallada)
        </p>

        <div className="d-flex justify-content-center">
          <Link to="/home/ovpgs-inscripcion">
            <Button
              variant="primary"
              size="lg"
              className="button-activity"
              style={{
                padding: "10px 30px",
                fontSize: "1.2rem",
                borderRadius: "30px",
              }}
            >
              Inscribirse aquí
            </Button>
          </Link>
        </div>
      </Container>
    </TabContent>
  );
};
