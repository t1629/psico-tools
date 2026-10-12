import { useState, useEffect, useCallback } from "react";
import { getAll, create, remove } from "../services/PlanTurnoService";

export function usePlanTurno() {
  const [turnos, setTurnos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Cargar todos los turnos / planes
  const fetchTurnos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAll();
      setTurnos(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Error al obtener los turnos");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTurnos();
  }, [fetchTurnos]);

  // Crear un nuevo turno
  const createTurno = async (formData) => {
    try {
      const nuevoTurno = await create(formData);
      setTurnos((prev) => [...prev, nuevoTurno]);
      return { success: true, data: nuevoTurno };
    } catch (err) {
      return {
        success: false,
        error: err.message || "Error al crear el turno",
      };
    }
  };

  // Eliminar un turno
  const deleteTurno = async (id) => {
    try {
      await remove(id);
      setTurnos((prev) =>
        prev.filter((turno) => (turno.id || turno._id) !== id),
      );
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.message || "Error al eliminar el turno",
      };
    }
  };

  return {
    turnos,
    loading,
    error,
    fetchTurnos,
    createTurno,
    deleteTurno,
  };
}
