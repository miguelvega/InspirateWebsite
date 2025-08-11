import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const TestOVPG = () => {
  const [daySelected, onChangeDaySelected] = useState(new Date());

  const today = new Date();
  const lastDayYear = new Date(today.getFullYear(), 11, 31);

  const list = [
    {
      siglas_facultad: "FIIS",
      carrera: "Ingeniería de Sistemas",
      disponibilidades: [
        {
          dia: "18/2/2025",
          horario: [
            {
              rango: "9:00 am - 10:00am",
              voluntario: ["Deigo"],
            },
            {
              rango: "10:00 am - 11:00am",
              voluntario: ["Deigo"],
            },
          ],
        },
        {
          dia: "21/2/2025",
          horario: [
            {
              rango: "9:00 am - 10:00am",
              voluntario: ["Deigo"],
            },
            {
              rango: "11:00 am - 12:00am",
              voluntario: ["Deigo"],
            },
          ],
        },
      ],
    },
  ];
  const facultadSelected = "FIIS";
  const carreraSelected = "Ingeniería de Sistemas";

  function disableEmptyDays({ activeStartDate, date, view }) {
    let disable = false;
    list.flatMap((facultad) => {
      if (
        facultad.siglas_facultad === facultadSelected &&
        facultad.carrera === carreraSelected
      ) {
        let slotsAvailableThisDay = facultad.disponibilidades.filter(
          (disponibilidad) => disponibilidad.dia === date.toLocaleDateString()
        );
        if (slotsAvailableThisDay.length === 0) {
          disable = true;
          return disable;
        }
      } else disable = true;
    });
    return disable;
    //console.log(date.toLocaleDateString())
    //console.log(date.getDay() === 0)
    //console.log("---------")
    return date.getDay() === 0;
  }

  return (
    <>
      <div>
        <Calendar
          onChange={onChangeDaySelected}
          value={daySelected}
          minDate={today}
          maxDate={lastDayYear}
          locale="es-ES"
          minDetail="year"
          prev2Label={null}
          next2Label={null}
          tileDisabled={disableEmptyDays}
        />
      </div>
    </>
  );
};

export default TestOVPG;
