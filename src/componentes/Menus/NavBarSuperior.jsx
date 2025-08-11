import React, { useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./styleNavBarSuperior.css";

export const NavBarSuperior = () => {
  // Outlet -> Se utiliza para decirle al componente padre donde debe renderizar a sus componentes hijos.

  return (
    <div className="container-navBar">
      <Nav className="menu-nav" fill variant="tabs" defaultActiveKey="home">
        <Nav.Item>
          <Nav.Link
            as={Link}
            eventKey="home"
            to={"/home/inicio"}
            className="text-dark"
          >
            INICIO
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            eventKey="eventos"
            to={"/home/eventos"}
            className="text-dark"
          >
            EVENTOS
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            as={Link}
            eventKey="igirl"
            to={"/home/igirl"}
            className="text-dark"
          >
            I-GIRL
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link eventKey="openday" disabled className="text-dark">
            Open Day
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Outlet />
    </div>
  );
};
