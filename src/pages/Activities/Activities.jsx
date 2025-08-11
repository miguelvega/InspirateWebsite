import React, {  useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Outlet, Link, useParams, useLocation } from 'react-router-dom';
import './styleActivities.css'

export const Activities = () => {

  // Outlet -> Se utiliza para decirle al componente padre donde debe renderizar a sus componentes hijos.
  
  return (
    <Container>
    <Button className="button-activity" as={Link} to="/home/actividades/ovpgs" variant="info"> OVPGS </Button>
      <Outlet/>
    </Container>
  );
};