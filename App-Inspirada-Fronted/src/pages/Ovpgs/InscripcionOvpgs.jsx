import React, { useState, useEffect } from "react";
import listaFacultades from "./Listas/ListaFacultades";
import CheckBoxIuni from "../../Personalizados/CheckBoxIuni";
import { calendario } from "./ImgEmbajadores/Data"; // Importa el calendario desde Data.jsx
import "./styleOvpgs.css";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export const InscripcionOvpgs = () => {
  const TabContent = styled(motion.div)`
    width: 100%;
    padding: 40px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  `;

  let typesOvpg = ["Grupal", "Individual"];
  let CheckTypeOvpg = [false, false];

  let [arrayFacultades, setArrayFacultades] = useState(listaFacultades);
  let [isTypeOpvg, setTypeOvpg] = useState(typesOvpg);
  let [isCheckTypeOvpg, setCheckTypeOvpg] = useState(CheckTypeOvpg);
  let [isOvpgUser, setOvpgUser] = useState("");
  let [isFAcu, setFacu] = useState("");
  let [selectedDia, setSelectedDia] = useState(null);
  let [selectedHorario, setSelectedHorario] = useState(null);

  const handleFacultades = (event, { index }) => {
    const updateArreglo = [...arrayFacultades];
    if (event.target.checked) {
      updateArreglo[index].checked = true;
      for (let i = 0; i < updateArreglo.length; i++) {
        if (i !== index) updateArreglo[i].checked = false;
      }
    } else {
      updateArreglo[index].checked = false;
    }
    setArrayFacultades(updateArreglo);
    setFacu(updateArreglo[index].nombre);
  };

  const handleTypesOvpgs = (event, { index }) => {
    const updateArreglo = [...isCheckTypeOvpg];
    if (event.target.checked) {
      setOvpgUser(isTypeOpvg[index]);
      updateArreglo[index] = true;
      for (let i = 0; i < updateArreglo.length; i++) {
        if (i !== index) updateArreglo[i] = false;
      }
    } else {
      updateArreglo[index] = false;
    }
    setCheckTypeOvpg(updateArreglo);
  };

  const handleSeleccionarDia = (dia) => {
    setSelectedDia(selectedDia === dia ? null : dia);
  };

  const handleSeleccionarHorario = (horario) => {
    setSelectedHorario(selectedHorario === horario ? null : horario);
  };

  useEffect(() => {}, [isOvpgUser]);

  return (
    <TabContent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0 }}
    >
      <h2 className="header-title">Inscripción a OVPGs</h2>

      <div className="typesOvpgs-container">
        {isTypeOpvg.map((tipoOvpg, index) => (
          <CheckBoxIuni
            key={index}
            label={tipoOvpg}
            checked={isCheckTypeOvpg[index]}
            onChange={(event) => {
              handleTypesOvpgs(event, { index });
            }}
          />
        ))}
      </div>

      <div className="container-bottom">
        <div className="facultades-container">
          {arrayFacultades.map((facus, index) => (
            <div key={index} className="facus">
              <CheckBoxIuni
                label={facus.nombre}
                checked={facus.checked}
                onChange={(event) => {
                  handleFacultades(event, { index });
                }}
              />
              {facus.checked &&
                facus.carreras.lista.map((carrera, indexSon) => (
                  <div key={indexSon} className="carreras">
                    <CheckBoxIuni label={carrera} />
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div className="horarios-container">
          <div className="dias-container">
            {calendario.dias.map((dia, index) => (
              <div key={index} className="dia-container">
                <div
                  className={`dia ${selectedDia === dia ? "selected" : ""}`}
                  onClick={() => handleSeleccionarDia(dia)}
                >
                  <h3>{dia.nombre}</h3>
                </div>
                {selectedDia === dia && (
                  <div className="horarios-dia-container">
                    <ul>
                      {dia.horarios.map((horario, idx) => (
                        <li
                          key={idx}
                          className={`horario ${
                            selectedHorario === horario
                              ? "selected-horario"
                              : ""
                          }`}
                          onClick={() => handleSeleccionarHorario(horario)}
                        >
                          {horario}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </TabContent>
  );
};

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
