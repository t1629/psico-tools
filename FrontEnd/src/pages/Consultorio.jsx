import { useEffect } from "react";
import { useConsultorio } from "../hooks/useConsultorio";
import { useToast } from "../hooks/useToast";
import ConsultorioForm from "../components/ConsultorioForm";
import "../styles/UI/Consultorio.css";

export default function Consultorio() {
  const { consultorios, fetchAll, remove, loading, error } = useConsultorio();
  const toast = useToast();

  useEffect(() => {
    fetchAll();
  }, []);

  const handleRemove = async (consultorio) => {
    const result = await remove(consultorio.Id);
    if (result?.success) {
      toast.success(`Consultorio "${consultorio.Nombre}" eliminado con éxito.`);
    } else {
      toast.error(result?.error || "No se pudo eliminar el consultorio.");
    }
  };

  return (
    <div className="consultorios-page">
      <header className="consultorios-page__header">
        <p className="consultorios-page__eyebrow">Espacios de atención</p>
        <h1>Gestión de Consultorios</h1>
        <p className="consultorios-page__description">
          Crea los consultorios presenciales o virtuales donde realizas tus
          sesiones.
        </p>
      </header>

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
              <button onClick={() => handleRemove(c)} className="delete-btn">
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
