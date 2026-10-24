import { create, getAll, remove } from "../services/PlanTurnoService";
import { useCallback, useEffect, useState } from "react";

export function usePlanTurno() {
  const [planes, setPlanes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPlanes = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await getAll();
      setPlanes(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err?.message || "Error al obtener los planes de turno");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPlanes();
  }, [fetchPlanes]);

  const createPlan = async (formData) => {
    try {
      const nuevoPlan = await create(formData);

      setPlanes((prev) => [...prev, nuevoPlan]);

      return {
        success: true,
        data: nuevoPlan,
      };
    } catch (err) {
      return {
        success: false,
        error: err?.message || "Error al crear el plan",
      };
    }
  };

  const deletePlan = async (id) => {
    try {
      await remove(id);

      setPlanes((prev) =>
        prev.filter((pl) => (pl.planTurnoId ?? pl.id ?? pl._id) !== id),
      );

      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err?.message || "Error al eliminar el plan",
      };
    }
  };

  return {
    planes,
    loading,
    error,
    fetchPlanes,
    createPlan,
    deletePlan,
  };
}
