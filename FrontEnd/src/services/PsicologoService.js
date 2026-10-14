import { fetchApi } from "./apiClient";

const BASE_API_URL = import.meta.env.VITE_API_URL;

export async function getAll() {
  return fetchApi(`${BASE_API_URL}/api/psicologo`);
}

export async function getById(id) {
  return fetchApi(`${BASE_API_URL}/api/psicologo/${id}`);
}

export async function getPacienteByTurno(id) {
  return fetchApi(`${BASE_API_URL}/api/psicologo/${id}`);
}

export async function create(data) {
  return fetchApi(`${BASE_API_URL}/api/psicologo`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function update(id, data) {
  return fetchApi(`${BASE_API_URL}/api/psicologo/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return fetchApi(`${BASE_API_URL}/api/psicologo/${id}`, {
    method: "DELETE",
  });
}
