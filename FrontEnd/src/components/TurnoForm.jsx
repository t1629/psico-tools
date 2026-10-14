import { useState, useEffect } from "react";
import { useTurno } from "../hooks/useTurno";
import * as psicologosService from "../services/PsicologoService";
import * as pacientesService from "../services/PacienteService";
import * as planesService from "../services/PlanTurnoService";

export default function TurnoForm({ selectedTurno, onReset, onSave }) {
  const { saveTurno } = useTurno();

  const [psicologos, setPsicologos] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [planes, setPlanes] = useState([]);

  const [turno, setTurno] = useState({
    fecha: "",
    hora: "",
    estado: "pendiente",
    asistencia: false,
    minutos: 30,
    modalidadVirtual: false,
    cantidadTurnos: 1,
    psicologo: null,
    paciente: null,
    planTurno: null,
    descripcion: "",
    url: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setPsicologos(await psicologosService.getAll());
      setPacientes(await pacientesService.getAll());
      setPlanes(await planesService.getAll());
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...turno,
        psicologoId: turno.psicologo?.psicologoId,
        pacienteId: turno.paciente?.pacienteId,
        planTurnoId: turno.planTurno?.planTurnoId,
      };
      await saveTurno(payload);
      onSave(payload);
      onReset?.();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="calendar-tools__editor" onSubmit={handleSubmit}>
      <label>
        Psicólogo
        <select
          value={turno.psicologo?.psicologoId || ""}
          onChange={(e) =>
            setTurno({
              ...turno,
              psicologo: psicologos.find(
                (p) => p.psicologoId === Number(e.target.value),
              ),
            })
          }
        >
          <option value="">Seleccione...</option>
          {psicologos.map((p) => (
            <option key={p.psicologoId} value={p.psicologoId}>
              {p.nombre} {p.apellido}
            </option>
          ))}
        </select>
      </label>

      <label>
        Paciente
        <select
          value={turno.paciente?.pacienteId || ""}
          onChange={(e) =>
            setTurno({
              ...turno,
              paciente: pacientes.find(
                (p) => p.pacienteId === Number(e.target.value),
              ),
            })
          }
        >
          <option value="">Seleccione...</option>
          {pacientes.map((p) => (
            <option key={p.pacienteId} value={p.pacienteId}>
              {p.nombre} {p.apellido}
            </option>
          ))}
        </select>
      </label>

      <label>
        Plan de Turno
        <select
          value={turno.planTurno?.planTurnoId || ""}
          onChange={(e) =>
            setTurno({
              ...turno,
              planTurno: planes.find(
                (pl) => pl.planTurnoId === Number(e.target.value),
              ),
            })
          }
        >
          <option value="">Seleccione...</option>
          {planes.map((pl) => (
            <option key={pl.planTurnoId} value={pl.planTurnoId}>
              {pl.planTurnoNombre}
            </option>
          ))}
        </select>
      </label>

      <label>
        Descripción
        <textarea
          value={turno.descripcion}
          onChange={(e) => setTurno({ ...turno, descripcion: e.target.value })}
          placeholder="Ej: Consulta con Felipe o reunions con el equipo"
        />
      </label>

      <div className="calendar-tools__editor-actions">
        <button type="submit">
          {selectedTurno ? "Guardar cambios" : "Crear turno"}
        </button>
        {selectedTurno && onReset && (
          <button
            type="button"
            className="calendar-tools__secondary"
            onClick={onReset}
          >
            Nuevo
          </button>
        )}
      </div>
    </form>
  );
}
