import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getById, create, update, remove } from "../services/TurnoService";
import TurnoForm from "../components/TurnoForm";
import "../styles/UI/TurnoForm.css";
const Turnos = () => {
  const { id } = useParams(); // si viene /turnos/:id
  const navigate = useNavigate();
  const [selectedTurno, setSelectedTurno] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getById(id)
        .then((res) => setSelectedTurno(res?.data ?? res))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSave = async (turno) => {
    try {
      setError(null);
      const response = selectedTurno
        ? await update(selectedTurno.turnoID, turno)
        : await create(turno);
      setSelectedTurno(response?.data ?? response);
    } catch (err) {
      setError(err.message ?? "No se pudo guardar el turno.");
    }
  };

  const handleRemove = async (turnoId) => {
    try {
      await remove(turnoId);
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
