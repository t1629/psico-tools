import { fetchApi } from "./apiClient";

const BASE_API_URL = import.meta.env.VITE_API_URL;

export async function getByRange(desde, hasta) {
  return fetchApi(`${BASE_API_URL}/api/turno?desde=${desde}&hasta=${hasta}`);
}

export async function getById(id) {
  return fetchApi(`${BASE_API_URL}/api/turno/${id}`);
}

export async function getPacienteByTurno(id) {
  return fetchApi(`${BASE_API_URL}/api/turno/${id}/paciente`);
}

export async function getTurnosByPaciente(id, pacienteId) {
  return fetchApi(`${BASE_API_URL}/api/turno/${id}/paciente/${pacienteId}`);
}

export async function create(data) {
  return fetchApi(`${BASE_API_URL}/api/turnos`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function update(id, data) {
  return fetchApi(`${BASE_API_URL}/api/turno/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function updateEstado(id, estado) {
  return fetchApi(`${BASE_API_URL}/api/turno/${id}/estado`, {
    method: "PUT",
    body: JSON.stringify({ estado }),
  });
}

export async function updateByPaciente(pacienteId, data) {
  return fetchApi(`${BASE_API_URL}/api/turno/paciente/${pacienteId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return fetchApi(`${BASE_API_URL}/api/turno/${id}`, {
    method: "DELETE",
  });
}
