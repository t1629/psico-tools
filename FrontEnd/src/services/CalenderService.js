import { fetchApi } from "./apiClient";

const BASE_API_URL = import.meta.env.VITE_API_URL;

export async function getAll() {
  return fetchApi(`${BASE_API_URL}/api/agenda`);
}

export async function getByDate(date) {
  return fetchApi(`${BASE_API_URL}/api/agenda/${date}`);
}

export async function getById(id) {
  return fetchApi(`${BASE_API_URL}/api/agenda/${id}`);
}

export async function getByPatient(id) {
  return fetchApi(`${BASE_API_URL}/api/${id}/paciente`);
}

export async function create(data) {
  return fetchApi(`${BASE_API_URL}/api/agenda`, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function update(data) {
  return fetchApi(`${BASE_API_URL}/api/agenda`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return fetchApi(`${BASE_API_URL}/api/agenda/${id}`, {
    method: "DELETE",
  });
}
