import { useState, useEffect } from "react";
import * as psicologoService from "../services/PsicologoService";

export function usePsicologo() {
  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAll = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await psicologoService.getAll();
      setPsicologos(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const create = async (dto) => {
    setLoading(true);
    setError(null);
    try {
      const result = await psicologoService.create(dto);
      setPsicologos((prev) => [...prev, result]);
      return { success: true, data: result };
    } catch (err) {
      setError(err);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, dto) => {
    try {
      const result = await psicologoService.update(id, dto);
      setPsicologos((prev) =>
        prev.map((p) => (p.psicologoId === id ? result : p)),
      );
      return result;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const remove = async (id) => {
    try {
      await psicologoService.remove(id);
      setPsicologos((prev) => prev.filter((p) => p.psicologoId !== id));
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return { psicologos, loading, error, fetchAll, create, update, remove };
}
