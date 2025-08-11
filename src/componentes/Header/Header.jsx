import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./styleHeader.css";
import logo from "./logo.png"; // Importa la imagen local

export const Header = () => {
  return (
    <Navbar expand="lg" className="header-navbar">
      <Container className="d-flex justify-content-between align-items-center">
        {/* Logo Inspirate Centrado */}
        <Navbar.Brand href="#home" className="logo-container">
          <img className="logo" src={logo} alt="Inspirate Logo" />
        </Navbar.Brand>

        {/* Botones alineados a la derecha */}
        <Nav className="ms-auto d-flex align-items-center">
          <Button
            variant="outline-dark"
            className="custom-btn me-2"
            href="#login"
          >
            Iniciar Sesión
          </Button>
          <Button variant="warning" className="custom-btn" href="#unete">
            Únete
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};
