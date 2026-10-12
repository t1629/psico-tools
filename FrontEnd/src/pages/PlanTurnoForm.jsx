import React, { useState } from "react";
import { usePlanTurno } from "../hooks/usePlanTurno";
import "../styles/layout/PlanTurno.css";

export default function PlanTurnoForm() {
  const { turnos, loading, error, createTurno, deleteTurno } = usePlanTurno();

  const [form, setForm] = useState({
    pacienteId: "",
    estado: "Pendiente",
    fecha: "",
    observaciones: "",
  });

  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    if (!form.pacienteId) {
      setFormError("El ID del paciente es obligatorio.");
      return;
    }

    // Preparamos los datos adaptando el ID del paciente a número (ajustar si tu DB usa UUID/String)
    const payload = {
      ...form,
      pacienteId: Number(form.pacienteId),
      fecha: form.fecha ? new Date(form.fecha).toISOString() : null, // Estandariza la fecha a formato ISO si existe
    };

    const result = await createTurno(payload);

    if (result.success) {
      setSuccessMsg("¡Plan Turno creado con éxito!");
      setForm({
        pacienteId: "",
        estado: "Pendiente",
        fecha: "",
        observaciones: "",
      });
    } else {
      setFormError(result.error);
    }
  };

  // Función para obtener la clase dinámica del badge de estado
  const getEstadoBadgeClass = (estado) => {
    if (estado === "Confirmado")
      return "planturno-badge-estado planturno-badge-confirmado";
    if (estado === "Cancelado")
      return "planturno-badge-estado planturno-badge-cancelado";
    return "planturno-badge-estado planturno-badge-pendiente";
  };

  return (
    <div className="planturno-container">
      {/* Encabezado */}
      <div className="planturno-header">
        <h1 className="planturno-title">Gestión de Plan Turnos</h1>
        <p className="planturno-subtitle">
          Crea nuevos turnos y visualiza el listado en tiempo real.
        </p>
      </div>

      {/* Formulario centralizado */}
      <div className="planturno-card-box">
        <h2 className="planturno-section-title">Registrar Nuevo Turno</h2>

        {formError && <div className="planturno-alert-error">{formError}</div>}

        {successMsg && (
          <div className="planturno-alert-success">{successMsg}</div>
        )}

        <form onSubmit={handleSubmit} className="planturno-form-grid">
          <div className="planturno-field-group">
            <label className="planturno-label">ID del Paciente</label>
            <input
              type="number" // Cambiado a number para mejor control nativo de inputs numéricos
              name="pacienteId"
              value={form.pacienteId}
              onChange={handleChange}
              placeholder="Ej. 7"
              className="planturno-input"
            />
          </div>

          <div className="planturno-field-group">
            <label className="planturno-label">Fecha y Hora</label>
            <input
              type="datetime-local"
              name="fecha"
              value={form.fecha}
              onChange={handleChange}
              className="planturno-input"
            />
          </div>

          <div className="planturno-field-group">
            <label className="planturno-label">Observaciones</label>
            <input
              type="text"
              name="observaciones"
              value={form.observaciones}
              onChange={handleChange}
              placeholder="Detalles adicionales..."
              className="planturno-input"
            />
          </div>

          <div className="planturno-submit-wrapper">
            <button type="submit" className="planturno-btn-submit">
              Crear Turno
            </button>
          </div>
        </form>
      </div>

      {/* Listado en Cards */}
      <div className="planturno-list-section">
        <h2>Turnos Registrados</h2>

        {loading && <p className="planturno-msg-loading">Cargando turnos...</p>}
        {error && <p className="planturno-msg-error">{error}</p>}

        {!loading && turnos.length === 0 && (
          <p className="planturno-empty-state">
            No hay turnos registrados todavía.
          </p>
        )}

        <div className="planturno-cards-grid">
          {turnos.map((turno) => {
            const turnoId = turno.id || turno._id;
            return (
              <div key={turnoId} className="planturno-card">
                <div>
                  <div className="planturno-card-top">
                    <span className="planturno-badge-id">ID: {turnoId}</span>
                    <span className={getEstadoBadgeClass(turno.estado)}>
                      {turno.estado || "Pendiente"}
                    </span>
                  </div>

                  <div className="planturno-card-body">
                    <p>
                      <strong>Paciente ID:</strong>{" "}
                      {turno.pacienteId || turno.paciente?.id || "N/A"}
                    </p>
                    <p>
                      <strong>Fecha:</strong>{" "}
                      {turno.fecha
                        ? new Date(turno.fecha).toLocaleString()
                        : "No especificada"}
                    </p>
                    {turno.observaciones && (
                      <p>
                        <strong>Obs:</strong> {turno.observaciones}
                      </p>
                    )}
                  </div>
                </div>

                <div className="planturno-card-footer">
                  <button
                    onClick={() => deleteTurno(turnoId)}
                    className="planturno-btn-delete"
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
