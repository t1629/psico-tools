 PsychologistsAPI/
 ├── Controllers/        ← Endpoints HTTP
 ├── Models/             ← Entidades del dominio (tablas)
 ├── Dtos/               ← Objetos de transferencia de datos (DTOs)
 ├── Data/               ← Contexto de EF Core
 ├── Repositories/       ← Acceso a datos (consultas CRUD)
 ├── Services/           ← Lógica de negocio
 ├── Mapper/             ← Mapeo entre entidades y DTOs
 ├── Program.cs
 └── appsettings.json




---------------------------------------------------------------------------------

## EndPoints



1.2 Endpoints de Turnos (/api/turnos)
--------------------------------------------------------------------------------
- GET    /api/turnos?desde=YYYY-MM-DD&hasta=YYYY-MM-DD : Listado de turnos en rango.
-GET /api/turnos/{id}
-GET /api/turnos/{id}/paciente
-GET /api/turnos/{id}/paciente/{pacienteId} //esto se hara leugo para ver todos los turnos del paciente
- POST   /api/turnos                                   : Agenda un nuevo turno.
-PUT /api/turnos/{id}
-PUT /api/turnos/{id}/estado
-PUT /api/turnos/paciente/{pacienteId}
-DELETE /api/turnos/{id}





1.3 Endpoints de login (/api/login)
--------------------------------------------------------------------------------
-POST /api/login   
## hecho

1.4 Endpoints de session (/api/session)
--------------------------------------------------------------------------------
-GET /api/session
## hecho


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
-PUT /api/planTurnos/{id}
-PUT /api/planTurnos/{id}/paciente
-DELETE /api/planTurnos/{id}


1.9 Endpoints de notificacion (/api/notificaciones)
--------------------------------------------------------------------------------
-GET  /api/notificaciones
-GET  /api/notificaciones/{id}
-GET  /api/notificaciones/turno/{turnoId}
-POST /api/notificaciones
-PUT  /api/notificaciones/{id}
-DELETE  /api/notificaciones/{id}


1.10 Endpoints de paciente (/api/paciente)
--------------------------------------------------------------------------------
-GET /api/paciente
-GET /api/paciente/{id}
-POST /api/paciente
-PUT  /api/paciente/{id}
-DELETE /api/paciente/{id}



------------------------------------------------

## Se empezo con el mapeo a la base de datos
## Ver bien el gitignore que eso tare problemas