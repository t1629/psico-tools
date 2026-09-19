import { useState } from "react";

const TurnoForm = ({ onSave, onRemove, selectedTurno, onReset }) => {
  const [fecha, setFecha] = useState(selectedTurno?.fecha ?? "");
  const [hora, setHora] = useState(selectedTurno?.hora ?? "");
  const [estado, setEstado] = useState(selectedTurno?.estado ?? "pendiente");
  const [asistencia, setAsistencia] = useState(
    selectedTurno?.asistencia ?? false,
  );
  const [minutos, setMinutos] = useState(selectedTurno?.minutos ?? 60);
  const [modalidadVirtual, setModalidadVirtual] = useState(
    selectedTurno?.modalidadVirtual ?? false,
  );
  const [url, setUrl] = useState(selectedTurno?.url ?? "");
  const [cantidadTurnos, setCantidadTurnos] = useState(
    selectedTurno?.cantidadTurnos ?? 1,
  );
  const [psicologoID, setPsicologoID] = useState(
    selectedTurno?.psicologoID ?? "",
  );
  const [pacienteID, setPacienteID] = useState(selectedTurno?.pacienteID ?? "");
  const [planTurnoID, setPlanTurnoID] = useState(
    selectedTurno?.planTurnoID ?? "",
  );
  const [descripcion, setDescripcion] = useState(
    selectedTurno?.descripcion ?? "",
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const turno = {
      fecha,
      hora,
      estado,
      asistencia,
      minutos,
      modalidadVirtual,
      url: modalidadVirtual ? url : null,
      cantidadTurnos,
      psicologoID,
      pacienteID,
      planTurnoID,
      descripcion,
    };
    onSave(turno);
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
        {selectedTurno && (
          <button
            type="button"
            className="calendar-tools__danger"
            onClick={() => onRemove(selectedTurno.turnoID)}
          >
            Eliminar
          </button>
        )}
      </div>

      <label>
        Fecha
        <input
          type="date"
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          required
        />
      </label>

      <label>
        Hora
        <input
          type="time"
          value={hora}
          onChange={(e) => setHora(e.target.value)}
          required
        />
      </label>

      <label>
        Estado
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="pendiente">Pendiente</option>
          <option value="confirmado">Confirmado</option>
          <option value="cancelado">Cancelado</option>
        </select>
      </label>

      <label>
        Asistencia
        <input
          type="checkbox"
          checked={asistencia}
          onChange={(e) => setAsistencia(e.target.checked)}
        />
      </label>

      <label>
        Duración (minutos)
        <input
          type="number"
          value={minutos}
          onChange={(e) => setMinutos(Number(e.target.value))}
          min="15"
          step="15"
        />
      </label>

      <label>
        Modalidad virtual
        <input
          type="checkbox"
          checked={modalidadVirtual}
          onChange={(e) => setModalidadVirtual(e.target.checked)}
        />
      </label>

      {modalidadVirtual ? (
        <label>
          URL de sesión
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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
          value={cantidadTurnos}
          onChange={(e) => setCantidadTurnos(Number(e.target.value))}
          min="1"
        />
      </label>

      <label>
        Psicólogo ID
        <input
          type="text"
          value={psicologoID}
          onChange={(e) => setPsicologoID(e.target.value)}
          placeholder="Ej. 101"
        />
      </label>

      <label>
        Paciente ID
        <input
          type="text"
          value={pacienteID}
          onChange={(e) => setPacienteID(e.target.value)}
          placeholder="Ej. 42"
        />
      </label>

      <label>
        Plan Turno ID
        <input
          type="text"
          value={planTurnoID}
          onChange={(e) => setPlanTurnoID(e.target.value)}
          placeholder="Ej. 7"
        />
      </label>

      <label>
        Descripción
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
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
};

export default TurnoForm;
