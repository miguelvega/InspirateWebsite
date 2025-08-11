import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function InscriptionModal({
  show,
  onClose,
  onConfirm,
  dia,
  horario,
  facultad,
  carrera,
  initialValues = { nombre: "", email: "" },
}) {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (show) {
      setValues(initialValues);
      setTouched({});
    }
  }, [show, initialValues]);

  const diaTexto = dia
    ? dia.toLocaleDateString("es-ES", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "-";

  const isEmail = (s) => /\S+@\S+\.\S+/.test(s);
  const errors = {
    nombre: !values.nombre.trim() ? "Ingresa tu nombre" : "",
    email: !values.email.trim()
      ? "Ingresa tu correo"
      : !isEmail(values.email)
      ? "Correo inválido"
      : "",
  };
  const hasErrors = !!(errors.nombre || errors.email);

  const submit = (e) => {
    e.preventDefault();
    setTouched({ nombre: true, email: true });
    if (hasErrors) return;

    onConfirm({
      facultad,
      carrera,
      diaISO: dia ? dia.toISOString().slice(0, 10) : null,
      diaTexto,
      horario,
      ...values,
    });
  };

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Confirmar inscripción</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div style={{ marginBottom: 6 }}>
          <strong>Facultad:</strong> {facultad || "-"}
        </div>
        <div style={{ marginBottom: 6 }}>
          <strong>Carrera:</strong> {carrera || "-"}
        </div>
        <div style={{ marginBottom: 6 }}>
          <strong>Día:</strong> {diaTexto}
        </div>
        <div style={{ marginBottom: 12 }}>
          <strong>Horario:</strong> {horario || "-"}
        </div>

        <Form onSubmit={submit} noValidate>
          <Form.Group className="mb-3">
            <Form.Control
              placeholder="Nombre completo"
              value={values.nombre}
              onChange={(e) =>
                setValues((p) => ({ ...p, nombre: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, nombre: true }))}
              isInvalid={touched.nombre && !!errors.nombre}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="email"
              placeholder="Correo electrónico"
              value={values.email}
              onChange={(e) =>
                setValues((p) => ({ ...p, email: e.target.value }))
              }
              onBlur={() => setTouched((t) => ({ ...t, email: true }))}
              isInvalid={touched.email && !!errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-2 justify-content-end mt-4">
            <Button variant="secondary" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" disabled={hasErrors}>
              Aceptar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
