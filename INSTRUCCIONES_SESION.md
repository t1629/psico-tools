# Instrucciones de la sesión — Turnos: filtro, listado filtrado y detalle

> Registro técnico en formato guía de lo implementado en esta sesión en el
> proyecto *psico-tools* (FrontEnd React + Vite, BackEnd ASP.NET Core).
> Ubicación del archivo: raíz del repo, al nivel de `/FrontEnd` y `/BackEnd`.

---

## 0. Cómo levantar el proyecto (requisito previo)

1. **FrontEnd** — el `package.json` está en la carpeta, NO en la raíz:

   ```
   cd FrontEnd
   npm run dev        # desarrollo con hot-reload (puerto de Vite)
   npm run lint       # ESLint sobre todo src/
   npm run build      # build de producción en dist/
   ```

   ⚠️ `pnpm run dev` desde la raíz falla porque la raíz no tiene `package.json`.

2. **BackEnd** — API de la clínica:

   ```
   dotnet build  BackEnd/PsychologistsAPI/PsychologistsAPI/PsychologistsAPI.csproj
   dotnet run    --project BackEnd/PsychologistsAPI/PsychologistsAPI/PsychologistsAPI.csproj
   ```

   La API escucha en `http://localhost:5008`.

   ⚠️ Si aparece `Failed to bind to address http://0.0.0.0:5008: address already in use`,
   hay otra instancia corriendo: localizarla con
   `netstat -ano | findstr :5008` y matar el PID con `taskkill /F /PID <PID>`.

3. La API usa **JWT** (`[Authorize]` en los controladores). Los secretos están en
   `BackEnd/PsychologistsAPI/PsychologistsAPI/.env.backend` (`Jwt__Key`,
   `Jwt__Issuer`, `Jwt__Audience`). **Nunca imprimir/committear la clave.**
   Login directo: `POST /api/login` devuelve el token `Bearer`.

---

## Parte 1 — Hacer que funcione el filtrado de turnos

**Objetivo:** filtrar turnos por apellido de paciente y estado, y que el
listado filtrado muestre nombres completos en lugar de "\# 2" o datos vacíos.

### 1.1 FrontEnd — el filtro no matcheaba por el padding de `nchar(50)`

Las columnas de texto de SQL Server (estado, apellido, etc.) son `nchar(50)`
y el EF devuelve el valor **relleno de espacios al final**
(`"Pendiente"` → `"Pendiente␣␣␣..."`). La comparación exacta rompía.

| Archivo / cambio | Instrucción |
|---|---|
| `FrontEnd/src/hooks/useTurno.js` → `filterTurnos()` | Comparar **siempre** con `trim()` y `toLowerCase()`: `turno.pacienteApellido?.trim().toLowerCase().includes(apellido.trim().toLowerCase())` y `turno.estado?.trim().toLowerCase() !== estado.toLowerCase() → excluir`. Nunca comparar el string crudo de la API. |

### 1.2 FrontEnd — `markAsistio` / `markAusente` no mataban el turno

| Archivo / cambio | Instrucción |
|---|---|
| `FrontEnd/src/hooks/useTurno.js` | Los botones de asistencia hacen **fetch del turno → PUT completo con merge** (`{ ...turnoActual, asistencia: nueva }`). Motivo: validación backend exige `fecha/hora` del turno completo — un PUT parcial volaba con 400. Después del PUT re-cargar con `fetchTurnosSemana()`. |

### 1.3 FrontEnd — rutas de servicios

| Archivo / cambio | Instrucción |
|---|---|
| `FrontEnd/src/services/TurnoService.js` → `create` | La URL correcta es **`/api/turno`** (POST). Recargar el listado con `fetchTurnosSemana()` después de crear. |

### 1.4 BackEnd — endpoints y DTOs para que el listado muestre los nombres

| Archivo / cambio | Instrucción |
|---|---|
| `BackEnd/.../Repositories/TurnoRepository.cs` → `GetByDateRangeAsync` | Incluir navegaciones `.Include(p => p.Paciente).Include(p => p.Psicologo)` — sin eso el rango devolvía turnos sin nombre de paciente/psicólogo (`/api/turno/range?desde&hasta`, forma plana con `pacienteApellido`). |
| `BackEnd/.../Services/TurnoService.cs` → `MapToDto` | Mapear `PacienteNombre`, `PacienteApellido`, `PsicologoNombre/Apellido` al DTO plano que consume el calendario. |
| `BackEnd/.../Controllers/agendaController.cs` | Restaurar el filtro por fecha: **`GET /api/agenda?fecha=YYYY-MM-DD`** (lo usa el form "Buscar" de Inicio al filtrar por día). |

### 1.5 Validar (bucle estricto)

1. `dotnet build` → 0 errores (los warnings CS8618 son pre-existentes).
2. `cd FrontEnd && npm run lint && npm run build`.
3. Smoke contra la API real con token minteado (HS256 con la key del `.env.backend`,
   `iss`/`aud` correctos, exp +2h), sin exponer la clave:
   - `POST /api/turno` → 201; `GET /api/turno/range?desde&hasta` → items con `pacienteApellido`.
   - `GET /api/agenda?fecha=...` → filtrado por día funcional.

---

## Parte 2 — Corregir / completar el apartado del turno filtrado

La ruta y pantalla implicadas: **`/turno/todos` → `pages/TurnoAll.jsx`**.
Se siguen los tokens semánticos obligatorios del design system
(`FrontEnd/.agents/context/design-system.md` + `FrontEnd/src/index.css`).
**Regla: prohibido inventar hex nuevos — todo color sale de `index.css`.**

### 2.1 Cabecera y espaciado (tipo `calendar-page`)

| Archivo / cambio | Instrucción |
|---|---|
| `FrontEnd/src/pages/TurnoAll.jsx` | Header con eyebrow **"AGENDA CLÍNICA"** + `h1` "Turnos" + descripción ("Filtra y gestiona los turnos registrados.") + card de contador (`{filterTurnos().length} turnos`, `aria-live="polite"`). Las clases `calendar-page__*` están estiladas sólo en `Inicio.css`, que esta pantalla **no importa** → duplicar las declaraciones **scoped con `.turnos-all-page ...`** en `TurnoList.css`. |
| `FrontEnd/src/styles/UI/TurnoList.css` | Espaciado de la cabecera: eyebrow↔título 8px, título↔descripción 10px, bloque↔filtro 32px (antes todo pegado a 4px). |

### 2.2 Tarjeta flotante centrada (no full-width)

| Archivo / cambio | Instrucción |
|---|---|
| `FrontEnd/src/pages/TurnoAll.jsx` | Envolver **todo** el contenido en `<div className="turnos-panel">` (dentro del `<main className="app-content turnos-all-page">`). El modal de confirmación vive dentro del panel (es `position: fixed`, no afecta). |
| `FrontEnd/src/styles/UI/TurnoList.css` | `.turnos-panel { max-width: 900px; margin: 0 auto; background: var(--color-bg-surface); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 28px 32px; }` y la página con `padding: 32px 16px` para que la tarjeta "flote". En el mismo panel: **aplana** el filtro (`box-shadow: none` + borde inset) para evitar tarjeta dentro de tarjeta; estado vacío con fondo `--color-bg-base`; media query mobile `padding: 20px 16px`. |

### 2.3 Estado vacío del filtro

| Archivo / cambio | Instrucción |
|---|---|
| `FrontEnd/src/pages/TurnoAll.jsx` | Cuando `filterTurnos().length === 0` (y no hay loading/error): caja con texto **"No hay turnos que coincidan con el filtro."** + botón **"Limpiar filtros"** que ejecuta `setApellido("")` + `setEstado("")`. Mostrar el botón solo si hay un filtro activo. Calcular `filterTurnos()` **una vez por render** y reusarla (lista + contador + vacío). |

### 2.4 Tarjeta de turno con tokens (antes tenía hex hardcodeados y en dark mode se veía blanca/rota)

| Archivo / cambio | Instrucción |
|---|---|
| `FrontEnd/src/styles/UI/TurnoCard.css` | Reemplazo total de hex por tokens: superficie/borde/radio/sombra de tarjeta; textos `--color-text-primary/secondary`; **"Editar"** = botón primario (`--color-action-primary` fondo + `--global-dark-bg` texto); **"Eliminar"** = patrón "notice" destructivo (`--tint-error` fondo + borde `--color-feedback-error` + texto primario; hover → fondo `--color-feedback-error` + texto dark, AA en light y dark); `focus-visible` 3px `--color-action-secondary`; táctil ≥44px; `prefers-reduced-motion` sin transform. |

### 2.5 Filtros en fila en pantallas anchas

| Archivo / cambio | Instrucción |
|---|---|
| `FrontEnd/src/styles/UI/TurnoFilterPicker.css` | `@media (min-width: 700px)`: `.turno-filter` en `display: flex` con `label { flex: 1 }` y el botón `align-self: flex-end`, `min-height: 44px`. En móvil sigue apilado. |

---

## Parte 3 — Popup de confirmación al eliminar turno (listado)

 Patrón a copiar: `LogoutCard.jsx` (overlay + `role="dialog"` + `aria-modal` +
 Escape/clic fuera = "No" — NO usar `window.confirm`).

1. **Nuevo** `FrontEnd/src/components/ConfirmDialog.jsx`: props `title`, `onConfirm`, `onCancel`; texto por defecto *"¿Estás seguro que quieres eliminarlo?"*; botones **Sí** (destructivo: tinte error) / **No** (`autoFocus`); Overlay con `onMouseDown` en fondo cierra ("No"); listener de `Escape`.
2. **Nuevo** `FrontEnd/src/styles/UI/ConfirmDialog.css`: réplica de `LogoutCard.css` con borde superior rojo (`--color-feedback-error`), botón "Sí" con `--tint-error`/borde error, "No" con `--tint-primary`, foco visible ámbar, reducción de movimiento.
3. **`FrontEnd/src/hooks/useTurno.js`**: `removeTurno` devuelve **`{ success: boolean }`** (`true` tras DELETE OK; `false` + `setError("Error al eliminar turno")` si falla). Las pantallas deciden redirigir **solo si sale bien**. Además `fetchTurnosALL` wrapeada en `useCallback` (referencia estable para los `useEffect`).
4. **`FrontEnd/src/pages/TurnoAll.jsx`** (flujo completo):
   - Estado: `turnoToDelete` (guarda el `turnoId` que llega desde `TurnoCard` vía `onRemove(id)`), `deleting`, `deleted`, y `redirectTimerRef` (limpia el timer en el unmount y si el usuario abre otra cosa, ej. Editar, antes de los 2s).
   - "Eliminar" de la tarjeta → **abre el modal** (no borra directo).
   - "Sí" → `await removeTurno(id)` → si `success`: aviso *"Turno eliminado. Redirigiendo al inicio..."* (`role="status"`) y `setTimeout(() => navigate("/inicio"), 2000)`. Si falla: cerrar modal y mostrar el error en el notice (role="alert") **sin redirigir**.
   - "No" / Escape / clic fuera → cerrar sin tocar nada.

---

## Parte 4 (extra de la sesión) — Editar agenda desde el detalle

1. **`FrontEnd/src/components/DetalleAgenda.jsx`**: el botón "Editar" navega a
   **`/crearAgenda?id=<agendaId>`** (la ruta existente de crear agenda, con el id
   por query). Antes iba a `/agenda/editar/:id`, ruta inexistente que caía al
   wildcard `<Navigate to="/">` y "redirigía al inicio".
2. **`FrontEnd/src/components/AgendaForm.jsx`** — modo edición en la MISMA ruta:
   - `useSearchParams` → `editId`; `isEditing = Boolean(editId)`.
   - Precarga `getById(editId)` dentro del `.then` (nunca `setState` síncrono en el body del effect — regla lint `react-hooks/set-state-in-effect`).
   - Los **`<select>` guardan el ID** (`psicologoId/pacienteId/consultorioId`), única fuente de verdad; el objeto se deriva del catálogo en render. Evita mappings por efecto.
   - `horaInicio/horaFin` se precargan con `.slice(0, 5)` (`"22:31:00"` → `"22:31"`) y al enviar se les agrega `:00`.
   - `titulo/descripcion` se precargan con **`.trim()`** (columnas `nchar` devuelven padding).
   - Submit en edición: `update({ ...campos, agendaId })` → navega a `/agenda/{id}`.
   - Botón "Guardar cambios" en edición / "Crear Agenda" en alta.
3. **Backend**:
   - `AgendaMapper.ToDto` debe mapear **`Estado`** (sin eso cada PUT lo anulaba a null).
   - `AgendaService.Update` debe persistir también **`Titulo`, `Descripcion`, `PacienteId`** (antes los descartaba) y hacer **`Trim()`** de texto: con título de 50+ chars la columna `nchar(50)` rompía con SQL error 2628 → 500.

---

## Parte 5 (extra de la sesión) — Estilos del detalle del turno agendado (`/agenda/:id`)

- **Nuevo** `FrontEnd/src/styles/UI/DetalleAgenda.css` (tokens puros, sin hex):
  - **Tarjeta flotante centrada** `.agenda-panel` (mismo patrón que el listado: `max-width: 900px`, borde/sombra/radio del sistema).
  - Cabecera: eyebrow "DETALLE DEL TURNO AGENDADO" + título + **badge de estado** (tinte primario); espaciado 8/10/32px igual que el listado.
  - Tarjeta de datos en filas etiqueta/valor (descripción en bloque propio); horas mostradas como `HH:mm` (`slice(0, 5)`).
  - Botones: "Editar" primario, "Eliminar" destructivo (patrón notice); táctil ≥44px; foco visible.
  - Aviso de error de carga con "Reintentar" (antes quedaba "Cargando agenda..." para siempre).
- **`DetalleAgenda.jsx`**: todo envuelto en `.agenda-panel`; "Eliminar" abre el **mismo `ConfirmDialog`** ("¿Estás seguro que quieres eliminarlo?" Sí/No) y, con "Sí", borra y navega a **`/inicio`** inmediato; si el borrado falla → notice de error y sin redirección.
- **Ruta del Home**: es **`/inicio`** (`RootRedirect` lleva ahí). Los `navigate("/")` funcionaban por accidente vía redirect intermedio — usar `/inicio` directamente (en el redirect de 2s del listado y en el delete del detalle).

---

## Checklist de validación final (todo passó en la sesión)

- [x] `dotnet build` → 0 errores.
- [x] `cd FrontEnd && npm run lint` → **0 problemas en los archivos tocados** (quedan 12 errores + 3 warnings pre-existentes ajenos, indicados abajo).
- [x] `npm run build` → ✓.
- [x] Smoke API con JWT real: edición de agenda persistida (`PUT` 200 + GET verificado, `estado` intacto), ciclo turno crear→eliminar 201/200, y flujo filtro/correcciones de la Parte 1.
- [x] Prueba manual guiada: `/turno/todos` (cabecera, tarjeta flotante, estado vacío, modal + 2s), ciclo `agenda → detalle → editar (prefill) → guardar → detalle`, y eliminar desde el detalle con popup + redirección a `/inicio`.

## Deudas pendientes declaradas (fuera de alcance, no tocar sin pedir)

- En `Inicio.jsx` el `<TurnoFiltradoForm onFilter={handleFilter} onReset={reload} />` está **comentado** (líneas ~110-112) → genera 2 errores de lint `'TurnoFiltradoForm' / 'handleFilter' unused` y deja el calendario sin el form de filtro. Re-comentar solo si el usuario lo quiere.
- Errores/warnings de lint pre-existentes fuera de alcance: `App.jsx` (2 imports sin uso), `ThemeContext.jsx`, `authContext.jsx`, `usePlanTurno.js`, `usePsicologo.js`, `Inicio.jsx` (2), `PlanTurnoForm.jsx` (2), warnings de deps en `Consultorio.jsx`, `ConsultorioForm.jsx`, `Turnos.jsx`.
- Bug documentado pendiente y no corregido: **stale state en `Turnos.jsx`** (`turnos.find` lee la variable del closure antes de que `fetchTurnosALL` resuelva → editar desde `/turnos/:id` nunca precarga el form) y `TurnoForm` no hidrata `selectedTurno`.
- Columna `titulo` es `nchar(50)`: textos más largos se cortan/500 sin el Trim del PUT — considerar migrar a `nvarchar(255)` en un futuro.
- Otros conocidos: `updateByPaciente` ruta muerta, `getWeekRange` con riesgo UTC.
