import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTurno } from "../hooks/useTurno";
import { TurnoCard } from "../components/TurnoCard";
import TurnoFilterPicker from "../components/TurnoFilterPicker";
import "../styles/UI/TurnoList.css";

export default function TurnoAll() {
  const {
    filterTurnos,
    fetchTurnosALL,
    removeTurno,
    apellido,
    estado,
    setApellido,
    setEstado,
    loading,
    error,
    setError,
  } = useTurno();

  const navigate = useNavigate();

  useEffect(() => {
    fetchTurnosALL();
  }, []);

  const handleEdit = (turno) => {
    navigate(`/turnos/${turno.turnoId}`);
  };

  const handleRemove = async (id) => {
    await removeTurno(id);
  };

  return (
    <main className="app-content turnos-all-page">
      <header className="turnos-all-page__header">
        <p className="turnos-all-page__eyebrow">Programación</p>
        <h1>Listado de Turnos</h1>
        <p className="turnos-all-page__description">
          Consulta y filtra todos los turnos agendados; edita o elimina cada
          cita cuando lo necesites.
        </p>
      </header>

      {loading && <p>Cargando turnos...</p>}
      {error && (
        <div className="calendar-page__notice" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)}>
            Cerrar
          </button>
        </div>
      )}

      <TurnoFilterPicker
        apellido={apellido}
        estado={estado}
        setApellido={setApellido}
        setEstado={setEstado}
      />

      <div className="turnos-list">
        {filterTurnos().map((turno) => (
          <TurnoCard
            key={turno.turnoId}
            turno={turno}
            onEdit={handleEdit}
            onRemove={handleRemove}
          />
        ))}
      </div>

      <button
        className="calendar-tools__primary"
        onClick={() => navigate("/turnos/nuevo")}
      >
        Crear nuevo turno
      </button>
    </main>
  );
}
