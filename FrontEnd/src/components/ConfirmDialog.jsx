import { useEffect } from "react";
import "../styles/UI/ConfirmDialog.css";

// Motivo: pedir confirmaccion antes de acciones destructivas (eliminar turno).
// Reutiliza el patron de LogoutCard: overlay + role=dialog accesible;
// Escape o clic fuera equivalen a "No".
const ConfirmDialog = ({ title, onConfirm, onCancel }) => {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onCancel();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  return (
    <div
      className="confirm-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel();
      }}
    >
      <div
        className="confirm-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
      >
        <p id="confirm-title">{title ?? "¿Estás seguro que quieres eliminarlo?"}</p>
        <div className="confirm-card__actions">
          <button
            type="button"
            className="confirm-card__danger"
            onClick={onConfirm}
          >
            Sí
          </button>
          <button
            type="button"
            className="confirm-card__cancel"
            onClick={onCancel}
            autoFocus
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
