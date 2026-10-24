// apiClient.js
export async function fetchApi(url, options = {}) {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      console.error("Detalle del backend:", errorData);

      // Armar un mensaje legible desde ProblemDetails / ModelState
      let detalle = errorData?.message || errorData?.title || "";

      if (errorData?.errors) {
        const items = Object.entries(errorData.errors).map(
          ([campo, mensajes]) =>
            `${campo}: ${
              Array.isArray(mensajes) ? mensajes.join(", ") : mensajes
            }`
        );
        detalle = detalle ? `${detalle} — ${items.join(" | ")}` : items.join(" | ");
      }

      throw new Error(
        detalle || `Error ${response.status} ${response.statusText}`
      );
    }

    // NUEVO: manejar respuestas sin contenido
    if (response.status === 204) {
      return null;
    }

    // NUEVO: comprobar si la respuesta contiene JSON
    const contentType = response.headers.get("content-type");

    if (contentType?.includes("application/json")) {
      return await response.json();
    }

    // NUEVO: si no es JSON, devolver null
    return null;

  } catch (error) {
    console.error("Error en la llamada a la API:", error);
    throw error;
  }
}