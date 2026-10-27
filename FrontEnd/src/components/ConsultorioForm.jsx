import { useState, useEffect } from "react";
import { useConsultorio } from "../hooks/useConsultorio";
import * as psicologosService from "../services/PsicologoService";
import { useToast } from "../hooks/useToast";
import "../styles/UI/Consultorio.css";

export default function ConsultorioForm({
  consultorioAEditar,
  onSaved,
  onCancel,
}) {
  const { create, update, loading } = useConsultorio();
  const toast = useToast();

  const [psicologos, setPsicologos] = useState([]);

  const [form, setForm] = useState({
    consultorioId: "",
    nombre: "",
    calle: "",
    numero: "",
    tipoModalidadNombre: "",
    psicologoId: "",
  });

  const [formError, setFormError] = useState(null);

  // Cargar lista de psicólogos al montar
  useEffect(() => {
    const fetchPsicologos = async () => {
      try {
        const data = await psicologosService.getAll();
        setPsicologos(data);
      } catch (err) {
        console.error("Error al cargar los psicólogos", err);
      }
    };
    fetchPsicologos();
  }, []);

  // Rellenar el formulario de forma segura ante cualquier formato de mayúsculas/minúsculas
  useEffect(() => {
    if (consultorioAEditar) {
      setForm({
        consultorioId:
          consultorioAEditar.consultorioId ??
          consultorioAEditar.ConsultorioId ??
          consultorioAEditar.id ??
          consultorioAEditar.Id ??
          "",
        nombre: consultorioAEditar.nombre ?? consultorioAEditar.Nombre ?? "",
        calle: consultorioAEditar.calle ?? consultorioAEditar.Calle ?? "",
        numero: consultorioAEditar.numero ?? consultorioAEditar.Numero ?? "",
        tipoModalidadNombre:
          consultorioAEditar.tipoModalidadNombre ??
          consultorioAEditar.TipoModalidadNombre ??
          "",
        psicologoId:
          consultorioAEditar.psicologoId ??
          consultorioAEditar.PsicologoId ??
          consultorioAEditar.psicologo?.psicologoId ??
          consultorioAEditar.Psicologo?.PsicologoId ??
          "",
      });
    } else {
      resetFormState();
    }
  }, [consultorioAEditar]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "numero") {
      if (value === "") {
        setForm({ ...form, [name]: "" });
        return;
      }
      const num = Math.floor(Number(value));
      if (!isNaN(num) && num >= 0) {
        setForm({ ...form, [name]: num });
      }
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);

    if (!form.nombre.trim()) {
      setFormError("El nombre del consultorio es obligatorio.");
      return;
    }
    if (!form.tipoModalidadNombre.trim()) {
      setFormError("El tipo de modalidad es obligatorio.");
      return;
    }

    const isEditing = Boolean(form.consultorioId);

    const payload = {
      consultorioId: isEditing ? Number(form.consultorioId) : 0,
      nombre: form.nombre.trim(),
      calle: form.calle.trim() === "" ? null : form.calle.trim(),
      numero: form.numero === "" ? null : Number(form.numero),
      tipoModalidadNombre: form.tipoModalidadNombre.trim(),
      psicologoId: form.psicologoId ? Number(form.psicologoId) : null,
    };

    let result;
    if (isEditing) {
      result = await update(form.consultorioId, payload);
    } else {
      result = await create(payload);
    }

    if (result?.success) {
      toast.success(
        isEditing
          ? "¡Consultorio actualizado con éxito!"
          : "¡Consultorio creado con éxito!",
      );
      resetFormState();
      if (onSaved) onSaved();
    } else {
      toast.error(result?.error || "No se pudo guardar el consultorio.");
    }
  };

  const resetFormState = () => {
    setForm({
      consultorioId: "",
      nombre: "",
      calle: "",
      numero: "",
      tipoModalidadNombre: "",
      psicologoId: "",
    });
    setFormError(null);
  };

  return (
    <div className="psicologo-form" style={{ paddingBottom: "1rem" }}>
      <h2>{form.consultorioId ? "Editar Consultorio" : "Nuevo Consultorio"}</h2>
      <form className="consultorios-form" onSubmit={handleSubmit}>
        <label>Psicólogo Asociado</label>
        <select
          name="psicologoId"
          value={form.psicologoId}
          onChange={handleChange}
        >
          <option value="">Seleccione un psicólogo...</option>
          {psicologos.map((p) => (
            <option key={p.psicologoId} value={p.psicologoId}>
              {p.nombre} {p.apellido}
            </option>
          ))}
        </select>

        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <label>Calle</label>
        <input
          type="text"
          name="calle"
          value={form.calle}
          onChange={handleChange}
        />

        <label>Número</label>
        <input
          type="number"
          name="numero"
          min="0"
          step="1"
          value={form.numero}
          onChange={handleChange}
        />

        <section style={{ margin: "0.5rem 0" }}>
          <h4>Tipo de modalidad</h4>
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.3rem" }}>
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
            >
              <input
                type="radio"
                name="tipoModalidadNombre"
                value="Presencial"
                checked={form.tipoModalidadNombre === "Presencial"}
                onChange={handleChange}
              />
              Presencial
            </label>
            <label
              style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}
            >
              <input
                type="radio"
                name="tipoModalidadNombre"
                value="Virtual"
                checked={form.tipoModalidadNombre === "Virtual"}
                onChange={handleChange}
              />
              Virtual
            </label>
          </div>
        </section>

        <div className="form-actions" style={{ marginTop: "1rem" }}>
          <button type="submit" disabled={loading}>
            {loading
              ? "Guardando..."
              : form.consultorioId
                ? "Guardar Cambios"
                : "Crear Consultorio"}
          </button>

          {form.consultorioId && (
            <button
              type="button"
              className="cancel-btn"
              onClick={() => {
                resetFormState();
                if (onCancel) onCancel();
              }}
              disabled={loading}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {formError && (
        <p className="form-error" role="alert">
          {formError}
        </p>
      )}
    </div>
  );
}
