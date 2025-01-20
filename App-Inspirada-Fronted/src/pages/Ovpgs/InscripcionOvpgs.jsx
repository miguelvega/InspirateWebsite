import React, { useState, useEffect} from 'react'
import listaFacultades from './Listas/ListaFacultades'
import CheckBoxIuni from '../../Personalizados/CheckBoxIuni'
import images from './ImgEmbajadores/Data';
import { ImagesCarousel } from '../../componentes/Carrusel/ImagesCarousel'
import { Carousel } from 'react-bootstrap';
import './styleOvpgs.css'
import { NavItem } from 'react-bootstrap'
import styled from 'styled-components';
import { motion } from 'framer-motion';


export const InscripcionOvpgs = () => {

  const TabContent = styled(motion.div)`
  width: 100%;
  `;


  let OvpgUser=''
  let carrera=''
  let embajador=''
  let typesOvpg = ['Grupal', 'Individual']
  let CheckTypeOvpg = [false, false];

  let [arrayFacultades, setArrayFacultades] = useState(listaFacultades)

  //Hooks
  //hook del array de los tipos de OVPG
  let [isTypeOpvg, setTypeOvpg] = useState(typesOvpg) 
  //hook para el array de checking de los tipos de Ovpg
  let [isCheckTypeOvpg, setCheckTypeOvpg] = useState(CheckTypeOvpg)
  //hook para los usarios de Ovpgs
  let [isOvpgUser, setOvpgUser] = useState(OvpgUser)
  //
  let [isFAcu, setFacu] = useState("")

  const handleFacultades = (event,{index}) => {
    const updateArreglo = [...arrayFacultades]
    if(event.target.checked){
      updateArreglo[index].checked=true
      for(let i=0; i<updateArreglo.length; i++){
        if(i!==index) updateArreglo[i].checked=false;
      }
    }else{
      updateArreglo[index].checked=false;
    }
    setArrayFacultades(updateArreglo)
    setFacu(updateArreglo[index].nombre)
  }

  const handleTypesOvpgs = (event,{index}) =>{
    const updateArreglo = [...isCheckTypeOvpg]
    if(event.target.checked){
      setOvpgUser(isTypeOpvg[index])
      updateArreglo[index]=true
      for(let i=0; i<updateArreglo.length; i++){
        if(i!==index) updateArreglo[i]=false;
      }
    }else{
      updateArreglo[index]=false;
    }
    
    setCheckTypeOvpg(updateArreglo)
  }

  useEffect(() => {
   
  }, [isOvpgUser]);

  return (
    <TabContent
    initial={{ opacity: '0%' }}
    animate={{ opacity: '100%'}}
    transition={{ duration: '1.0' }}>
      <div className='typesOvpgs-container'>
        {isTypeOpvg.map((tipoOvpg,index) => (
          <CheckBoxIuni 
            key={index} 
            label={tipoOvpg} 
            checked={isCheckTypeOvpg[index]} 
            onChange={(event) => {handleTypesOvpgs(event,{index})} }
          
          />
        ))}
      </div>

      <div className='container-bottom'>
          <div>
            {arrayFacultades.map((facus, index) =>(
              <div key={index} className='facus'>
                <CheckBoxIuni 
                  label={facus.nombre} 
                  checked={facus.checked} 
                  onChange={(event) => {handleFacultades(event,{index})} }
                />
                {facus.checked && 
                  facus.carreras.lista.map(
                    (carrera,indexSon) =>(
                      <div key={indexSon} className='carreras'>
                        <CheckBoxIuni 
                          label={carrera}
                        />
                      </div>
                    )
                  )
                }
              </div>
            )
            )}
          </div>
          <div className='container-right'>
            <h1>Embajadores de la {isFAcu}</h1>
            <ImagesCarousel images={images} />
          </div>

      </div>
      
    </TabContent>
  )
}

/*
import { NavBarSuperior} from '../../componentes/Menus/NavBarSuperior'
import listaCarreras from './ListaCarreras'
import './styleCheckBox.css'
const Items = ({nombre, lista, checked, onChange}) =>{
  return (
    <div className='Item-Personalitation'>
      <CheckboxPersonalitation label={nombre} lista={lista} checked={checked} onChange={onChange}/>
    </div>
  )
}


export const Ovpgs = () => {
  const [arreglo, setArreglo] = useState(listaCarreras)

  const handleCheckboxChange = (event,{index}) =>{
    console.log(event.target.checked)
    const updateArreglo = [...arreglo]

    if(event.target.checked===true){
      updateArreglo[index].checked=true
      for(let i=0; i<updateArreglo.length; i++){
        if(i!=index) updateArreglo[i].checked=false;
      }
    }else{
      updateArreglo[index].checked=false;
    }
    setArreglo(updateArreglo)
  }

  return (
    <>
        <h1>Carreras</h1>
        {arreglo.map((items, index) => (
        <React.Fragment key={items.id}>
          <Items
            nombre={items.nombre}
            lista = {items.carreras}
            checked={items.checked}
            onChange={(event) => {
              handleCheckboxChange(event, { index })
            }}
          />
        </React.Fragment>
      ))}
    </>
  )
}
*/