import { usePlanTurno } from "../hooks/usePlanTurno";
import * as pacientesService from "../services/PacienteService";
import { useEffect, useState } from "react";
import "../styles/layout/PlanTurno.css";

export default function PlanTurnoForm() {
  const { planes, loading, error, createPlan, deletePlan } = usePlanTurno();

  const [pacientes, setPacientes] = useState([]);

  const [form, setForm] = useState({
    paciente: null,
    fechaInicio: "",
    fechaFin: "",
    cantidadTurno: "",
  });

  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await pacientesService.getAll();
        setPacientes(Array.isArray(data) ? data : []);
      } catch (err) {
        setFormError("No se pudieron cargar los pacientes.");
      }
    };

    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "pacienteId") {
      const pacienteSeleccionado =
        pacientes.find((p) => p.pacienteId === Number(value)) || null;

      setForm((prev) => ({
        ...prev,
        paciente: pacienteSeleccionado,
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setFormError(null);
    setSuccessMsg(null);

    if (!form.paciente) {
      setFormError("Seleccionar un paciente es obligatorio.");
      return;
    }

    if (!form.fechaInicio || !form.fechaFin) {
      setFormError("Las fechas de inicio y fin son obligatorias.");
      return;
    }

    if (!form.cantidadTurno || Number(form.cantidadTurno) < 1) {
      setFormError("La cantidad de turnos es obligatoria y debe ser mayor a 0.");
      return;
    }

    const fechaInicio = new Date(form.fechaInicio);
    const fechaFin = new Date(form.fechaFin);

    if (
      Number.isNaN(fechaInicio.getTime()) ||
      Number.isNaN(fechaFin.getTime())
    ) {
      setFormError("Las fechas ingresadas no son válidas.");
      return;
    }

    if (fechaFin <= fechaInicio) {
      setFormError(
        "La fecha y hora de fin debe ser posterior a la fecha y hora de inicio."
      );
      return;
    }

    const payload = {
      pacienteId: form.paciente.pacienteId,
      // El backend usa DateOnly: solo acepta "YYYY-MM-DD" (sin hora).
      fechaInicio: form.fechaInicio.slice(0, 10),
      fechaFin: form.fechaFin.slice(0, 10),
      cantidadTurno: Number(form.cantidadTurno),
    };

    try {
      const result = await createPlan(payload);

      if (result.success) {
        setSuccessMsg("¡Plan de turno creado con éxito!");

        setForm({
          paciente: null,
          fechaInicio: "",
          fechaFin: "",
          cantidadTurno: "",
        });
      } else {
        setFormError(result.error || "Error al crear el plan de turno.");
      }
    } catch (err) {
      setFormError("Ocurrió un error al crear el plan de turno.");
    }
  };

  const handleDelete = async (id) => {
    const result = await deletePlan(String(id));

    if (!result.success) {
      setFormError(result.error || "No se pudo eliminar el plan.");
      return;
    }

    setSuccessMsg("Plan de turno eliminado correctamente.");
    setFormError(null);
  };

  return (
    <div className="planturno-container">
      <div className="planturno-header">
        <h2 className="planturno-title">Gestión de Planes de Turnos</h2>
        <p className="planturno-subtitle">
          Crea nuevos planes de turnos y visualiza los registrados.
        </p>
      </div>

      {formError && (
        <div className="planturno-alert-error" role="alert">
          {formError}
        </div>
      )}

      {successMsg && (
        <div className="planturno-alert-success" role="status">
          {successMsg}
        </div>
      )}

      <section className="planturno-card-box">
        <h2 className="planturno-section-title">Crear Plan de Turno</h2>

        <form className="planturno-form-grid" onSubmit={handleSubmit}>
          <div className="planturno-field-group">
            <label className="planturno-label" htmlFor="pacienteId">
              Paciente
            </label>

            <select
              className="planturno-select"
              id="pacienteId"
              name="pacienteId"
              value={form.paciente?.pacienteId ?? ""}
              onChange={handleChange}
              required
            >
              <option value="">Seleccione un paciente...</option>

              {pacientes.map((p) => (
                <option key={p.pacienteId} value={p.pacienteId}>
                  {p.nombre} {p.apellido}
                </option>
              ))}
            </select>
          </div>

          <div className="planturno-field-group">
            <label className="planturno-label" htmlFor="fechaInicio">
              Fecha y hora de inicio (desde)
            </label>

            <input
              className="planturno-input"
              id="fechaInicio"
              name="fechaInicio"
              type="datetime-local"
              value={form.fechaInicio}
              onChange={handleChange}
              required
            />
          </div>

          <div className="planturno-field-group">
            <label className="planturno-label" htmlFor="fechaFin">
              Fecha y hora de fin (hasta)
            </label>

            <input
              className="planturno-input"
              id="fechaFin"
              name="fechaFin"
              type="datetime-local"
              value={form.fechaFin}
              onChange={handleChange}
              required
            />
          </div>

          <div className="planturno-field-group">
            <label className="planturno-label" htmlFor="cantidadTurno">
              Cantidad de turnos
            </label>

            <input
              className="planturno-input"
              id="cantidadTurno"
              name="cantidadTurno"
              type="number"
              min="1"
              value={form.cantidadTurno}
              onChange={handleChange}
              required
            />
          </div>

          <div className="planturno-submit-wrapper">
            <button
              type="submit"
              className="planturno-btn-submit"
              disabled={loading}
            >
              Crear Plan
            </button>
          </div>
        </form>
      </section>

      <section className="planturno-list-section">
        <h2>Planes de Turnos Registrados</h2>

        {loading && (
          <p className="planturno-msg-loading">Cargando planes de turnos...</p>
        )}

        {error && (
          <div className="planturno-msg-error" role="alert">
            Error: {error}
          </div>
        )}

        {!loading && planes.length === 0 && (
          <p className="planturno-empty-state">
            No hay ningún plan de turnos registrado todavía.
          </p>
        )}

        <div className="planturno-cards-grid">
          {planes.map((item, index) => {
            const id = item.planTurnoId ?? item.id ?? item._id;

            const finalizado =
              item.fechaFin && new Date(item.fechaFin) < new Date();

            return (
              <article className="planturno-card" key={id ?? index}>
                <div className="planturno-card-top">
                  <span className="planturno-badge-id">
                    Plan #{id ?? "N/A"}
                  </span>

                  <span
                    className={`planturno-badge-estado ${
                      finalizado
                        ? "planturno-badge-cancelado"
                        : "planturno-badge-pendiente"
                    }`}
                  >
                    {finalizado ? "Finalizado" : "Pendiente"}
                  </span>
                </div>

                <div className="planturno-card-body">
                  <p>
                    <strong>Paciente(s):</strong>{" "}
                    {Array.isArray(item.pacientes) && item.pacientes.length > 0
                      ? item.pacientes
                          .map((pac) =>
                            `${pac.nombre ?? ""} ${pac.apellido ?? ""}`.trim()
                          )
                          .join(", ")
                      : "N/A"}
                  </p>

                  <p>
                    <strong>Cantidad de turnos:</strong>{" "}
                    {item.cantidadTurno ?? "N/A"}
                  </p>

                  <p>
                    <strong>Fecha de inicio:</strong>{" "}
                    {item.fechaInicio
                      ? new Date(item.fechaInicio).toLocaleString()
                      : "No especificada"}
                  </p>

                  <p>
                    <strong>Fecha de fin:</strong>{" "}
                    {item.fechaFin
                      ? new Date(item.fechaFin).toLocaleString()
                      : "No especificada"}
                  </p>
                </div>

                <div className="planturno-card-footer">
                  <button
                    type="button"
                    className="planturno-btn-delete"
                    onClick={() => handleDelete(id)}
                    disabled={id == null}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
