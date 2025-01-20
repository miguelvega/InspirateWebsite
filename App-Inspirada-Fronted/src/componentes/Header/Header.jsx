import React from 'react';
import { Navbar, Nav, Form, FormControl, Button, Row, Col, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './styleHeader.css'
import logo from './logo.png'; // Importa la imagen local

export const Header = () => {

    return (
        <Navbar >
          <Navbar.Collapse >
            <Nav className="mr-auto">
              <Nav.Link className="px-3" href="#unete">INICIAR SESION | UNETE</Nav.Link>
            </Nav>
            <Navbar.Brand className="mx-auto" href="#home">
              <img className="logo" src={logo} alt="Logo"/>
            </Navbar.Brand>
          </Navbar.Collapse>
        </Navbar>
    );
}
