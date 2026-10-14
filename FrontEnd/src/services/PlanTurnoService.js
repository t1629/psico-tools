import { fetchApi } from "./apiClient";

const BASE_API_URL = import.meta.env.VITE_API_URL;

export async function getAll() {
  return await fetchApi(`${BASE_API_URL}/api/planTurno`);
}

export async function getById(id) {
  return fetchApi(`${BASE_API_URL}/api/planTurno/${id}`);
}

export async function getTurnosByPaciente(id) {
  return fetchApi(`${BASE_API_URL}/api/planTurno/${id}/paciente`);
}

export async function create(data) {
  return fetchApi(`${BASE_API_URL}/api/planTurno`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function update(id, data) {
  return fetchApi(`${BASE_API_URL}/api/planTurno/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return fetchApi(`${BASE_API_URL}/api/planTurno/${id}`, {
    method: "DELETE",
  });
}
