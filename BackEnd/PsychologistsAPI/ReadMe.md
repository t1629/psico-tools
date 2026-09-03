Solution/
 ├── PsychologistsAPI/           ← Proyecto principal (Web API)
 │    ├── Controllers/           ← Endpoints HTTP
 │    ├── Models/                ← DTOs / ViewModels
 │    ├── Services/              ← Lógica de negocio
 │    ├── Program.cs             ← Configuración inicial
 │    └── appsettings.json       ← Configuración
 │
 ├── Data/              ← Class Library
 │    ├── Entities/              ← Entidades del dominio (tablas)
 │    └── Context/               ← DbContext de EF Core





---------------------------------------------------------------------------------

## EndPoints

Endpoints de Disponibilidad (/api/disponibilidades)
--------------------------------------------------------------------------------

1.1 Endpoints de dsiponibilidades (/api/disponibilidades)
--------------------------------------------------------------------------------

- GET    /api/disponibilidades?fecha=YYYY-MM-DD : Consulta franjas horarias configuradas.
- POST   /api/disponibilidades                  : Crea o habilita una franja de atención.
-PAT /api/disponibilidad/{id}
-PAT /api/disponibilidad/{id}/activo
-DELETE /api/disponibilidad/{id}



1.2 Endpoints de Turnos (/api/turnos)
--------------------------------------------------------------------------------
- GET    /api/turnos?desde=YYYY-MM-DD&hasta=YYYY-MM-DD : Listado de turnos en rango.
-GET /api/turnos/{id}
-GET /api/turnos/{id}/paciente
- POST   /api/turnos                                   : Agenda un nuevo turno.
-PUT /api/turnos/{id}
-PUT /api/turnos/{id}/estado
-DELETE /api/turnos/{id}





1.3 Endpoints de login (/api/login)
--------------------------------------------------------------------------------
-POST /api/login   

1.4 Endpoints de session (/api/session)
--------------------------------------------------------------------------------
-GET /api/session

1.5 Endpoints de logout (/api/logout)
--------------------------------------------------------------------------------
-POST /api/logout


1.6 Endpoints de usuario (/api/usuario)
--------------------------------------------------------------------------------
-GET /api/usuario/{id}
-POST /api/usuario
-PUT /api/usuario/{id}
-DELETE /api/usuario/{id}

1.7 Endpoints de agenda (/api/agenda)
--------------------------------------------------------------------------------
-GET /api/agenda?fecha=YYYY-MM-DD
-GET /api/agenda/{id}/pacientes
-POST /api/agenda
-PUT  /api/agenda
-DELETE /api/agenda

1.8 Endpoints de plan de turnos (/api/planTurnos)
--------------------------------------------------------------------------------
-GET /api/planTurnos
-GET /api/planTurnos/{id}/paciente
-POST /api/planTurnos
