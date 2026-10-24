import { useCallback, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCalendar } from "../hooks/useCalendar";
import ConfirmDialog from "./ConfirmDialog";
import "../styles/UI/DetalleAgenda.css";

export default function DetalleAgenda() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getById, remove } = useCalendar();

  const [agenda, setAgenda] = useState(null);
  const [errorCarga, setErrorCarga] = useState(null);
  const [actionError, setActionError] = useState(null);

  // Popup de confirmacion para eliminar (mismo patron que el listado):
  // "Sí" borra y redirige al inicio; "No" o Escape/clic fuera cancela.
  const [confirmarBorrado, setConfirmarBorrado] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const cargar = useCallback(() => {
    getById(id)
      .then((data) => {
        setAgenda(data);
        setErrorCarga(null);
      })
      .catch(() => setErrorCarga("No pudimos cargar la agenda."));
  }, [getById, id]);

  useEffect(() => {
    cargar();
  }, [cargar]);

  if (!agenda) {
    return (
      <main className="app-content agenda-detail">
        <div className="agenda-panel">
          {errorCarga ? (
            <div className="agenda-detail__notice" role="alert">
              <span>{errorCarga}</span>
              <button type="button" onClick={cargar}>
                Reintentar
              </button>
            </div>
          ) : (
            <p className="agenda-detail__state">Cargando agenda...</p>
          )}
        </div>
      </main>
    );
  }

  const abrirConfirmacion = () => setConfirmarBorrado(true);
  const cerrarConfirmacion = () => setConfirmarBorrado(false);

  const handleConfirmDelete = async () => {
    if (deleting) return;
    setDeleting(true);
    setActionError(null);
    try {
      await remove(agenda.agendaId);
      // Al confirmar "Sí" se vuelve al inicio (ruta real del Home).
      navigate("/inicio");
    } catch (err) {
      console.error("Error eliminando la agenda:", err);
      setActionError("No se pudo eliminar la agenda. Intentá de nuevo.");
      setDeleting(false);
      setConfirmarBorrado(false);
    }
  };

  return (
    <main className="app-content agenda-detail">
      <div className="agenda-panel">
        <header className="agenda-detail__header">
        <div>
          <p className="agenda-detail__eyebrow">Detalle del turno agendado</p>
          <h1>{agenda.titulo?.trim() || "Agenda"}</h1>
          <p className="agenda-detail__description">
            Todos los datos registrados para este turno.
          </p>
        </div>
        <div className="agenda-detail__badge" aria-live="polite">
          <strong>{agenda.estado?.trim() || "Sin estado"}</strong>
          <span>Estado</span>
        </div>
      </header>

      {actionError && (
        <div className="agenda-detail__notice" role="alert">
          <span>{actionError}</span>
          <button type="button" onClick={() => setActionError(null)}>
            Cerrar
          </button>
        </div>
      )}

      <section className="agenda-detail__card" aria-label="Datos del turno">
        <div className="agenda-detail__row">
          <span className="agenda-detail__label">Fecha</span>
          <span className="agenda-detail__value">{agenda.fecha}</span>
        </div>
        <div className="agenda-detail__row">
          <span className="agenda-detail__label">Hora inicio</span>
          <span className="agenda-detail__value">
            {typeof agenda.horaInicio === "string"
              ? agenda.horaInicio.slice(0, 5)
              : agenda.horaInicio}
          </span>
        </div>
        <div className="agenda-detail__row">
          <span className="agenda-detail__label">Hora fin</span>
          <span className="agenda-detail__value">
            {typeof agenda.horaFin === "string"
              ? agenda.horaFin.slice(0, 5)
              : agenda.horaFin}
          </span>
        </div>
        <div className="agenda-detail__row agenda-detail__row--wide">
          <span className="agenda-detail__label">Descripción</span>
          <span className="agenda-detail__value">
            {agenda.descripcion?.trim() || "Sin descripción"}
          </span>
        </div>
      </section>

      <div className="agenda-detail__actions">
        <button
          type="button"
          className="agenda-detail__button agenda-detail__button--primary"
          onClick={() => navigate(`/crearAgenda?id=${agenda.agendaId}`)}
        >
          Editar
        </button>
        <button
          type="button"
          className="agenda-detail__button agenda-detail__button--danger"
          onClick={abrirConfirmacion}
        >
          Eliminar
        </button>
      </div>

      {confirmarBorrado && (
        <ConfirmDialog
          title="¿Estás seguro que quieres eliminarlo?"
          onConfirm={handleConfirmDelete}
          onCancel={cerrarConfirmacion}
        />
      )}
      </div>
    </main>
  );
}
