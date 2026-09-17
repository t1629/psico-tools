import { fetchApi } from "./apiClient";

export async function Login(email, password) {
  const data = await fetchApi("http://localhost:5008/api/login", {
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
  return fetchApi("http://localhost:5008/api/session", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}
