const BASE_URL = "http://localhost:5000/api";
export const apiClient = async (endpoint, option = {}) => {
  const config = {
    headers: {
      "Content-Type": "aplication/json",
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Error en servidor C#");
  }

  return response.json();
};
