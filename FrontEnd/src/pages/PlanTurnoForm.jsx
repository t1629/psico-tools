import { useState } from "react";
import { usePlanTurno } from "../hooks/usePlanTurno";
import "../styles/layout/PlanTurno.css";
import * as pacientesService from "../services/PacienteService";
import { useEffect } from "react";

export default function PlanTurnoForm() {
  const { turnos, loading, error, createTurno, deleteTurno } = usePlanTurno();

  const [paciente, setPaciente] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setPaciente(await pacientesService.getAll());
    };
    fetchData();
  }, []);

  const [form, setForm] = useState({
    paciente: null,
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
      setFormError("Agregar al paciente es obligatorio");
      return;
    }

    const payload = {
      pacienteId: form.paciente.pacienteId,
      pacienteNombre: form.paciente.nombre,
      pacienteApellido: form.paciente.apellido,
      fecha: form.fecha ? new Date(form.fecha).toISOString() : null,
    };

    const result = await createTurno(payload);

    if (result.success) {
      setSuccessMsg("¡Plan Turno creado con éxito!");
      setForm({
        fecha: "",
        observaciones: "",
      });
    } else {
      setFormError(result.error);
    }
  };

  const getEstadoBadgeClass = (estado) => {
    if (estado === "Confirmado")
      return "planturno-badge-estado planturno-badge-confirmado";
    if (estado === "Cancelado")
      return "planturno-badge-estado planturno-badge-cancelado";
    return "planturno-badge-estado planturno-badge-pendiente";
  };

  return (
    <div className="planturno-container">
      <div className="planturno-header">
        <h1 className="planturno-title">Gestión de Plan Turnos</h1>
        <p className="planturno-subtitle">
          Crea nuevos turnos y visualiza el listado en tiempo real.
        </p>
      </div>

      <div className="planturno-card-box">
        <h2 className="planturno-section-title">Registrar Nuevo Turno</h2>

        {formError && <div className="planturno-alert-error">{formError}</div>}

        {successMsg && (
          <div className="planturno-alert-success">{successMsg}</div>
        )}

        <form onSubmit={handleSubmit} className="planturno-form-grid">
          <div className="planturno-field-group">
            <label className="planturno-label"></label>
            Paciente
            <select
              value={form.paciente?.pacienteId || ""}
              onChange={(e) =>
                setForm({
                  ...form,
                  paciente: paciente.find(
                    (p) => p.pacienteId === Number(e.target.value),
                  ),
                })
              }
            >
              <option value="">Seleccione...</option>
              {paciente.map((p) => (
                <option key={p.pacienteId} value={p.pacienteId}>
                  {p.nombre} {p.apellido}
                </option>
              ))}
            </select>
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
