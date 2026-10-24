import { useState, useEffect } from "react";
import { useConsultorio } from "../hooks/useConsultorio";
import "../styles/UI/Consultorio.css";

export default function ConsultorioForm() {
  const { consultorios, fetchAll, create, update, remove, loading, error } =
    useConsultorio();

  const [form, setForm] = useState({
    Id: "",
    nombre: "",
    calle: "",
    numero: "",
    presencial: false,
    virtual: false,
    tipoModalidadNombre: "",
  });

  const [formError, setFormError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    fetchAll();
  }, []);

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

    if (!form.nombre.trim()) {
      setFormError(
        "El nombre del consultorio es obligatorio, si no tiene puede poner 'Consultorio de {su nombre}' ",
      );
      return;
    }
    if (
      form.numero !== "" &&
      (!Number.isInteger(Number(form.numero)) || Number(form.numero) <= 0)
    ) {
      setFormError("Ingresá un número de calle válido");
      return;
    }
    if (!form.tipoModalidadNombre.trim()) {
      setFormError(
        "El nombre de la modalidad es obligatorio, tiene que agregar si es prescencial o vitrual",
      );
      return;
    }

    const payload = {
      Id: form.Id,
      Nombre: form.nombre.trim(),
      Calle: form.calle.trim() === "" ? null : form.calle.trim(),
      Numero: form.numero === "" ? null : Number(form.numero),
      TipoModalidadNombre: form.tipoModalidadNombre.trim(),
    };

    const result = await create(payload);
    if (result?.success) {
      setSuccessMsg("¡Consultorio creado con éxito!");
      setForm({
        Id: "",
        nombre: "",
        calle: "",
        numero: "",
        presencial: false,
        virtual: false,
        tipoModalidadNombre: "",
      });
    } else {
      setFormError(result?.error || "No se pudo crear el consultorio");
    }
  };

  const handleEdit = (item) => {
    setForm({
      Id: item.Id,
      nombre: item.Nombre,
      calle: item.Calle || "",
      numero: item.Numero || "",
      presencial: false,
      virtual: false,
      tipoModalidadNombre: item.TipoModalidadNombre,
    });
  };

  const handleUpdate = async () => {
    const result = await update(form.Id, {
      Id: form.Id,
      Nombre: form.nombre.trim(),
      Calle: form.calle.trim() === "" ? null : form.calle.trim(),
      Numero: form.numero === "" ? null : Number(form.numero),
      TipoModalidadNombre: form.tipoModalidadNombre.trim(),
    });
    if (result?.success) {
      setSuccessMsg("¡Consultorio actualizado con éxito!");
      setForm({
        Id: "",
        nombre: "",
        calle: "",
        numero: "",
        presencial: false,
        virtual: false,
        tipoModalidadNombre: "",
      });
    } else {
      setFormError(result?.error || "No se pudo actualizar el consultorio");
    }
  };

  return (
    <div className="psicologo-form">
      <h2>Nuevo Consultorio</h2>
      <form className="consultorios-form" onSubmit={handleSubmit}>
        <label>Nombre</label>
        <p>
          Ingrese el nombre del consultorio o puede poenr 'Consultorio de (su
          nombre)'
        </p>
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
        />

        <label>Calle</label>
        <p>Solo si su cosnultorio tiene dreccion prescencial</p>
        <input
          type="text"
          name="calle"
          value={form.calle}
          onChange={handleChange}
        />

        <label>Número</label>
        <p>Solo si su cosnultorio tiene dreccion prescencial</p>
        <input
          type="number"
          name="numero"
          value={form.numero}
          onChange={handleChange}
        />

        <section>
          <h4>Tipo de modalidad</h4>
          <label>
            <input
              type="radio"
              name="tipoModalidadNombre"
              value="Presencial"
              checked={form.tipoModalidadNombre === "Presencial"}
              onChange={handleChange}
            />
            Presencial
          </label>
          <label>
            <input
              type="radio"
              name="tipoModalidadNombre"
              value="Virtual"
              checked={form.tipoModalidadNombre === "Virtual"}
              onChange={handleChange}
            />
            Virtual
          </label>
        </section>

        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Crear Consultorio"}
        </button>
        <button
          type="button"
          onClick={handleUpdate}
          disabled={loading || !form.Id}
        >
          {loading ? "Actualizando..." : "Actualizar Consultorio"}
        </button>
      </form>

      {formError && <p className="form-error">{formError}</p>}
      {successMsg && <p className="form-success">{successMsg}</p>}
      {error && <p className="form-error">Error: {String(error)}</p>}

      <h2>Consultorios Registrados</h2>
      <ul>
        {consultorios.map((c) => (
          <li key={c.Id}>
            <strong>{c.Nombre}</strong> — {c.Calle} {c.Numero} (
            {c.TipoModalidadNombre})
            <button onClick={() => handleEdit(c)}>Editar</button>
            <button onClick={() => remove(c.Id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
