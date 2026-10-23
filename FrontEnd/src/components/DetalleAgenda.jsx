import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCalendar } from "../hooks/useCalendar";

export default function DetalleAgenda() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { getById, remove } = useCalendar();

  const [agenda, setAgenda] = useState(null);

  useEffect(() => {
    getById(id)
      .then((data) => setAgenda(data))
      .catch(console.error);
  }, [id, getById]);

  if (!agenda) {
    return <p>Cargando agenda...</p>;
  }

  return (
    <div>
      <h1>{agenda.titulo}</h1>

      <p>
        <strong>Descripción:</strong>
        {agenda.descripcion}
      </p>

      <p>
        <strong>Fecha:</strong>
        {agenda.fecha}
      </p>

      <p>
        <strong>Hora inicio:</strong>
        {agenda.horaInicio}
      </p>

      <p>
        <strong>Hora fin:</strong>
        {agenda.horaFin}
      </p>

      <button onClick={() => navigate(`/agenda/editar/${agenda.agendaId}`)}>
        Editar
      </button>

      <button
        onClick={async () => {
          await remove(agenda.agendaId);
          navigate("/inicio");
        }}
      >
        Eliminar
      </button>
    </div>
  );
}
