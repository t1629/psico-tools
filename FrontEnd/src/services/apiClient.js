export async function fetchApi(url, options = {}) {
  try {
    const response = await fetch(url, options);
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
