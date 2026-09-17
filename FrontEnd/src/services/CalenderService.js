import { fetchApi } from "./apiClient";

export async function getAll() {
  return fetchApi("http://localhost:5008/api/agenda");
}

export async function getByDate(date) {
  //eso se ajustara mediante diaSemana y a su vez se dara en base al dia de la semana
  return fetchApi(`http://localhost:5008/api/agenda/${date}`);
}

export async function getById(id) {
  return fetchApi(`http://localhost:5008/api/agenda/${id}`);
}

export async function getByPatient(id) {
  return fetchApi(`http://localhost:5008/api/${id}/paciente`);
}

export async function create(data) {
  return fetchApi("http://localhost:5008/api/agenda", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function update(data) {
  return fetchApi(`http://localhost:5008/api/agenda`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function remove(id) {
  return fetchApi(`http://localhost:5008/api/agenda/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
