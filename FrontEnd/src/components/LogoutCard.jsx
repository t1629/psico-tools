import { useContext, useEffect } from "react";
import { Login as AuthContext } from "../context/authContext";
import "../styles/UI/LogoutCard.css";

// Motivo: convertir la confirmación en tarjeta flotante accesible
// (overlay + role=dialog) con los tokens del sistema. Se usa desde el
// popup del usuario en el Header; Escape o clic fuera = "No".
const LogoutForm = ({ onClose }) => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="logout-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="logout-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
      >
        <p id="logout-title">¿Estás seguro de cerrar sesión?</p>
        <div className="logout-card__actions">
          <button
            type="button"
            className="logout-card__confirm"
            onClick={logout}
          >
            Sí
          </button>
          <button
            type="button"
            className="logout-card__cancel"
            onClick={onClose}
            autoFocus
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutForm;
