// apiClient.js
export async function fetchApi(url, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    console.log("🌐 URL que se está consultando:", url);
    console.log("🔑 Token:", token ? "Existe" : "NO EXISTE");

    const response = await fetch(url, { ...options, headers });
    console.log("📡 Status:", response.status);
    console.log("📡 Response URL:", response.url);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Detalle del backend:", errorData);
      throw new Error(`Error ${response.status} ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
}
