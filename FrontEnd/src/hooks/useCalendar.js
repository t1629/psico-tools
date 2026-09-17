import { useCallback, useEffect, useState } from "react";
import {
  getAll,
  getByDate as getAppointmentsByDate,
  getByPatient as getAppointmentsByPatient,
  getById as getAppointmentById,
  create as createAppointment,
  update as updateAppointment,
  remove as removeAppointment,
} from "../services/CalenderService";

export function useCalendar() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAll();
      setAppointments(
        Array.isArray(response) ? response : (response?.data ?? []),
      );
    } catch (requestError) {
      setError(requestError);
    } finally {
      setLoading(false);
    }
  }, []);

  const getByDate = useCallback(async (date) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAppointmentsByDate(date);
      const data = Array.isArray(response) ? response : (response?.data ?? []);
      setAppointments(data);
      return response;
    } catch (requestError) {
      setError(requestError);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, []);

  const getByPatient = useCallback(async (patientId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getAppointmentsByPatient(patientId);
      const data = Array.isArray(response) ? response : (response?.data ?? []);
      setAppointments(data);
      return response;
    } catch (requestError) {
      setError(requestError);
      throw requestError;
    } finally {
      setLoading(false);
    }
  }, []);

  const getById = useCallback((appointmentId) => {
    setError(null);
    return getAppointmentById(appointmentId).catch((requestError) => {
      setError(requestError);
      throw requestError;
    });
  }, []);

  const create = useCallback(
    async (data) => {
      const response = await createAppointment(data);
      await reload();
      return response;
    },
    [reload],
  );

  const update = useCallback(
    async (data) => {
      const response = await updateAppointment(data);
      await reload();
      return response;
    },
    [reload],
  );

  const remove = useCallback(
    async (appointmentId) => {
      const response = await removeAppointment(appointmentId);
      await reload();
      return response;
    },
    [reload],
  );

  useEffect(() => {
    let active = true;

    getAll()
      .then((response) => {
        if (active)
          setAppointments(
            Array.isArray(response) ? response : (response?.data ?? []),
          );
      })
      .catch((requestError) => {
        if (active) setError(requestError);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return {
    appointments,
    error,
    loading,
    reload,
    getByDate,
    getByPatient,
    getById,
    create,
    update,
    remove,
  };
}
