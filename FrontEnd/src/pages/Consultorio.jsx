import { useEffect } from "react";
import { useConsultorio } from "../hooks/useConsultorio";
import ConsultorioForm from "../components/ConsultorioForm";
import "../styles/UI/Consultorio.css";

export default function Consultorio() {
  const { consultorios, fetchAll, remove, loading, error } = useConsultorio();

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="consultorios-page">
      <h1>Gestión de Consultorios</h1>

      <ConsultorioForm />

      <h2>Consultorios Registrados</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className="form-error">Error: {String(error)}</p>}

      <ul className="consultorios-list">
        {consultorios.map((c) => (
          <li key={c.Id} className="consultorio-card">
            <strong>{c.Nombre}</strong> — {c.Calle} {c.Numero}
            <span>Modalidad: {c.TipoModalidadNombre}</span>
            <div className="actions">
              <button onClick={() => console.log("Editar", c)}>Editar</button>
              <button onClick={() => remove(c.Id)} className="delete-btn">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
