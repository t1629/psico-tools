import { fetchApi } from "./apiClient";

const BASE_API_URL = import.meta.env.VITE_API_URL;

export async function getAll() {
  return await fetchApi(`${BASE_API_URL}/api/consultorio`);
}

export async function getById(id) {
  return await fetchApi(`${BASE_API_URL}/api/consultorio/${id}`);
}

export async function create(data) {
  return await fetchApi(`${BASE_API_URL}/api/consultorio`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function update(data, id) {
  return await fetchApi(`${BASE_API_URL}/api/consultorio/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return await fetchApi(`${BASE_API_URL}/api/consultorio/${id}`, {
    method: "DELETE",
  });
}