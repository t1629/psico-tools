import { useState } from "react";
import { useTurno } from "../hooks/useTurno";

export default function TurnoForm({ selectedTurno, onReset, onSave }) {
  const { saveTurno } = useTurno();

  const [turno, setTurno] = useState({
    fecha: "",
    hora: "",
    estado: "pendiente",
    asistencia: false,
    minutos: 30,
    modalidadVirtual: false,
    cantidadTurnos: 1,
    psicologoId: "",
    pacienteId: "",
    planTurnoId: "",
    descripcion: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveTurno(turno);
      onSave(turno);
      onReset?.();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="calendar-tools__editor" onSubmit={handleSubmit}>
      <div className="calendar-tools__editor-heading">
        <div>
          <strong>{selectedTurno ? "Editar turno" : "Nuevo turno"}</strong>
          <span>
            {selectedTurno
              ? "Modifica los datos del turno seleccionado."
              : "Completa los datos para crear un turno."}
          </span>
        </div>
      </div>

      <label>
        Fecha
        <input
          type="date"
          value={turno.fecha}
          onChange={(e) => setTurno({ ...turno, fecha: e.target.value })}
          required
        />
      </label>

      <label>
        Hora
        <input
          type="time"
          value={turno.hora}
          onChange={(e) => setTurno({ ...turno, hora: e.target.value })}
          required
        />
      </label>

      <label>
        Estado
        <select
          value={turno.estado}
          onChange={(e) => setTurno({ ...turno, estado: e.target.value })}
        >
          <option value="pendiente">Pendiente</option>
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </label>

      <label className="checkbox-label">
        Asistencia
        <input
          type="checkbox"
          checked={turno.asistencia}
          onChange={(e) => setTurno({ ...turno, asistencia: e.target.checked })}
        />
      </label>

      <label>
        Duración (minutos)
        <input
          type="number"
          value={turno.minutos}
          onChange={(e) =>
            setTurno({ ...turno, minutos: Number(e.target.value) || 0 })
          }
          min="15"
          step="15"
        />
      </label>

      <label className="checkbox-label">
        Modalidad virtual
        <input
          type="checkbox"
          checked={turno.modalidadVirtual}
          onChange={(e) =>
            setTurno({ ...turno, modalidadVirtual: e.target.checked })
          }
        />
      </label>

      {turno.modalidadVirtual ? (
        <label>
          URL de sesión
          <input
            type="text"
            value={turno.url ?? ""}
            onChange={(e) => setTurno({ ...turno, url: e.target.value })}
            placeholder="https://meet.google.com/..."
          />
        </label>
      ) : (
        <p className="turno-form__presencial">Modalidad presencial</p>
      )}

      <label>
        Cantidad de turnos
        <input
          type="number"
          value={turno.cantidadTurnos}
          onChange={(e) =>
            setTurno({ ...turno, cantidadTurnos: Number(e.target.value) || 1 })
          }
          min="1"
        />
      </label>

      <label>
        Psicólogo ID
        <input
          type="text"
          value={turno.psicologoId}
          onChange={(e) => setTurno({ ...turno, psicologoId: e.target.value })}
          placeholder="Ej. 101"
        />
      </label>

      <label>
        Paciente ID
        <input
          type="text"
          value={turno.pacienteId}
          onChange={(e) => setTurno({ ...turno, pacienteId: e.target.value })}
          placeholder="Ej. 42"
        />
      </label>

      <label>
        Plan Turno ID
        <input
          type="text"
          value={turno.planTurnoId}
          onChange={(e) => setTurno({ ...turno, planTurnoId: e.target.value })}
          placeholder="Ej. 7"
        />
      </label>

      <label>
        Descripción
        <textarea
          value={turno.descripcion}
          onChange={(e) => setTurno({ ...turno, descripcion: e.target.value })}
          placeholder="Ej: Consulta con Felipe o Descanso"
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
