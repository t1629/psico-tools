using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using PsychologistsAPI.Entities;

namespace Data.Context;

public partial class PsychologistContext : DbContext
{
    public PsychologistContext()
    {
    }

    public PsychologistContext(DbContextOptions<PsychologistContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Agendum> Agenda { get; set; }

    public virtual DbSet<Consultorio> Consultorios { get; set; }

    public virtual DbSet<Disponibilidad> Disponibilidads { get; set; }

    public virtual DbSet<MedioEnvio> MedioEnvios { get; set; }

    public virtual DbSet<Notificacion> Notificacions { get; set; }

    public virtual DbSet<Paciente> Pacientes { get; set; }

    public virtual DbSet<PlanTurno> PlanTurnos { get; set; }

    public virtual DbSet<Psicologo> Psicologos { get; set; }

    public virtual DbSet<Rol> Rols { get; set; }

    public virtual DbSet<Turno> Turnos { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=Tomas\\SQLSERVER;Database=PsyClinicDB;Trusted_Connection=True;TrustServerCertificate=True");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Agendum>(entity =>
        {
            entity.HasKey(e => e.AgendaId);

            entity.ToTable("agenda");

            entity.Property(e => e.AgendaId).HasColumnName("agendaId");
            entity.Property(e => e.ConsultorioId).HasColumnName("consultorioId");
            entity.Property(e => e.DiaSemana)
                .HasMaxLength(15)
                .IsFixedLength()
                .HasColumnName("diaSemana");
            entity.Property(e => e.DisponibilidadId).HasColumnName("disponibilidadId");
            entity.Property(e => e.Estado)
                .HasMaxLength(15)
                .IsFixedLength()
                .HasColumnName("estado");
            entity.Property(e => e.HoraFin).HasColumnName("horaFin");
            entity.Property(e => e.HoraInicio).HasColumnName("horaInicio");
            entity.Property(e => e.PsicologoId).HasColumnName("psicologoId");
            entity.Property(e => e.TurnoId).HasColumnName("turnoId");

            entity.HasOne(d => d.Consultorio).WithMany(p => p.Agenda)
                .HasForeignKey(d => d.ConsultorioId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_agenda_consultorio");

            entity.HasOne(d => d.Disponibilidad).WithMany(p => p.Agenda)
                .HasForeignKey(d => d.DisponibilidadId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_agenda_disponibilidad");

            entity.HasOne(d => d.Psicologo).WithMany(p => p.Agenda)
                .HasForeignKey(d => d.PsicologoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_agenda_psciologo");

            entity.HasOne(d => d.Turno).WithMany(p => p.Agenda)
                .HasForeignKey(d => d.TurnoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_agenda_turno");
        });

        modelBuilder.Entity<Consultorio>(entity =>
        {
            entity.ToTable("consultorio");

            entity.Property(e => e.ConsultorioId).HasColumnName("consultorioId");
            entity.Property(e => e.Calle)
                .HasMaxLength(200)
                .IsFixedLength()
                .HasColumnName("calle");
            entity.Property(e => e.Nomrbe)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("nomrbe");
            entity.Property(e => e.Nuemro).HasColumnName("nuemro");
        });

        modelBuilder.Entity<Disponibilidad>(entity =>
        {
            entity.ToTable("disponibilidad");

            entity.Property(e => e.DisponibilidadId).HasColumnName("disponibilidadId");
            entity.Property(e => e.Activo).HasColumnName("activo");
            entity.Property(e => e.DiaSemana)
                .HasMaxLength(15)
                .IsFixedLength()
                .HasColumnName("diaSemana");
            entity.Property(e => e.HorarioFin).HasColumnName("horarioFin");
            entity.Property(e => e.HorarioInicio).HasColumnName("horarioInicio");
            entity.Property(e => e.PsicologoId).HasColumnName("psicologoId");

            entity.HasOne(d => d.Psicologo).WithMany(p => p.Disponibilidads)
                .HasForeignKey(d => d.PsicologoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_disponibilidad_psicologo");
        });

        modelBuilder.Entity<MedioEnvio>(entity =>
        {
            entity.ToTable("medioEnvio");

            entity.Property(e => e.MedioEnvioId).HasColumnName("medioEnvioId");
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsFixedLength()
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Notificacion>(entity =>
        {
            entity.HasKey(e => e.NotificacionoId).HasName("PK_recordatorioTurno");

            entity.ToTable("notificacion");

            entity.Property(e => e.NotificacionoId).HasColumnName("notificacionoId");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .IsFixedLength()
                .HasColumnName("estado");
            entity.Property(e => e.FechaEnvio)
                .HasColumnType("datetime")
                .HasColumnName("fechaEnvio");
            entity.Property(e => e.IntentosEnvio).HasColumnName("intentosEnvio");
            entity.Property(e => e.MedioEnvioId).HasColumnName("medioEnvioId");
            entity.Property(e => e.ResultadoEnvio)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("resultadoEnvio");
            entity.Property(e => e.TurnoId).HasColumnName("turnoId");

            entity.HasOne(d => d.MedioEnvio).WithMany(p => p.Notificacions)
                .HasForeignKey(d => d.MedioEnvioId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_notificacion_medioEnvio");

            entity.HasOne(d => d.Turno).WithMany(p => p.Notificacions)
                .HasForeignKey(d => d.TurnoId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_notificacion_turno");
        });

        modelBuilder.Entity<Paciente>(entity =>
        {
            entity.ToTable("paciente");

            entity.Property(e => e.PacienteId).HasColumnName("pacienteId");
            entity.Property(e => e.Apellido)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("apellido");
            entity.Property(e => e.Direccion)
                .HasMaxLength(200)
                .IsFixedLength()
                .HasColumnName("direccion");
            entity.Property(e => e.Dni)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("DNI");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsFixedLength()
                .HasColumnName("email");
            entity.Property(e => e.FechaNacimineto).HasColumnName("fechaNacimineto");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("nombre");
            entity.Property(e => e.NumeroPaciente)
                .HasMaxLength(50)
                .HasColumnName("numeroPaciente");
            entity.Property(e => e.Telefono)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("telefono");
        });

        modelBuilder.Entity<PlanTurno>(entity =>
        {
            entity.ToTable("planTurno");

            entity.Property(e => e.PlanTurnoId).HasColumnName("planTurnoId");
            entity.Property(e => e.CantidadTurno).HasColumnName("cantidadTurno");
            entity.Property(e => e.FechaInicio).HasColumnName("fechaInicio");
            entity.Property(e => e.FehcaFin).HasColumnName("fehcaFin");
            entity.Property(e => e.PacienteId).HasColumnName("pacienteId");
            entity.Property(e => e.PsicologoId).HasColumnName("psicologoId");

            entity.HasOne(d => d.Paciente).WithMany(p => p.PlanTurnos)
                .HasForeignKey(d => d.PacienteId)
                .HasConstraintName("FK_planTurno_paciente");

            entity.HasOne(d => d.Psicologo).WithMany(p => p.PlanTurnos)
                .HasForeignKey(d => d.PsicologoId)
                .HasConstraintName("FK_planTurno_psicologo");
        });

        modelBuilder.Entity<Psicologo>(entity =>
        {
            entity.ToTable("psicologo");

            entity.Property(e => e.PsicologoId).HasColumnName("psicologoId");
            entity.Property(e => e.Apellido)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("apellido");
            entity.Property(e => e.Email)
                .HasMaxLength(150)
                .IsFixedLength()
                .HasColumnName("email");
            entity.Property(e => e.Matricula)
                .HasMaxLength(50)
                .IsFixedLength()
                .HasColumnName("matricula");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("nombre");
            entity.Property(e => e.RolId).HasColumnName("rolId");
            entity.Property(e => e.Telefono)
                .HasMaxLength(20)
                .IsFixedLength()
                .HasColumnName("telefono");
            entity.Property(e => e.UsuarioId).HasColumnName("usuarioId");

            entity.HasOne(d => d.Rol).WithMany(p => p.Psicologos)
                .HasForeignKey(d => d.RolId)
                .HasConstraintName("FK_psicologo_rol");

            entity.HasOne(d => d.Usuario).WithMany(p => p.Psicologos)
                .HasForeignKey(d => d.UsuarioId)
                .HasConstraintName("FK_psicologo_usuario");
        });

        modelBuilder.Entity<Rol>(entity =>
        {
            entity.ToTable("rol");

            entity.Property(e => e.RolId).HasColumnName("rolId");
            entity.Property(e => e.Nombre)
                .HasMaxLength(10)
                .IsFixedLength()
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<Turno>(entity =>
        {
            entity.ToTable("turno");

            entity.Property(e => e.TurnoId).HasColumnName("turnoId");
            entity.Property(e => e.ConsultorioId).HasColumnName("consultorioId");
            entity.Property(e => e.Duarcion).HasColumnName("duarcion");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .IsFixedLength()
                .HasColumnName("estado");
            entity.Property(e => e.Fehca).HasColumnName("fehca");
            entity.Property(e => e.Hora).HasColumnName("hora");
            entity.Property(e => e.PacienteId).HasColumnName("pacienteId");
            entity.Property(e => e.PlanTurnoId).HasColumnName("planTurnoId");
            entity.Property(e => e.PsicologoId).HasColumnName("psicologoId");
            entity.Property(e => e.TipoAsistencia)
                .HasMaxLength(50)
                .IsFixedLength()
                .HasColumnName("tipoAsistencia");
            entity.Property(e => e.Url).HasColumnName("url");

            entity.HasOne(d => d.Consultorio).WithMany(p => p.Turnos)
                .HasForeignKey(d => d.ConsultorioId)
                .HasConstraintName("FK_turno_consultorio");

            entity.HasOne(d => d.Paciente).WithMany(p => p.Turnos)
                .HasForeignKey(d => d.PacienteId)
                .HasConstraintName("FK_turno_paciente");

            entity.HasOne(d => d.PlanTurno).WithMany(p => p.Turnos)
                .HasForeignKey(d => d.PlanTurnoId)
                .HasConstraintName("FK_turno_planTurno");

            entity.HasOne(d => d.Psicologo).WithMany(p => p.Turnos)
                .HasForeignKey(d => d.PsicologoId)
                .HasConstraintName("FK_turno_psicologo");
        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.ToTable("usuario");

            entity.Property(e => e.UsuarioId).HasColumnName("usuarioId");
            entity.Property(e => e.Email)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("email");
            entity.Property(e => e.Estado).HasColumnName("estado");
            entity.Property(e => e.FechaIngreso).HasColumnName("fechaIngreso");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .IsFixedLength()
                .HasColumnName("nombre");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(200)
                .IsFixedLength()
                .HasColumnName("passwordHash");
            entity.Property(e => e.Rol)
                .HasMaxLength(50)
                .IsFixedLength()
                .HasColumnName("rol");
            entity.Property(e => e.UltimoAcceso).HasColumnName("ultimoAcceso");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
