import { useState } from "react";
import * as turnosService from "../services/TurnoService";
import { getWeekRange, isValidDate } from "../utils/dateUtils";

export function useTurno() {
  const [turnos, setTurnos] = useState([]);
  const [apellido, setApellido] = useState("");
  const [estado, setEstado] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTurnosALL = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await turnosService.getAll();
      setTurnos(data || []);
    } catch {
      setError("Error al cargar turnos");
    } finally {
      setLoading(false);
    }
  };

  const fetchTurnosSemana = async (date = new Date()) => {
    setLoading(true);
    setError(null);
    try {
      const { desde, hasta } = getWeekRange(date);
      const data = await turnosService.getByRange(desde, hasta);
      setTurnos(data || []);
    } catch {
      setError("Error al cargar turnos de la semana");
    } finally {
      setLoading(false);
    }
  };

  const validateTurno = (turno) => {
    if (!turno.fecha) throw new Error("La fecha es obligatoria");
    if (!isValidDate(turno.fecha))
      throw new Error("Formato de fecha inválido (YYYY-MM-DD)");
    if (!turno.hora) throw new Error("La hora es obligatoria");
    if (!/^\d{2}:\d{2}$/.test(turno.hora))
      throw new Error("Formato de hora inválido (HH:mm)");
    if (turno.minutos < 30)
      throw new Error("La duración mínima es de 30 minutos");
    if (turno.modalidadVirtual && !turno.url)
      throw new Error("Debe ingresar la URL de la sesión virtual");
    if (!turno.psicologoId) throw new Error("Debe seleccionar un psicólogo");
    if (!turno.pacienteId) throw new Error("Debe seleccionar un paciente");
  };

  const filterTurnos = () => {
    let filtrados = turnos;
    if (apellido) {
      filtrados = filtrados.filter((t) =>
        (t.paciente?.apellido ?? "")
          .toUpperCase()
          .startsWith(apellido.toUpperCase()),
      );
    }
    if (estado) {
      filtrados = filtrados.filter((t) => t.estado === estado);
    }
    return filtrados;
  };

  const saveTurno = async (turno) => {
    setLoading(true);
    setError(null);
    try {
      validateTurno(turno);
      if (turno.turnoId) {
        await turnosService.update(turno.turnoId, turno);
      } else {
        await turnosService.create(turno);
      }
      await fetchTurnosSemana();
    } catch (err) {
      setError(err.message || "Error al guardar turno");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeTurno = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await turnosService.remove(id);
      await fetchTurnosSemana();
    } catch {
      setError("Error al eliminar turno");
    } finally {
      setLoading(false);
    }
  };

  const markAsistio = async (id) => {
    try {
      const updated = await turnosService.update(id, { asistencia: true });
      setTurnos((prev) => prev.map((t) => (t.turnoId === id ? updated : t)));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.message || "Error al marcar asistencia",
      };
    }
  };

  const markAusente = async (id) => {
    try {
      const updated = await turnosService.update(id, { asistencia: false });
      setTurnos((prev) => prev.map((t) => (t.turnoId === id ? updated : t)));
      return { success: true };
    } catch (err) {
      return {
        success: false,
        error: err.message || "Error al marcar ausencia",
      };
    }
  };

  return {
    turnos,
    loading,
    error,
    apellido,
    estado,
    setApellido,
    setEstado,
    fetchTurnosALL,
    fetchTurnosSemana,
    filterTurnos,
    saveTurno,
    removeTurno,
    markAsistio,
    markAusente,
  };
}
