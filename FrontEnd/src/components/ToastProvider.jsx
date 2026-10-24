import { useCallback, useMemo, useState } from "react";
import { ToastContext } from "../context/ToastContext";
import ToastContainer from "./Toast";

// Proveedor único a nivel de App: cualquier ruta puede notificar eventos
// importantes (éxito, eliminación, error) mediante useToast().
const DURACION_POR_TIPO = {
  success: 4000,
  info: 5000,
  warning: 6000,
  error: 8000,
};

let contadorToast = 0;

export default function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(
    ({ type = "success", message, duration }) => {
      if (!message) return null;
      const id = ++contadorToast;
      const duracion = duration ?? DURACION_POR_TIPO[type] ?? 5000;

      setToasts((prev) => [...prev, { id, type, message }]);

      if (duracion > 0) {
        setTimeout(() => removeToast(id), duracion);
      }
      return id;
    },
    [removeToast],
  );

  const value = useMemo(
    () => ({
      toasts,
      removeToast,
      success: (message, options) =>
        addToast({ type: "success", message, ...options }),
      error: (message, options) =>
        addToast({ type: "error", message, ...options }),
      info: (message, options) => addToast({ type: "info", message, ...options }),
      warning: (message, options) =>
        addToast({ type: "warning", message, ...options }),
    }),
    [toasts, removeToast, addToast],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}
