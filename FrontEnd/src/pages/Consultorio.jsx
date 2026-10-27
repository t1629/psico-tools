import { useState, useEffect } from "react";
import { useConsultorio } from "../hooks/useConsultorio";
import { useToast } from "../hooks/useToast";
import ConsultorioForm from "../components/ConsultorioForm";
import "../styles/UI/Consultorio.css";

export default function Consultorio() {
  const { consultorios, fetchAll, remove, loading, error } = useConsultorio();
  const toast = useToast();

  // Estado que guarda el consultorio que se quiere editar (se pasa al form)
  const [consultorioAEditar, setConsultorioAEditar] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

  const handleRemove = async (consultorio) => {
    const consultorioId =
      consultorio.consultorioId ?? consultorio.id ?? consultorio.Id;

    if (!consultorioId) {
      toast.error("No se pudo identificar el ID del consultorio.");
      return;
    }

    const result = await remove(consultorioId);
    if (result?.success) {
      toast.success("Consultorio eliminado con éxito.");
      fetchAll();
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

      {/* El formulario recibe el consultorio a editar y funciones de refresco */}
      <ConsultorioForm
        consultorioAEditar={consultorioAEditar}
        onSaved={() => {
          setConsultorioAEditar(null);
          fetchAll();
        }}
        onCancel={() => setConsultorioAEditar(null)}
      />

      <h2>Consultorios Registrados</h2>
      {loading && <p>Cargando...</p>}
      {error && <p className="form-error">Error: {String(error)}</p>}

      <ul className="consultorios-list">
        {consultorios.map((c) => {
          const id = c.consultorioId ?? c.ConsultorioId ?? c.id ?? c.Id;
          const nombre = c.nombre ?? c.Nombre;
          const calle = c.calle ?? c.Calle;
          const numero = c.numero ?? c.Numero;

          // MEJORADO: Buscamos la modalidad en formato plano o anidado por seguridad
          const modalidad =
            c.tipoModalidadNombre ??
            c.TipoModalidadNombre ??
            c.tipoModalidad?.nombre ??
            c.TipoModalidad?.Nombre ??
            "Modalidad no especificada";

          // Opcional: Si querés mostrar el nombre del psicólogo asociado en la tarjeta
          const psicologoNombre =
            (c.psicologo
              ? `${c.psicologo.nombre} ${c.psicologo.apellido}`
              : null) ??
            (c.Psicologo
              ? `${c.Psicologo.Nombre} ${c.Psicologo.Apellido}`
              : null);

          return (
            <li key={id} className="consultorio-card">
              <div className="consultorio-info">
                <strong>{nombre}</strong>
                {calle ? (
                  <p>
                    📍 {calle} {numero ?? ""}
                  </p>
                ) : (
                  <p>📍 Sin dirección física</p>
                )}
                <p>
                  Modalidad: <strong>{modalidad}</strong>
                </p>
                {psicologoNombre && <p>Psicólogo: {psicologoNombre}</p>}
              </div>

              <div className="actions">
                <button
                  type="button"
                  onClick={() => {
                    setConsultorioAEditar(c);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  Editar
                </button>
                <button
                  type="button"
                  onClick={() => handleRemove(c)}
                  className="delete-btn"
                >
                  Eliminar
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
