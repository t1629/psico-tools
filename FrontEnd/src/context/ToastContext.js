// Contexto compartido del sistema de toasts.
// Archivo separado del provider para compatibilidad con Fast Refresh.
import { createContext } from "react";

export const ToastContext = createContext(null);
