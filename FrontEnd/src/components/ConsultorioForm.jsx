import { useState } from "react";
import { useConsultorio } from "../hooks/useConsultorio";
import "../styles/layout/Psicologo.css";

export default function ConsultorioForm() {
  const { create, loading, error } = useConsultorio();

  const [form, setForm] = useState({
    nomrbe: "",
    calle: "",
    nuemro: "",
    presencial: false,
    virtual: false,
   // tipoModalidadId: "",
  });

  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    if (!form.nomrbe.trim()) {
      setFormError("El nombre del consultorio es obligatorio");
      return;
    }
    if (!form.calle.trim()) {
      setFormError("La calle es obligatoria");
      return;
    }
    if (
      form.nuemro !== "" &&
      (!Number.isInteger(Number(form.nuemro)) || Number(form.nuemro) <= 0)
    ) {
      setFormError("Ingresá un número de calle válido");
      return;
    }
    if (!form.presencial && !form.virtual) {
      setFormError("Seleccioná al menos una modalidad: presencial o virtual");
      return;
    }

    const payload = {
      nomrbe: form.nomrbe.trim(),
      calle: form.calle.trim(),
      nuemro: form.nuemro === "" ? null : Number(form.nuemro),
      presencial: form.presencial,
      virtual: form.virtual,
      //tipoModalidadId:
      // form.tipoModalidadId === "" ? null : Number(form.tipoModalidadId),
    };

    const result = await create(payload);
    if (result?.success) {
      setSuccessMsg("¡Consultorio creado con éxito!");
      setForm({
        nomrbe: "",
        calle: "",
        nuemro: "",
        presencial: false,
        virtual: false,
        // tipoModalidadId: "",
      });
    } else {
      setFormError(result?.error || "No se pudo crear el consultorio");
    }
  };

  return (
    <form className="psicologo-form" onSubmit={handleSubmit}>
      <h2>Nuevo Consultorio</h2>

      <label htmlFor="nomrbe">Nombre del consultorio</label>
      <input
        id="nomrbe"
        type="text"
        name="nomrbe"
        value={form.nomrbe}
        onChange={handleChange}
        placeholder="Ej.: Consultorio Centro"
        required
      />

      <label htmlFor="calle">Calle</label>
      <input
        id="calle"
        type="text"
        name="calle"
        value={form.calle}
        onChange={handleChange}
        placeholder="Ej.: Avenida Colón"
        required
      />

      <label htmlFor="nuemro">Número</label>
      <input
        id="nuemro"
        type="number"
        name="nuemro"
        value={form.nuemro}
        onChange={handleChange}
        placeholder="Ej.: 123"
        min="1"
      />

      <fieldset>
        <legend>Modalidad de atención</legend>
        <label>
          <input
            type="checkbox"
            name="presencial"
            checked={form.presencial}
            onChange={handleChange}
          />
          Presencial
        </label>
        <label>
          <input
            type="checkbox"
            name="virtual"
            checked={form.virtual}
            onChange={handleChange}
          />
          Virtual
        </label>
      </fieldset>

       <label htmlFor="tipoModalidadId">ID del tipo de modalidad</label>
      <input
        id="tipoModalidadId"
        type="number"
        name="tipoModalidadId"
        value={form.tipoModalidadId}
        onChange={handleChange}
        placeholder="Ingresá el ID de modalidad"
        min="1"
      />

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Crear Consultorio"}
      </button>

      {formError && (
        <p className="form-error">{formError}</p>
      )}

      {successMsg && (
        <p className="form-success">{successMsg}</p>
      )}

      {error && (
        <p className="form-error">
          Error: {error.message || String(error)}
        </p>
      )}
    </form>
  );}