import "../styles/UI/TurnoFilterPicker.css";

export default function TurnoFilterPicker({
  apellido,
  estado,
  setApellido,
  setEstado,
}) {
  const letras = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i),
  );

  return (
    <div className="turno-filter">
      <label>
        Apellido
        <select value={apellido} onChange={(e) => setApellido(e.target.value)}>
          <option value="">Todos los apellidos</option>
          {letras.map((letra) => (
            <option key={letra} value={letra}>
              {letra}
            </option>
          ))}
        </select>
      </label>

      <label>
        Estado
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="cancelado">Cancelado</option>
          <option value="pendiente">Pendiente</option>
        </select>
      </label>

      <button
        type="button"
        onClick={() => {
          setApellido("");
          setEstado("");
        }}
      >
        Limpiar filtros
      </button>
    </div>
  );
}
