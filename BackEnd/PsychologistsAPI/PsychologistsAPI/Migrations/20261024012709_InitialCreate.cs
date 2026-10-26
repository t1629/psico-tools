using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PsychologistsAPI.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "medioEnvio",
                columns: table => new
                {
                    medioEnvioId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_medioEnvio", x => x.medioEnvioId);
                });

            migrationBuilder.CreateTable(
                name: "planTurno",
                columns: table => new
                {
                    planTurnoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fechaInicio = table.Column<DateOnly>(type: "date", nullable: false),
                    fechaFin = table.Column<DateOnly>(type: "date", nullable: false),
                    cantidadTurno = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_planTurno", x => x.planTurnoId);
                });

            migrationBuilder.CreateTable(
                name: "rol",
                columns: table => new
                {
                    rolId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nchar(10)", fixedLength: true, maxLength: 10, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rol", x => x.rolId);
                });

            migrationBuilder.CreateTable(
                name: "tipoModalidad",
                columns: table => new
                {
                    tipoModalidadId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tipoModalidad", x => x.tipoModalidadId);
                });

            migrationBuilder.CreateTable(
                name: "usuario",
                columns: table => new
                {
                    usuarioId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nchar(100)", fixedLength: true, maxLength: 100, nullable: false),
                    rol = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: false),
                    email = table.Column<string>(type: "nchar(100)", fixedLength: true, maxLength: 100, nullable: false),
                    passwordHash = table.Column<string>(type: "nchar(200)", fixedLength: true, maxLength: 200, nullable: false),
                    fechaIngreso = table.Column<DateOnly>(type: "date", nullable: false),
                    ultimoAcceso = table.Column<DateOnly>(type: "date", nullable: true),
                    estado = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_usuario", x => x.usuarioId);
                });

            migrationBuilder.CreateTable(
                name: "paciente",
                columns: table => new
                {
                    pacienteId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nchar(100)", fixedLength: true, maxLength: 100, nullable: true),
                    apellido = table.Column<string>(type: "nchar(100)", fixedLength: true, maxLength: 100, nullable: true),
                    telefono = table.Column<string>(type: "nchar(20)", fixedLength: true, maxLength: 20, nullable: true),
                    DNI = table.Column<string>(type: "nchar(20)", fixedLength: true, maxLength: 20, nullable: true),
                    email = table.Column<string>(type: "nchar(150)", fixedLength: true, maxLength: 150, nullable: true),
                    fechaNacimineto = table.Column<DateOnly>(type: "date", nullable: true),
                    numeroPaciente = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    planTurnoId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_paciente", x => x.pacienteId);
                    table.ForeignKey(
                        name: "FK_paciente_planTurno",
                        column: x => x.planTurnoId,
                        principalTable: "planTurno",
                        principalColumn: "planTurnoId");
                });

            migrationBuilder.CreateTable(
                name: "consultorio",
                columns: table => new
                {
                    consultorioId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nchar(100)", fixedLength: true, maxLength: 100, nullable: true),
                    calle = table.Column<string>(type: "nchar(200)", fixedLength: true, maxLength: 200, nullable: true),
                    numero = table.Column<int>(type: "int", nullable: true),
                    tipoModalidadId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_consultorio", x => x.consultorioId);
                    table.ForeignKey(
                        name: "FK_consultorio_tipoModalidad",
                        column: x => x.tipoModalidadId,
                        principalTable: "tipoModalidad",
                        principalColumn: "tipoModalidadId");
                });

            migrationBuilder.CreateTable(
                name: "psicologo",
                columns: table => new
                {
                    psicologoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    nombre = table.Column<string>(type: "nchar(100)", fixedLength: true, maxLength: 100, nullable: false),
                    matricula = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: true),
                    apellido = table.Column<string>(type: "nchar(100)", fixedLength: true, maxLength: 100, nullable: true),
                    telefono = table.Column<string>(type: "nchar(20)", fixedLength: true, maxLength: 20, nullable: true),
                    email = table.Column<string>(type: "nchar(150)", fixedLength: true, maxLength: 150, nullable: true),
                    usuarioId = table.Column<int>(type: "int", nullable: true),
                    rolId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_psicologo", x => x.psicologoId);
                    table.ForeignKey(
                        name: "FK_psicologo_rol",
                        column: x => x.rolId,
                        principalTable: "rol",
                        principalColumn: "rolId");
                    table.ForeignKey(
                        name: "FK_psicologo_usuario",
                        column: x => x.usuarioId,
                        principalTable: "usuario",
                        principalColumn: "usuarioId");
                });

            migrationBuilder.CreateTable(
                name: "agenda",
                columns: table => new
                {
                    agendaId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    horaInicio = table.Column<TimeOnly>(type: "time", nullable: false),
                    horaFin = table.Column<TimeOnly>(type: "time", nullable: false),
                    estado = table.Column<string>(type: "nchar(15)", fixedLength: true, maxLength: 15, nullable: true),
                    psicologoId = table.Column<int>(type: "int", nullable: false),
                    consultorioId = table.Column<int>(type: "int", nullable: false),
                    pacienteId = table.Column<int>(type: "int", nullable: true),
                    descripcion = table.Column<string>(type: "nchar(100)", fixedLength: true, maxLength: 100, nullable: true),
                    titulo = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: true),
                    fecha = table.Column<DateOnly>(type: "date", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_agenda", x => x.agendaId);
                    table.ForeignKey(
                        name: "FK_agenda_consultorio",
                        column: x => x.consultorioId,
                        principalTable: "consultorio",
                        principalColumn: "consultorioId");
                    table.ForeignKey(
                        name: "FK_agenda_paciente",
                        column: x => x.pacienteId,
                        principalTable: "paciente",
                        principalColumn: "pacienteId");
                    table.ForeignKey(
                        name: "FK_agenda_psicologo",
                        column: x => x.psicologoId,
                        principalTable: "psicologo",
                        principalColumn: "psicologoId");
                });

            migrationBuilder.CreateTable(
                name: "turno",
                columns: table => new
                {
                    turnoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fecha = table.Column<DateOnly>(type: "date", nullable: false),
                    hora = table.Column<TimeOnly>(type: "time", nullable: false),
                    estado = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: true),
                    minutos = table.Column<int>(type: "int", nullable: true),
                    asistencia = table.Column<bool>(type: "bit", nullable: true),
                    url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    psicologoId = table.Column<int>(type: "int", nullable: true),
                    pacienteId = table.Column<int>(type: "int", nullable: true),
                    planTurnoId = table.Column<int>(type: "int", nullable: true),
                    modalidadVirtual = table.Column<bool>(type: "bit", nullable: false),
                    cantidadTurnos = table.Column<int>(type: "int", nullable: true),
                    descripcion = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_turno", x => x.turnoId);
                    table.ForeignKey(
                        name: "FK_turno_paciente",
                        column: x => x.pacienteId,
                        principalTable: "paciente",
                        principalColumn: "pacienteId");
                    table.ForeignKey(
                        name: "FK_turno_planTurno_planTurnoId",
                        column: x => x.planTurnoId,
                        principalTable: "planTurno",
                        principalColumn: "planTurnoId");
                    table.ForeignKey(
                        name: "FK_turno_psicologo",
                        column: x => x.psicologoId,
                        principalTable: "psicologo",
                        principalColumn: "psicologoId");
                });

            migrationBuilder.CreateTable(
                name: "notificacion",
                columns: table => new
                {
                    notificacionoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    fechaEnvio = table.Column<DateTime>(type: "datetime", nullable: true),
                    intentosEnvio = table.Column<int>(type: "int", nullable: true),
                    estado = table.Column<string>(type: "nchar(50)", fixedLength: true, maxLength: 50, nullable: true),
                    resultadoEnvio = table.Column<string>(type: "nchar(100)", fixedLength: true, maxLength: 100, nullable: true),
                    turnoId = table.Column<int>(type: "int", nullable: false),
                    medioEnvioId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_recordatorioTurno", x => x.notificacionoId);
                    table.ForeignKey(
                        name: "FK_notificacion_medioEnvio",
                        column: x => x.medioEnvioId,
                        principalTable: "medioEnvio",
                        principalColumn: "medioEnvioId");
                    table.ForeignKey(
                        name: "FK_notificacion_turno",
                        column: x => x.turnoId,
                        principalTable: "turno",
                        principalColumn: "turnoId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_agenda_consultorioId",
                table: "agenda",
                column: "consultorioId");

            migrationBuilder.CreateIndex(
                name: "IX_agenda_pacienteId",
                table: "agenda",
                column: "pacienteId");

            migrationBuilder.CreateIndex(
                name: "IX_agenda_psicologoId",
                table: "agenda",
                column: "psicologoId");

            migrationBuilder.CreateIndex(
                name: "IX_consultorio_tipoModalidadId",
                table: "consultorio",
                column: "tipoModalidadId");

            migrationBuilder.CreateIndex(
                name: "IX_notificacion_medioEnvioId",
                table: "notificacion",
                column: "medioEnvioId");

            migrationBuilder.CreateIndex(
                name: "IX_notificacion_turnoId",
                table: "notificacion",
                column: "turnoId");

            migrationBuilder.CreateIndex(
                name: "IX_paciente_planTurnoId",
                table: "paciente",
                column: "planTurnoId");

            migrationBuilder.CreateIndex(
                name: "IX_psicologo_rolId",
                table: "psicologo",
                column: "rolId");

            migrationBuilder.CreateIndex(
                name: "IX_psicologo_usuarioId",
                table: "psicologo",
                column: "usuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_turno_pacienteId",
                table: "turno",
                column: "pacienteId");

            migrationBuilder.CreateIndex(
                name: "IX_turno_planTurnoId",
                table: "turno",
                column: "planTurnoId");

            migrationBuilder.CreateIndex(
                name: "IX_turno_psicologoId",
                table: "turno",
                column: "psicologoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "agenda");

            migrationBuilder.DropTable(
                name: "notificacion");

            migrationBuilder.DropTable(
                name: "consultorio");

            migrationBuilder.DropTable(
                name: "medioEnvio");

            migrationBuilder.DropTable(
                name: "turno");

            migrationBuilder.DropTable(
                name: "tipoModalidad");

            migrationBuilder.DropTable(
                name: "paciente");

            migrationBuilder.DropTable(
                name: "psicologo");

            migrationBuilder.DropTable(
                name: "planTurno");

            migrationBuilder.DropTable(
                name: "rol");

            migrationBuilder.DropTable(
                name: "usuario");
        }
    }
}
