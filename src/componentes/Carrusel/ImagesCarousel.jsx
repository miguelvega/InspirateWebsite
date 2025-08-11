import React from 'react'
import { Carousel } from 'react-bootstrap';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './styleImagesCarousel.css'

export const ImagesCarousel = ({images}) => {
  return (

    <Carousel className="carousel" fade>
      {images.map((imageObj, index) => (
        <Carousel.Item key = {index} interval={4000}>
          <img className="image" src={imageObj.url} alt={`Image ${index}`} />
          <Carousel.Caption className ="caption">
          <h3>{imageObj.encabezado}</h3>
          <p>{imageObj.desc}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))} 
    </Carousel>


  )
}
