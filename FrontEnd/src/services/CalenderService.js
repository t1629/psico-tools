import { fetchApi } from "./apiClient";

//en el caso de cambair la url solo cambiamos el valor de la variable y no toda la estructura
const CALENDER_BASE_API_URL = "http://localhost:5008";

export async function getAll() {
  return fetchApi(`${CALENDER_BASE_API_URL}/api/agenda`);
}

export async function getByDate(date) {
  //eso se ajustara mediante diaSemana y a su vez se dara en base al dia de la semana
  return fetchApi(`${CALENDER_BASE_API_URL}/api/agenda/${date}`);
}

export async function getById(id) {
  return fetchApi(`${CALENDER_BASE_API_URL}/api/agenda/${id}`);
}

export async function getByPatient(id) {
  return fetchApi(`${CALENDER_BASE_API_URL}/api/${id}/paciente`);
}

export async function create(data) {
  return fetchApi(`${CALENDER_BASE_API_URL}/api/agenda`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function update(data) {
  return fetchApi(`${CALENDER_BASE_API_URL}/api/agenda`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return fetchApi(`${CALENDER_BASE_API_URL}/api/agenda/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
