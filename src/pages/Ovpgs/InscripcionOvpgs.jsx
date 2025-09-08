import React, { useState, useEffect } from "react";
import listaFacultades from "./Listas/ListaFacultades";
import CheckBoxIuni from "../../Personalizados/CheckBoxIuni";
import { calendario } from "./ImgEmbajadores/Data"; // Importa el calendario desde Data.jsx
import "./styleOvpgs.css";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import InscriptionModal from "./components/InscriptionModal";

export const InscripcionOvpgs = () => {
  const TabContent = styled(motion.div)`
    width: 100%;
    padding: 40px;
    background-color: #fff;
    border-radius: 12px;
    box-shadow: 0 6px 18px rgba(30, 27, 27, 0.1);
  `;

  let typesOvpg = ["Grupal", "Individual"];
  let CheckTypeOvpg = [false, false];

  let [arrayFacultades, setArrayFacultades] = useState(listaFacultades);
  let [facultadSelected, setFacultadSelected] = useState(null);
  let [carreraSelected, setCarreraSelected] = useState(null);
  let [slots, setHorarios] = useState([]);
  let [isTypeOpvg, setTypeOvpg] = useState(typesOvpg);
  let [isCheckTypeOvpg, setCheckTypeOvpg] = useState(CheckTypeOvpg);
  let [isOvpgUser, setOvpgUser] = useState("");
  let [isFAcu, setFacu] = useState("");
  let [selectedDia, setSelectedDia] = useState(null);
  let [selectedHorario, setSelectedHorario] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const eq = (a, b) => a?.trim().toLowerCase() === b?.trim().toLowerCase();

  const handleFacultades = (event, { index }) => {
    const updateArreglo = [...arrayFacultades];
    if (event.target.checked) {
      // Marco la facultad clicada
      updateArreglo[index].checked = true;
      // y DESMARCO todas las demás
      for (let i = 0; i < updateArreglo.length; i++) {
        if (i !== index) updateArreglo[i].checked = false;
      }
    } else {
      // Si desmarcan la misma, queda sin seleccionar
      updateArreglo[index].checked = false;
    }
    // Actualizo el estado con la nueva lista
    setArrayFacultades(updateArreglo);
    // Guardo el nombre de la facultad marcada en dos estados
    setFacu(updateArreglo[index].nombre);
    setFacultadSelected(updateArreglo[index].nombre);
  };

  const dmy = (date) =>
    `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  const handleCarrera = (event, { index, indexSon }) => {
    let auxIndex;
    const auxFacultades = [...arrayFacultades];

    if (event.target.checked) {
      for (let i = 0; i < auxFacultades.length; i++) {
        if (auxFacultades[i].nombre === facultadSelected) {
          for (let i2 = 0; i2 < auxFacultades[i].carreras.lista.length; i2++) {
            if (i2 !== indexSon)
              auxFacultades[i].carreras.lista[i2].checked = false;
            else auxIndex = i;
          }
        } else {
          for (let i2 = 0; i2 < auxFacultades[i].carreras.lista.length; i2++) {
            auxFacultades[i].carreras.lista[i2].checked = false;
          }
        }
      }
      auxFacultades[auxIndex].carreras.lista[indexSon].checked = true;
      // Guardo el nombre de la carrera seleccionada
      setCarreraSelected(
        auxFacultades[auxIndex].carreras.lista[indexSon].nombre
      );
    } else {
      // Si desmarcan esa carrera, queda sin selección
      auxFacultades[index].carreras.lista[indexSon].checked = false;
      setCarreraSelected(null);
    }

    setArrayFacultades(auxFacultades);

    setSelectedDia(null);
    setSelectedHorario(null);
    setHorarios([]);
  };

  // Maneja la selección del tipo de OVPGS (Grupal / Individual)
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
    const day = dmy(dia);
    const fac = list.find(
      (f) =>
        eq(f.siglas_facultad, facultadSelected) &&
        eq(f.carrera, carreraSelected)
    );
    const horarios =
      fac?.disponibilidades.find((d) => d.dia === day)?.horario ?? [];

    setSelectedDia(dia);
    onChangeDaySelected(dia);
    setHorarios(horarios);
    setSelectedHorario(null);
  };

  const handleSeleccionarHorario = (horario) => {
    setSelectedHorario(selectedHorario === horario ? null : horario);
  };

  const [daySelected, onChangeDaySelected] = useState(new Date());

  const today = new Date();
  const lastDayYear = new Date(today.getFullYear(), 11, 31);

  const list = [
    {
      siglas_facultad: "Facultad de Ciencias",
      carrera: "Química",
      disponibilidades: [
        {
          dia: "27/8/2025",
          horario: [{ rango: "9:00 - 10:00", voluntario: ["Diego"] }],
        },
        {
          dia: "29/8/2025",
          horario: [{ rango: "11:00 - 12:00", voluntario: ["Diego"] }],
        },
      ],
    },
  ];

  function tileDisabled({ date, view }) {
    if (view !== "month") return false;
    if (!facultadSelected || !carreraSelected) return true;

    const day = dmy(date);
    const fac = list.find(
      (f) =>
        eq(f.siglas_facultad, facultadSelected) &&
        eq(f.carrera, carreraSelected)
    );
    if (!fac) return true;

    const available = fac.disponibilidades.some((d) => d.dia === day);
    return !available;
  }

  useEffect(() => {}, [isOvpgUser]);

  return (
    <TabContent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0 }}
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
                    <CheckBoxIuni
                      label={carrera.nombre}
                      checked={carrera.checked}
                      onChange={(event) => {
                        handleCarrera(event, { index, indexSon });
                      }}
                    />
                  </div>
                ))}
            </div>
          ))}
        </div>

        <div>
          {carreraSelected && (
            <Calendar
              onChange={handleSeleccionarDia}
              value={daySelected}
              minDate={today}
              maxDate={lastDayYear}
              locale="es-ES"
              minDetail="month"
              maxDetail="month"
              prev2Label={null}
              next2Label={null}
              tileDisabled={tileDisabled}
            />
          )}

          {carreraSelected && selectedDia && (
            <>
              <div>Horarios para {dmy(daySelected)}</div>
              {slots.length ? (
                <ul>
                  {slots.map((t, i) => (
                    <li
                      key={i}
                      className={`horario ${
                        selectedHorario === t.rango ? "selected-horario" : ""
                      }`}
                      onClick={() => setSelectedHorario(t.rango)}
                    >
                      {t.rango}
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No hay horarios disponibles para esta fecha.</div>
              )}
            </>
          )}
        </div>
        <div className="horarios-container">
          {selectedDia && (
            <div className="horarios-dia-container">
              <h3 className="dia-container">Horarios</h3>
              <h3 className="dia-container">
                {daySelected.toLocaleDateString()}
              </h3>
              <ul>
                {slots.map((timeslots) => (
                  <li
                    key={timeslots.rango}
                    className={`horario ${
                      selectedHorario === timeslots.rango
                        ? "selected-horario"
                        : ""
                    }`}
                    onClick={() => handleSeleccionarHorario(timeslots.rango)}
                  >
                    {timeslots.rango}
                  </li>
                ))}
                {selectedHorario && (
                  <Button
                    variant="primary"
                    size="lg"
                    className="button-activity"
                    style={{
                      padding: "10px 30px",
                      fontSize: "1.2rem",
                      borderRadius: "30px",
                    }}
                    onClick={() => setShowModal(true)} // 👈 abre el modal
                  >
                    Inscribirse
                  </Button>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
      <InscriptionModal
        show={showModal}
        onClose={() => setShowModal(false)}
        dia={selectedDia}
        horario={selectedHorario}
        facultad={facultadSelected}
        carrera={carreraSelected}
        onConfirm={(payload) => {
          console.log("Inscripción confirmada:", payload);
          setShowModal(false);
        }}
      />
      ;
    </TabContent>
  );
};
