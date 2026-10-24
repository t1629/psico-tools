import { useState, useCallback } from "react";
import * as pacienteService from "../services/PacienteService";

export function usePaciente() {
  const [pacientes, setPacientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await pacienteService.getAll();
      setPacientes(data);
    } catch (err) {
      setError((err.message = "Error al obtener pacientes"));
    } finally {
      setLoading(false);
    }
  }, []);

  const create = async (paciente) => {
    setLoading(true);
    setError(null);
    try {
      const result = await pacienteService.create(paciente);
      await fetchAll();
      return { success: true, data: result };
    } catch (err) {
      const errMsg = (err.message = "Error al crear paciente");
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, paciente) => {
    setLoading(true);
    setError(null);
    try {
      const result = await pacienteService.update(paciente, id);
      await fetchAll();
      return { success: true, data: result };
    } catch (err) {
      const errMsg = (err.message = "Error al actualizar paciente");
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await pacienteService.remove(id);
      await fetchAll();
      return { success: true };
    } catch (err) {
      const errMsg = err.message || "Error al eliminar paciente";
      setError(errMsg);
      return { success: false, error: errMsg };
    } finally {
      setLoading(false);
    }
  };

  return {
    pacientes,
    loading,
    error,
    fetchAll,
    create,
    update,
    remove,
  };
}
