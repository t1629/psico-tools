import { useState } from "react";
import * as ConsultorioService from "../services/ConsultorioService";

export function useConsultorio() {
  const [consultorios, setConsultorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ConsultorioService.getAll();
      setConsultorios(Array.isArray(response) ? response : []);
    } catch (err) {
      setError(err.message || "Error al mostrar los consultorios");
    } finally {
      setLoading(false);
    }
  };

  const create = async (consultorio) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ConsultorioService.create(consultorio);
      setConsultorios((prev) => [...prev, response]);
      return { success: true, data: response };
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.title ||
        err.message ||
        "Error al crear el consultorio";
      setError(message);
      return { success: false, error: message };
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, consultorio) => {
    setLoading(true);
    setError(null);
    try {
      const response = await ConsultorioService.update(id, consultorio);
      setConsultorios((prev) => prev.map((c) => (c.Id === id ? response : c)));
      return { success: true, data: response };
    } catch (err) {
      setError(err.message || "Error al actualizar el consultorio");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await ConsultorioService.remove(id);
      setConsultorios((prev) => prev.filter((c) => c.Id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message || "Error al eliminar el consultorio");
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    consultorios,
    fetchAll,
    create,
    update,
    remove,
    loading,
    error,
  };
}
