import { fetchApi } from "./apiClient";

export async function Login(email, password) {
  const LOGIN_BASE_API_URL = "http://localhost:5008";

  const data = await fetchApi(`${LOGIN_BASE_API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ Email: email, PasswordHash: password }),
  });
  localStorage.setItem("token", data.token);
  return data;
}

export async function session(token) {
  const SESSION_BASE_API_URL = "http://localhost:5008";

  return fetchApi(`${SESSION_BASE_API_URL}/api/session`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
