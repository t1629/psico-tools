import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTurno } from "../hooks/useTurno";
import { TurnoCard } from "../components/TurnoCard";
import TurnoFilterPicker from "../components/TurnoFilterPicker";
import ConfirmDialog from "../components/ConfirmDialog";
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

  // Confirmacion de eliminacion: el popup pregunta "¿Estás seguro...?" y solo
  // con "Si" borra, avisa y redirige al inicio 2 segundos despues.
  const [turnoToDelete, setTurnoToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [deleted, setDeleted] = useState(false);
  const redirectTimerRef = useRef(null);

  const detenerRedireccion = () => {
    if (redirectTimerRef.current) {
      clearTimeout(redirectTimerRef.current);
      redirectTimerRef.current = null;
    }
  };

  useEffect(() => {
    fetchTurnosALL();
    // Limpieza: evita redirigir si el usuario ya salio de la pantalla.
    return () => detenerRedireccion();
  }, [fetchTurnosALL]);

  const handleEdit = (turno) => {
    detenerRedireccion();
    navigate(`/turnos/${turno.turnoId}`);
  };

  // "Eliminar" solo abre la confirmacion; el borrado ocurre con "Si".
  const handleRemove = (turnoId) => {
    setTurnoToDelete(turnoId);
  };

  const handleCancelDelete = () => {
    setTurnoToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!turnoToDelete || deleting) return;
    setDeleting(true);
    const resultado = await removeTurno(turnoToDelete);
    setDeleting(false);
    setTurnoToDelete(null);
    if (resultado?.success) {
      setDeleted(true);
      redirectTimerRef.current = setTimeout(() => navigate("/inicio"), 2000);
    }
    // Si fallo, el error queda visible en el aviso de la pagina y no redirige.
  };

  // Se calcula una sola vez por render (lista + contador + estado vacio).
  const turnosFiltrados = filterTurnos();

  return (
    <main className="app-content turnos-all-page">
      <div className="turnos-panel">
        <header className="calendar-page__header">
          <div>
            <p className="calendar-page__eyebrow">Agenda clínica</p>
            <h1>Turnos</h1>
            <p className="calendar-page__description">
              Filtra y gestiona los turnos registrados.
            </p>
          </div>
          <div className="calendar-page__summary" aria-live="polite">
            <strong>{turnosFiltrados.length}</strong>
            <span>turnos</span>
          </div>
        </header>

        {loading && <p>Cargando turnos...</p>}
        {deleting && <p>Eliminando turno...</p>}
        {error && (
          <div className="calendar-page__notice" role="alert">
            <span>{error}</span>
            <button type="button" onClick={() => setError(null)}>
              Cerrar
            </button>
          </div>
        )}
        {deleted && (
          <div className="calendar-page__notice" role="status">
            <span>Turno eliminado. Redirigiendo al inicio...</span>
          </div>
        )}

        <TurnoFilterPicker
          apellido={apellido}
          estado={estado}
          setApellido={setApellido}
          setEstado={setEstado}
        />

        {turnosFiltrados.length > 0 && (
          <div className="turnos-list">
            {turnosFiltrados.map((turno) => (
              <TurnoCard
                key={turno.turnoId}
                turno={turno}
                onEdit={handleEdit}
                onRemove={handleRemove}
              />
            ))}
          </div>
        )}

        {!loading && !error && turnosFiltrados.length === 0 && (
          <div className="turnos-list__empty">
            <p>No hay turnos que coincidan con el filtro.</p>
            {(apellido || estado) && (
              <button
                type="button"
                onClick={() => {
                  setApellido("");
                  setEstado("");
                }}
              >
                Limpiar filtros
              </button>
            )}
          </div>
        )}

        <button
          className="calendar-tools__primary"
          onClick={() => navigate("/turnos/nuevo")}
        >
          Crear nuevo turno
        </button>

        {turnoToDelete && (
          <ConfirmDialog
            title="¿Estás seguro que quieres eliminarlo?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
      </div>
    </main>
  );
}
