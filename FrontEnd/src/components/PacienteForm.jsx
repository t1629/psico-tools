import { useState, useEffect } from "react";
import { usePaciente } from "../hooks/usePaciente";

export default function PacienteForm() {
  const { pacientes, fetchAll, create, remove, loading, error } = usePaciente();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    dni: "",
    fechaNacimineto: "",
  });

  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    const payload = {
      nombre: form.nombre.trim(),
      apellido: form.apellido.trim(),
      telefono: form.telefono.trim(),
      email: form.email.trim(),
      dni: form.dni.trim(),
      fechaNacimineto: form.fechaNacimineto ? form.fechaNacimineto : null,
    };

    const result = await create(payload);
    if (result?.success) {
      setSuccessMsg("¡Paciente creado con éxito!");
      setForm({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        dni: "",
        fechaNacimineto: "",
      });
    } else {
      setFormError(result?.error || "No se pudo crear el paciente");
    }
  };

  return (
    <div className="paciente-form-container">
      <h2>Nuevo Paciente</h2>
      <form className="paciente-form" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          required
        />

        <label>Apellido</label>
        <input
          type="text"
          name="apellido"
          value={form.apellido}
          onChange={handleChange}
          required
        />

        <label>Teléfono</label>
        <input
          type="text"
          name="telefono"
          value={form.telefono}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <label>DNI</label>
        <input
          type="text"
          name="dni"
          value={form.dni}
          onChange={handleChange}
        />

        <label>Fecha de Nacimiento</label>
        <input
          type="date"
          name="fechaNacimineto"
          value={form.fechaNacimineto}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Crear Paciente"}
        </button>
      </form>

      {formError && <p className="form-error">{formError}</p>}
      {successMsg && <p className="form-success">{successMsg}</p>}
      {error && <p className="form-error">Error: {String(error)}</p>}

      <h2>Pacientes Registrados</h2>
      <ul>
        {pacientes.map((p) => (
          <li key={p.pacienteId}>
            <strong>
              {p.nombre} {p.apellido}
            </strong>{" "}
            — DNI: {p.dni} | Tel: {p.telefono}
            <button onClick={() => remove(p.pacienteId)} disabled={loading}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
