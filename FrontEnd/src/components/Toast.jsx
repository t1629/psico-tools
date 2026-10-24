import { ToastContext } from "../context/ToastContext";
import { useContext } from "react";
import "../styles/UI/Toast.css";

// Mapa de roles ARIA: status = éxito/info (cortesía), alert = error/warning.
const ROLE_POR_TIPO = {
  success: "status",
  info: "status",
  warning: "alert",
  error: "alert",
};

const ETIQUETA_POR_TIPO = {
  success: "Éxito",
  error: "Error",
  warning: "Advertencia",
  info: "Información",
};

function Toast({ type, message, onDismiss }) {
  return (
    <div className={`toast toast--${type}`} role={ROLE_POR_TIPO[type]}>
      <p className="toast__message">
        <span className="visually-hidden">{ETIQUETA_POR_TIPO[type]}: </span>
        {message}
      </p>
      <button
        type="button"
        className="toast__close"
        onClick={onDismiss}
        aria-label="Cerrar notificación"
      >
        <span aria-hidden="true">×</span>
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const { toasts, removeToast } = useContext(ToastContext);

  if (toasts.length === 0) return null;

  return (
    <div className="toast-container" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <Toast
          key={t.id}
          type={t.type}
          message={t.message}
          onDismiss={() => removeToast(t.id)}
        />
      ))}
    </div>
  );
}
