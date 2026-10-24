import { useState } from "react";
import { usePsicologo } from "../hooks/usePsicologo";
import "../styles/layout/Psicologo.css";

export default function PsicologoForm() {
  const { create, loading, error } = usePsicologo();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    rolId: "",
  });

  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    // Validaciones básicas
    if (!form.nombre || !form.apellido) {
      setFormError("Nombre y apellido son obligatorios");
      return;
    }
    if (!form.email.includes("@")) {
      setFormError("Email inválido");
      return;
    }
    if (!form.telefono) {
      setFormError("Teléfono es obligatorio");
      return;
    }

    const result = await create(form);

    if (result.success) {
      setSuccessMsg("¡Psicólogo creado con éxito!");
      setForm({
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
      });
    } else {
      setFormError(result.error);
    }
  };

  return (
    <form className="psicologo-form" onSubmit={handleSubmit}>
      <h2>Nuevo Psicólogo</h2>

      <label>Nombre</label>
      <input
        type="text"
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
      />

      <label>Apellido</label>
      <input
        type="text"
        name="apellido"
        value={form.apellido}
        onChange={handleChange}
      />

      <label>Email</label>
      <input
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <label>Teléfono</label>
      <input
        type="text"
        name="telefono"
        value={form.telefono}
        onChange={handleChange}
      />

      <button type="submit" disabled={loading}>
        {loading ? "Guardando..." : "Crear Psicólogo"}
      </button>

      {formError && <p className="form-error">{formError}</p>}
      {successMsg && <p className="form-success">{successMsg}</p>}
      {error && <p className="form-error">Error: {error.message}</p>}
    </form>
  );
}
