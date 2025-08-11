import React from 'react'

import { styled } from '@mui/material/styles';
import { BottomNavigation, BottomNavigationAction, Collapse } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { IconButton } from '@mui/material';
import './styleFooter.css'
import { Link, NavLink } from 'react-router-dom';
import { Row, Col} from 'react-bootstrap'

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(3),
}));


export const Footer = () => {
  return (
      <div className='footer'>
        <div className="footer-columns">
          <div className="footer-column">
              <h3>Contáctanos</h3>
              <Row className='row-wsp'>
                <Col className='wsp-logo'>
                  <BottomNavigationAction label="WhatsApp" value="whatsapp" icon={<WhatsAppIcon style={{ color: 'white' }}/>} />
                </Col>
                <Col className='number'>
                  <p>+51 987 654 321</p>
                </Col>
                
              </Row>
              
              <p>Correo: inspirateuni@uni.edu.pe </p>
          </div>

          <div className="footer-column">
              <p>Políticas de privacidad</p>
              <p>Código de ética</p>
              <p>Miembros de directorio</p>
          </div>

        </div>
        <div className='footer-row'>
            <h3>SÍGUENOS EN NUESTRAS REDES SOCIALES</h3>
              <div className='footer-icons'>
              <StyledIconButton href="https://www.instagram.com/inspirateuni/" target="_blank" rel="noopener noreferrer">
                      <InstagramIcon style={{ color: 'white' }}/>
                    </StyledIconButton>

                    <StyledIconButton href="https://www.facebook.com/groups/1183296551739414" target="_blank" rel="noopener noreferrer">
                      <FacebookIcon style={{ color: 'white' }}/>
                    </StyledIconButton>

                    <StyledIconButton href="https://www.linkedin.com/company/inspirate-uni/about/" target="_blank" noopener= "noreferrer">
                      <LinkedInIcon style={{ color: 'white' }}/>
                </StyledIconButton>
              </div>
        </div>
      </div>
  )
}