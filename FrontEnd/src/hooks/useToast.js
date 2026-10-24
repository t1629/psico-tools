import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";

// Hook de consumo del sistema de notificaciones emergentes.
// Devuelve: { toasts, removeToast, success, error, info, warning }
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de <ToastProvider>");
  }
  return context;
}
