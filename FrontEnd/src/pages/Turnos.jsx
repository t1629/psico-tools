import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTurno } from "../hooks/useTurno";
import TurnoForm from "../components/TurnoForm";
import "../styles/UI/TurnoForm.css";

const Turnos = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    turnos,
    fetchTurnosALL,
    saveTurno,
    removeTurno,
    loading,
    error,
    setError,
  } = useTurno();
  const [selectedTurno, setSelectedTurno] = useState(null);

  useEffect(() => {
    const cargarTurno = async () => {
      await fetchTurnosALL();
      if (id) {
        const turnoEncontrado = turnos.find(
          (t) => String(t.turnoId) === String(id),
        );
        setSelectedTurno(turnoEncontrado ?? null);
      }
    };
    cargarTurno();
  }, [id]);

  const handleSave = async (turno) => {
    try {
      await saveTurno(turno);
      setSelectedTurno(null);
      navigate("/");
    } catch (err) {
      setError(err.message ?? "No se pudo guardar el turno.");
    }
  };

  const handleRemove = async (turnoId) => {
    try {
      await removeTurno(turnoId);
      navigate("/");
    } catch (err) {
      setError(err.message ?? "No se pudo eliminar el turno.");
    }
  };

  return (
    <main className="app-content turnos-page">
      {loading && <p>Cargando turno...</p>}
      {error && (
        <div className="calendar-page__notice" role="alert">
          <span>{error}</span>
          <button type="button" onClick={() => setError(null)}>
            Cerrar
          </button>
        </div>
      )}

      <TurnoForm
        onSave={handleSave}
        onRemove={handleRemove}
        selectedTurno={selectedTurno}
        onReset={() => setSelectedTurno(null)}
      />
    </main>
  );
};

export default Turnos;
