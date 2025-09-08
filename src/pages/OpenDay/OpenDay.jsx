import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Outlet, Link, useParams, useLocation } from "react-router-dom";
import "./styleOpenDay.css";

export const OpenDay = () => {
  // Outlet -> Se utiliza para decirle al componente padre donde debe renderizar a sus componentes hijos.

  return (
    <Container>
      <Button
        className="button-openday"
        as={Link}
        to="/home/openday"
        variant="info"
      >
        {" "}
        OpenDay{" "}
      </Button>
      <Outlet />
    </Container>
  );
};
