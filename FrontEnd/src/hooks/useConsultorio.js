import { useState } from "react";
import ConsultorioService from "../services/ConsultorioService";

export function useConsultorio() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const create = async (consultorio) => {
    setLoading(true);
    setError(null);

    try {
      const response = await ConsultorioService.create(consultorio);

      return {
        success: true,
        data: response,
      };
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.title ||
        err.message ||
        "Error al crear el consultorio";

      setError(message);

      return {
        success: false,
        error: message,
      };
    } finally {
      setLoading(false);
    }
  };

  return {
    create,
    loading,
    error,
  };
}