import { useState, useEffect } from "react";
import { usePaciente } from "../hooks/usePaciente";
import { useToast } from "../hooks/useToast";

export default function PacienteForm() {
  const { pacientes, fetchAll, create, remove, loading, error } = usePaciente();
  const toast = useToast();

  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    telefono: "",
    email: "",
    dni: "",
    fechaNacimineto: "",
  });

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
      toast.success("¡Paciente creado con éxito!");
      setForm({
        nombre: "",
        apellido: "",
        telefono: "",
        email: "",
        dni: "",
        fechaNacimineto: "",
      });
    } else {
      toast.error(result?.error || "No se pudo crear el paciente");
    }
  };

  const handleRemove = async (paciente) => {
    const nombreCompleto = `${paciente.nombre} ${paciente.apellido}`.trim();
    const result = await remove(paciente.pacienteId);
    if (result?.success) {
      toast.success(`Paciente "${nombreCompleto}" eliminado con éxito.`);
    } else {
      toast.error(result?.error || "No se pudo eliminar el paciente.");
    }
  };

  return (
    <div className="paciente-layout">
      <section
        className="paciente-form-card"
        aria-labelledby="paciente-form-title"
      >
        <h2 id="paciente-form-title">Nuevo Paciente</h2>

        <form className="paciente-form" onSubmit={handleSubmit}>
          <div className="paciente-form__grid">
            <div className="paciente-form__field">
              <label htmlFor="paciente-nombre">Nombre</label>
              <input
                id="paciente-nombre"
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="paciente-form__field">
              <label htmlFor="paciente-apellido">Apellido</label>
              <input
                id="paciente-apellido"
                type="text"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
                required
              />
            </div>

            <div className="paciente-form__field">
              <label htmlFor="paciente-telefono">Teléfono</label>
              <input
                id="paciente-telefono"
                type="text"
                name="telefono"
                value={form.telefono}
                onChange={handleChange}
                inputMode="tel"
              />
            </div>

            <div className="paciente-form__field">
              <label htmlFor="paciente-email">Email</label>
              <input
                id="paciente-email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="paciente-form__field">
              <label htmlFor="paciente-dni">DNI</label>
              <input
                id="paciente-dni"
                type="text"
                name="dni"
                value={form.dni}
                onChange={handleChange}
                inputMode="numeric"
              />
            </div>

            <div className="paciente-form__field">
              <label htmlFor="paciente-fecha">Fecha de Nacimiento</label>
              <input
                id="paciente-fecha"
                type="date"
                name="fechaNacimineto"
                value={form.fechaNacimineto}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Guardando..." : "Crear Paciente"}
          </button>

          {error && (
            <p className="paciente-form__error" role="alert">
              Error: {String(error)}
            </p>
          )}
        </form>
      </section>

      <section className="paciente-list-card" aria-labelledby="paciente-list-title">
        <h2 id="paciente-list-title">Pacientes Registrados</h2>

        {loading && pacientes.length === 0 ? (
          <p className="paciente-list__state">Cargando pacientes...</p>
        ) : pacientes.length === 0 ? (
          <p className="paciente-list__state">
            Todavía no hay pacientes registrados.
          </p>
        ) : (
          <ul className="paciente-list">
            {pacientes.map((p) => (
              <li key={p.pacienteId} className="paciente-card">
                <strong className="paciente-card__name">
                  {p.nombre} {p.apellido}
                </strong>
                <span>DNI: {p.dni}</span>
                <span>Tel: {p.telefono}</span>
                <button
                  type="button"
                  className="paciente-card__danger"
                  onClick={() => handleRemove(p)}
                  disabled={loading}
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
