import { fetchApi } from "./apiClient";

export async function Login(email, password) {
  const BASE_API_URL = import.meta.env.VITE_API_URL;

  const data = await fetchApi(`${BASE_API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Email: email, PasswordHash: password }),
  });
  localStorage.setItem("token", data.token);
  return data;
}

export async function session() {
  const BASE_API_URL = import.meta.env.VITE_API_URL;

  // No enviar Authorization explícito aquí: fetchApi lee el token desde localStorage
  // y añade el header si existe. Evita enviar "Bearer undefined" cuando no
  // se pasa token explícitamente.
  return fetchApi(`${BASE_API_URL}/api/session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
