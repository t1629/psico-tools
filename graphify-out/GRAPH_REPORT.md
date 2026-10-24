# Graph Report - psico-tools  (2026-10-23)

## Corpus Check
- Corpus is ~36,809 words - fits in a single context window. You may not need a graph.

## Summary
- 1062 nodes · 2214 edges · 70 communities (58 shown, 12 thin omitted)
- Extraction: 92% EXTRACTED · 7% INFERRED · 0% AMBIGUOUS · INFERRED: 164 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Agenda & PlanTurno UI
- Login & JWT Auth
- Psicólogo DTO Fields
- Agenda DTO Fields
- Frontend Build & Deps
- Consultorio CRUD API
- Secured Agenda API
- Turno Management API
- PlanTurno DTO Fields
- Domain Entities
- Paciente CRUD API
- Design System Docs
- Turno DTO Fields
- API Controllers
- Entity-DTO Mappers
- Attendance UI Components
- Consultorio Entity
- Turno Entity
- Turno Entity Detail
- Backend Architecture Docs
- ASP.NET Launch Profiles
- EF Context DbSets
- App Entry & Services
- Backend Project Packages
- Frontend Routing
- Layout & Navigation
- Model Config Notificaciones
- Database Context
- Psicólogo Entity
- Repository Layer
- Paciente Entity
- Auth UI & Context
- Paciente Entity Fields
- Context Schema Detail
- EF Migrations
- Icon Sprite Sheet
- Turno Filter View
- Calendar Nav & Theme
- Psicólogo UI
- Agenda Entity
- Notificación Entity
- Usuario Entity
- Notificación Model Detail
- Launch Profiles Detail
- Favicon Bolt SVG
- Migration Snapshot Files
- White Square Logo Assets
- Consultorio UI
- PlanTurno Entity
- Midori Large Logo
- React Brand Logo
- Data Project Packages
- Model Config Roles
- Attendance Stats DTO
- Circular Logo Assets
- Rectangular Logo Assets
- Paciente UI
- Hero Illustration
- Named Logotype Assets
- Large Logo Mark Assets
- Dark Logo Assets
- Vite Brand Logo
- MedioEnvio Entity
- Square Logo Assets
- Estado DTO
- Frontend Agenda DTO

## God Nodes (most connected - your core abstractions)
1. `fetchApi()` - 54 edges
2. `PsychologistsAPI.Models` - 45 edges
3. `Turno` - 39 edges
4. `PsyClinicDbContext` - 37 edges
5. `PsychologistsAPI.Dtos` - 34 edges
6. `TurnoDto` - 31 edges
7. `Turno` - 29 edges
8. `Agenda` - 29 edges
9. `react` - 29 edges
10. `PsyClinicDbContext` - 28 edges

## Surprising Connections (you probably didn't know these)
- `PsicoTools` --conceptually_related_to--> `PsychologistsAPI Project Structure`  [INFERRED]
  README.md → BackEnd/PsychologistsAPI/ReadMe.md
- `PsicoTools` --conceptually_related_to--> `PsicoTools Design System`  [INFERRED]
  README.md → FrontEnd/.agents/context/design-system.md
- `PsicoTools` --conceptually_related_to--> `React + Vite Template`  [INFERRED]
  README.md → FrontEnd/README.md
- `session()` --calls--> `fetchApi()`  [EXTRACTED]
  FrontEnd/src/services/AuthService.js → FrontEnd/src/services/apiClient.js
- `Root Div (#root)` --conceptually_related_to--> `React`  [INFERRED]
  FrontEnd/index.html → FrontEnd/README.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **PsychologistsAPI Layered Architecture** — backend_psychologistsapi_readme_controllers, backend_psychologistsapi_readme_services, backend_psychologistsapi_readme_repositories, backend_psychologistsapi_readme_data, backend_psychologistsapi_readme_models, backend_psychologistsapi_readme_dtos, backend_psychologistsapi_readme_mapper [INFERRED 0.85]
- **Authentication Flow (Login / Session / Logout)** — backend_psychologistsapi_readme_login_endpoint, backend_psychologistsapi_readme_session_endpoint, backend_psychologistsapi_readme_logout_endpoint [INFERRED 0.85]
- **PsicoTools Design Token System** — frontend__agents_context_design_system_palette_primitives, frontend__agents_context_design_system_light_mode_semantic_tokens, frontend__agents_context_design_system_dark_mode_semantic_tokens, frontend__agents_context_design_system_wcag_aa_contrast_rules, frontend__agents_context_design_system_typography [EXTRACTED 1.00]
- **Mask + blurred ellipse construction of the gradient-bolt icon** — frontend_public_favicon_favicon, frontend_public_favicon_alpha_mask, frontend_public_favicon_foreground_blur_filters, frontend_public_favicon_brand_gradient_colors [EXTRACTED 1.00]
- **Figma-authored favicon export pipeline (effect naming, blur shadows, P3 color fallbacks)** — frontend_public_favicon_favicon, frontend_public_favicon_figma_export, frontend_public_favicon_foreground_blur_filters, frontend_public_favicon_p3_color_fallback [INFERRED 0.85]
- **Purple gradient bolt as the frontend brand identity** — frontend_public_favicon_lightning_bolt_glyph, frontend_public_favicon_brand_gradient_colors, frontend_public_favicon_site_branding [INFERRED 0.75]
- **Social Platform Brand Icon Set (Bluesky, Discord, GitHub, X)** — frontend_public_icons_bluesky_icon, frontend_public_icons_discord_icon, frontend_public_icons_github_icon, frontend_public_icons_x_icon, frontend_public_icons_social_links, frontend_public_icons [INFERRED 0.85]
- **Purple Outline Feature Icons (#aa3bff)** — frontend_public_icons_documentation_icon, frontend_public_icons_social_icon, frontend_public_icons_purple_accent_outline_style [EXTRACTED 1.00]
- **Dark Fill Brand Logos (#08060d)** — frontend_public_icons_bluesky_icon, frontend_public_icons_discord_icon, frontend_public_icons_github_icon, frontend_public_icons_x_icon, frontend_public_icons_dark_fill_brand_style [EXTRACTED 1.00]
- **Hero Illustration Visual Identity (Isometric Layered Slabs in Purple)** — frontend_src_assets_hero_hero_illustration, frontend_src_assets_hero_layered_stack_motif, frontend_src_assets_hero_isometric_render_style, frontend_src_assets_hero_purple_brand_palette [INFERRED 0.85]
- **Midori Logo Visual Composition** — frontend_src_assets_logos_jpg_logo_rectangular_rectangular_logo, frontend_src_assets_logos_jpg_logo_rectangular_brain_checkmark_glyph, frontend_src_assets_logos_jpg_logo_rectangular_midori_wordmark, frontend_src_assets_logos_jpg_logo_rectangular_dark_teal_white_palette [EXTRACTED 1.00]
- **Frontend Brand Identity Assets** — frontend_src_assets_logos_jpg_logo_rectangular_rectangular_logo, frontend_src_assets_logos_jpg_logo_rectangular_midori_brand, frontend_src_assets_logos_jpg_logo_rectangular_psychology_self_assessment_concept [INFERRED 0.75]
- **Circular Logo Visual Composition** — frontend_src_assets_logos_jpg_logo_circular_circular_logo, frontend_src_assets_logos_jpg_logo_circular_brain_iconography, frontend_src_assets_logos_jpg_logo_circular_checkmark_motif, frontend_src_assets_logos_jpg_logo_circular_teal_circular_badge [EXTRACTED 1.00]
- **Psychology Brand Identity System** — frontend_src_assets_logos_jpg_logo_circular_circular_logo, frontend_src_assets_logos_jpg_logo_circular_psychology_brand_identity, frontend_src_assets_logos_jpg_logo_circular_white_line_art_style [INFERRED 0.75]
- **Midori Logo Composition** — frontend_src_assets_logos_jpg_logo_con_nombre_midori_logotype, frontend_src_assets_logos_jpg_logo_con_nombre_brain_checkmark_icon, frontend_src_assets_logos_jpg_logo_con_nombre_midori_wordmark [EXTRACTED 1.00]
- **Midori Branding of Psico-Tools** — frontend_src_assets_logos_jpg_logo_con_nombre_midori_brand_identity, frontend_src_assets_logos_jpg_logo_con_nombre_midori_logotype, frontend_src_assets_logos_jpg_logo_con_nombre_psico_tools_application [INFERRED 0.75]
- **Psico-Tools Square Logo Brand Identity** — frontend_src_assets_logos_jpg_logo_cuadrado_square_logo, frontend_src_assets_logos_jpg_logo_cuadrado_psico_tools_brand, frontend_src_assets_logos_jpg_logo_cuadrado_brain_checkmark_iconography, frontend_src_assets_logos_jpg_logo_cuadrado_teal_glyph_style [INFERRED 0.75]
- **White Square Logo Visual Composition** — frontend_src_assets_logos_jpg_logo_cuadrado_blanco_removebg_preview_white_square_logo, frontend_src_assets_logos_jpg_logo_cuadrado_blanco_removebg_preview_brain_and_checkmark_emblem, frontend_src_assets_logos_jpg_logo_cuadrado_blanco_removebg_preview_white_rounded_square_badge, frontend_src_assets_logos_jpg_logo_cuadrado_blanco_removebg_preview_teal_green_monochrome_palette [EXTRACTED 1.00]
- **Psico-Tools Frontend Brand Asset Role** — frontend_src_assets_logos_jpg_logo_cuadrado_blanco_removebg_preview_white_square_logo, frontend_src_assets_logos_jpg_logo_cuadrado_blanco_removebg_preview_app_icon_usage_role, frontend_src_assets_logos_jpg_logo_cuadrado_blanco_removebg_preview_psico_tools_brand_identity, frontend_src_assets_logos_jpg_logo_cuadrado_blanco_removebg_preview_removebg_background_removal [INFERRED 0.85]
- **Midori Logo Composition** — frontend_src_assets_logos_jpg_logo_grande_large_logo, frontend_src_assets_logos_jpg_logo_grande_midori_wordmark, frontend_src_assets_logos_jpg_logo_grande_brain_checkmark_emblem, frontend_src_assets_logos_jpg_logo_grande_teal_navy_palette [EXTRACTED 1.00]
- **Midori Brand System for Psico-Tools** — frontend_src_assets_logos_jpg_logo_grande_large_logo, frontend_src_assets_logos_jpg_logo_grande_midori_brand_identity, frontend_src_assets_logos_jpg_logo_grande_psico_tools_application [INFERRED 0.75]
- **FrontEnd Brand Logo Asset Family** — frontend_src_assets_logos_jpg_logo_grande_solo_large_logo_mark_only, frontend_src_assets_logos_jpg_logo_grande_solo_named_logo_companion_variant, frontend_src_assets_logos_jpg_logo_grande_solo_psico_tools_brand_identity [INFERRED 0.75]
- **Midori Dark Logo Visual Composition** — frontend_src_assets_logos_jpg_logo_oscuro_midori_logo_dark, frontend_src_assets_logos_jpg_logo_oscuro_brain_and_checkmark_emblem, frontend_src_assets_logos_jpg_logo_oscuro_dark_mono_palette [EXTRACTED 1.00]
- **Midori Brand Identity System** — frontend_src_assets_logos_jpg_logo_oscuro_midori_logo_dark, frontend_src_assets_logos_jpg_logo_oscuro_midori_brand, frontend_src_assets_logos_jpg_logo_oscuro_brain_and_checkmark_emblem, frontend_src_assets_logos_jpg_logo_oscuro_dark_mono_palette [INFERRED 0.85]
- **React Logo Visual Composition** — frontend_src_assets_react_react_svg_file, frontend_src_assets_react_react_logo, frontend_src_assets_react_react_atom_symbol, frontend_src_assets_react_react_nucleus_circle [EXTRACTED 1.00]
- **React Brand Asset Provenance (Iconify Logos Set)** — frontend_src_assets_react_react_svg_file, frontend_src_assets_react_iconify_logos_set, frontend_src_assets_react_react_logo, frontend_src_assets_react_react_library_concept [INFERRED 0.85]
- **Vite Logo Visual Composition (bolt mark + parentheses + glow filters + accessible title)** — frontend_src_assets_vite_vite_logo, frontend_src_assets_vite_vite_title_element, frontend_src_assets_vite_parenthesis_css_class, frontend_src_assets_vite_blur_filter_defs [EXTRACTED 1.00]
- **Vite branding participates in the Vite-built frontend app asset identity** — frontend_src_assets_vite_vite_logo, frontend_src_assets_vite_vite_build_tool [INFERRED 0.75]

## Communities (70 total, 12 thin omitted)

### Community 0 - "Agenda & PlanTurno UI"
Cohesion: 0.08
Nodes (46): useCalendar(), usePlanTurno(), PlanTurnoForm(), fetchApi(), create(), getAll(), getByDate(), getById() (+38 more)

### Community 1 - "Login & JWT Auth"
Cohesion: 0.05
Nodes (31): loginController, Login, Email, PasswordHash, sessionDto, Email, Nombre, UltimoAcceso (+23 more)

### Community 2 - "Psicólogo DTO Fields"
Cohesion: 0.06
Nodes (35): PsicologoDto, Apellido, Email, Nombre, PsicologoId, RolNombre, Telefono, TurnoDetalleDto (+27 more)

### Community 3 - "Agenda DTO Fields"
Cohesion: 0.07
Nodes (31): AgendaDto, AgendaId, ConsultorioId, ConsultorioNombre, Descripcion, Estado, Fecha, HoraFin (+23 more)

### Community 4 - "Frontend Build & Deps"
Cohesion: 0.06
Nodes (36): dependencies, date-fns, @fontsource/roboto, lucide-react, react, react-big-calendar, react-dom, react-router-dom (+28 more)

### Community 5 - "Consultorio CRUD API"
Cohesion: 0.10
Nodes (19): ConsultorioController, ConsultorioDto, Calle, ConsultorioId, Nombre, Numero, TipoModalidadId, TipoModalidadNombre (+11 more)

### Community 6 - "Secured Agenda API"
Cohesion: 0.13
Nodes (6): agendaController, logoutController, planTurnoController, psicologoController, sessionController, usuarioController

### Community 7 - "Turno Management API"
Cohesion: 0.15
Nodes (3): turnoController, TurnoRepository, TurnoService

### Community 8 - "PlanTurno DTO Fields"
Cohesion: 0.12
Nodes (16): PlanTurnoDto, CantidadTurno, FechaFin, FechaInicio, Pacientes, PlanTurnoId, PsicologoId, PlanTurnoMapper (+8 more)

### Community 10 - "Paciente CRUD API"
Cohesion: 0.13
Nodes (11): pacienteController, PacienteDto, Apellido, Dni, Email, FechaNacimineto, Nombre, PacienteId (+3 more)

### Community 11 - "Design System Docs"
Cohesion: 0.10
Nodes (25): Dark Mode Semantic Tokens, Light Mode Semantic Tokens, Palette Primitives (Brand/Accent/Gray/Dark Tokens), PsicoTools Design System, Typography (Roboto + Fallbacks), Frontend index.html (Vite Entry Page), Root Div (#root), ESLint (+17 more)

### Community 12 - "Turno DTO Fields"
Cohesion: 0.10
Nodes (20): TurnoDto, Asistencia, CantidadTurnos, Descripcion, Estado, Fecha, Hora, Minutos (+12 more)

### Community 14 - "Entity-DTO Mappers"
Cohesion: 0.22
Nodes (4): PacienteMapper, PsychologistsAPI.Models, PsychologistsAPI.Dtos, PsychologistsAPI.Mapper

### Community 15 - "Attendance UI Components"
Cohesion: 0.20
Nodes (9): AsistenciComponent(), TurnoCard(), TurnoFilterPicker(), TurnoForm(), useTurno(), TurnoAll(), Turnos(), getWeekRange() (+1 more)

### Community 16 - "Consultorio Entity"
Cohesion: 0.11
Nodes (18): Consultorio, Agenda, Calle, ConsultorioId, Nomrbe, Nuemro, Presencial, TipoModalidad (+10 more)

### Community 17 - "Turno Entity"
Cohesion: 0.11
Nodes (18): Turno, Asistencia, CantidadTurnos, Descripcion, Estado, Fecha, Hora, Minutos (+10 more)

### Community 18 - "Turno Entity Detail"
Cohesion: 0.11
Nodes (18): Turno, Asistencia, CantidadTurnos, Descripcion, Estado, Fecha, Hora, Minutos (+10 more)

### Community 19 - "Backend Architecture Docs"
Cohesion: 0.19
Nodes (18): Agenda Endpoints (/api/agenda), appsettings.json, Controllers (HTTP Endpoints), Data (EF Core Context), DTOs (Data Transfer Objects), Login Endpoint (/api/login), Logout Endpoint (/api/logout), Mapper (Entity-DTO Mapping) (+10 more)

### Community 20 - "ASP.NET Launch Profiles"
Cohesion: 0.13
Nodes (15): ASPNETCORE_ENVIRONMENT, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser, applicationUrl, commandName (+7 more)

### Community 21 - "EF Context DbSets"
Cohesion: 0.12
Nodes (12): PsychologistContext, Agenda, Consultorios, MedioEnvios, Notificacions, Pacientes, PlanTurnos, Psicologos (+4 more)

### Community 23 - "Backend Project Packages"
Cohesion: 0.14
Nodes (12): net10.0, Microsoft.EntityFrameworkCore (10.0.11), Microsoft.EntityFrameworkCore.Design (10.0.11), Microsoft.EntityFrameworkCore.SqlServer (10.0.11), DotNetEnv (3.2.0), Microsoft.AspNetCore.Authentication.JwtBearer (10.0.6), Microsoft.AspNetCore.OpenApi (10.0.6), Microsoft.EntityFrameworkCore.Tools (10.0.11) (+4 more)

### Community 24 - "Frontend Routing"
Cohesion: 0.26
Nodes (10): App(), ProtectedRoute(), PublicRoute(), RootRedirect(), AgendaForm(), DetalleAgenda(), UserContext, UserProvider() (+2 more)

### Community 25 - "Layout & Navigation"
Cohesion: 0.21
Nodes (5): Header(), MainLayout(), Nav(), lucide-react, react-router-dom

### Community 26 - "Model Config Notificaciones"
Cohesion: 0.21
Nodes (8): MedioEnvio, MedioEnvioId, Nombre, Notificacions, Rol, Nombre, Psicologos, RolId

### Community 27 - "Database Context"
Cohesion: 0.15
Nodes (12): PsyClinicDbContext, Agenda, Consultorios, MedioEnvios, Notificacions, Pacientes, PlanTurnos, Psicologos (+4 more)

### Community 28 - "Psicólogo Entity"
Cohesion: 0.15
Nodes (13): Psicologo, Agenda, Apellido, Email, Matricula, Nombre, PsicologoId, Rol (+5 more)

### Community 30 - "Paciente Entity"
Cohesion: 0.15
Nodes (13): Paciente, Agenda, Apellido, Dni, Email, FechaNacimineto, Nombre, NumeroPaciente (+5 more)

### Community 31 - "Auth UI & Context"
Cohesion: 0.22
Nodes (7): LoginPage(), LogoutForm(), AuthProvider(), decodeToken(), Login, Login(), session()

### Community 32 - "Paciente Entity Fields"
Cohesion: 0.17
Nodes (12): Paciente, Apellido, Dni, Email, FechaNacimineto, Nombre, NumeroPaciente, PacienteId (+4 more)

### Community 33 - "Context Schema Detail"
Cohesion: 0.17
Nodes (12): PsyClinicDbContext, Agenda, Consultorios, MedioEnvios, Notificacions, Pacientes, PlanTurnos, Psicologos (+4 more)

### Community 35 - "Icon Sprite Sheet"
Cohesion: 0.30
Nodes (12): Icons SVG Symbol Sprite Sheet, Bluesky Butterfly Logo Icon (symbol #bluesky-icon), Dark Fill Brand Style (#08060d), Discord Mascot Logo Icon (symbol #discord-icon), Documentation Icon - page outline with code-share arrows, purple stroke (symbol #documentation-icon), Documentation Link Usage, GitHub Octocat Logo Icon (symbol #github-icon), Purple Accent Outline Style (#aa3bff, stroke-width 1.35) (+4 more)

### Community 36 - "Turno Filter View"
Cohesion: 0.23
Nodes (8): TurnoFiltradoForm(), locales, localizer, messages, firstValue(), toCalendarEvents(), toDate(), react-big-calendar

### Community 37 - "Calendar Nav & Theme"
Cohesion: 0.20
Nodes (5): ThemeContext, ThemeProvider(), date-fns, @fontsource/roboto, react-dom

### Community 38 - "Psicólogo UI"
Cohesion: 0.35
Nodes (4): PsicologoCard(), PsicologoForm(), usePsicologo(), PsicologoPage()

### Community 39 - "Agenda Entity"
Cohesion: 0.20
Nodes (10): Agenda, AgendaId, Consultorio, ConsultorioId, DiaSemana, Estado, HoraFin, HoraInicio (+2 more)

### Community 40 - "Notificación Entity"
Cohesion: 0.20
Nodes (10): Notificacion, Estado, FechaEnvio, IntentosEnvio, MedioEnvio, MedioEnvioId, NotificacionoId, ResultadoEnvio (+2 more)

### Community 41 - "Usuario Entity"
Cohesion: 0.20
Nodes (10): Usuario, Email, Estado, FechaIngreso, Nombre, PasswordHash, Psicologos, Rol (+2 more)

### Community 42 - "Notificación Model Detail"
Cohesion: 0.20
Nodes (10): Notificacion, Estado, FechaEnvio, IntentosEnvio, MedioEnvio, MedioEnvioId, NotificacionoId, ResultadoEnvio (+2 more)

### Community 43 - "Launch Profiles Detail"
Cohesion: 0.20
Nodes (9): ASPNETCORE_ENVIRONMENT, profiles, PsychologistsAPI, applicationUrl, commandName, dotnetRunMessages, environmentVariables, launchBrowser (+1 more)

### Community 44 - "Favicon Bolt SVG"
Cohesion: 0.24
Nodes (9): Alpha mask clip (mask id="a", mask-type:alpha), Alternate reading: Z-shaped double-chevron monogram, Aurora gradient palette (#ede6ff, #7e14ff, #47bfff over #863bff silhouette), Favicon SVG (48x46 purple gradient bolt icon), Figma design-file export provenance (effect1_foregroundBlur_2002_17158 naming), feGaussianBlur foreground-blur filter stack (filters b-p, stdDeviation 4.596/7.659), Lightning bolt / double zigzag glyph (main path silhouette), Frontend site branding / browser-tab icon asset (+1 more)

### Community 46 - "White Square Logo Assets"
Cohesion: 0.36
Nodes (8): Frontend App Icon Usage Role, Brain and Checkmark Emblem, Psico-Tools Brand Identity, Psychology Assessment Visual Metaphor (Mind + Check), Remove.bg Background Removal Processing, Teal-Green Monochrome Palette, White Rounded Square Badge, White Square Logo (Background Removed)

### Community 47 - "Consultorio UI"
Cohesion: 0.61
Nodes (4): ConsultorioForm(), useConsultorio(), Consultorio(), react

### Community 48 - "PlanTurno Entity"
Cohesion: 0.29
Nodes (7): PlanTurno, CantidadTurno, FechaInicio, FehcaFin, Pacientes, PlanTurnoId, Turnos

### Community 50 - "Midori Large Logo"
Cohesion: 0.43
Nodes (7): Brain and Checkmark Emblem, Large Logo (MIDORI), Logo Grande Asset Variant, Midori Brand Identity, MIDORI Wordmark, Psico-Tools Application, Teal and Navy Color Palette

### Community 51 - "React Brand Logo"
Cohesion: 0.38
Nodes (7): Iconify Logos Icon Set, Atom Symbol (Three Electron Orbits), React JavaScript Library, React Logo (Brand Mark), React Logo Central Nucleus Circle, React Logo SVG File, Vite React Starter Template Asset

### Community 52 - "Data Project Packages"
Cohesion: 0.33
Nodes (5): net10.0, Microsoft.EntityFrameworkCore (10.0.11), Microsoft.EntityFrameworkCore.Design (10.0.11), Microsoft.EntityFrameworkCore.SqlServer (10.0.11), Microsoft.NET.Sdk

### Community 53 - "Model Config Roles"
Cohesion: 0.33
Nodes (4): Rol, Nombre, Psicologos, RolId

### Community 54 - "Attendance Stats DTO"
Cohesion: 0.33
Nodes (5): AttendanceStatsDto, Ausentes, PorcentajeAsistencia, Presentes, TotalTurnos

### Community 55 - "Circular Logo Assets"
Cohesion: 0.60
Nodes (6): Brain Iconography, Checkmark Motif, Circular Logo (psico-tools), Psychology Brand Identity, Teal Circular Badge, White Line-Art Iconography

### Community 56 - "Rectangular Logo Assets"
Cohesion: 0.47
Nodes (6): Brain-Checkmark Glyph, Dark Teal and White Palette, Midori Brand, Midori Serif Wordmark, Psychology Self-Assessment Checkup Concept, Rectangular Logo

### Community 57 - "Paciente UI"
Cohesion: 0.60
Nodes (3): PacienteForm(), usePaciente(), PacientePage()

### Community 58 - "Hero Illustration"
Cohesion: 0.60
Nodes (5): Hero Illustration (Layered Slabs), Isometric 3D Render Style, Landing Page Hero Section, Layered Stack Motif, Purple Brand Palette

### Community 59 - "Named Logotype Assets"
Cohesion: 0.70
Nodes (5): Brain and Checkmark Icon, Midori Brand Identity, Midori Logotype with Name, MIDORI Wordmark, Psico-Tools Application

### Community 60 - "Large Logo Mark Assets"
Cohesion: 0.40
Nodes (5): Brain And Check Mark Symbol, Large Logo Mark Only, Named Logo Companion Variant, Psico Tools Brand Identity, Teal Green Gradient Palette

### Community 61 - "Dark Logo Assets"
Cohesion: 0.60
Nodes (4): Brain and Checkmark Emblem, Dark Slate Monochrome Palette, Midori Brand, Midori Dark Logo

### Community 62 - "Vite Brand Logo"
Cohesion: 0.40
Nodes (5): Figma-exported Gaussian Blur Filter Defs (ids b-p, effect1_foregroundBlur_2002_17286), Parenthesis CSS Class with prefers-color-scheme:dark override, Vite Build Tool (concept), Vite Logo (parenthesized bolt icon SVG), Vite SVG Accessible Title Element (aria-labelledby="vite-logo-title")

### Community 63 - "MedioEnvio Entity"
Cohesion: 0.50
Nodes (4): MedioEnvio, MedioEnvioId, Nombre, Notificacions

### Community 64 - "Square Logo Assets"
Cohesion: 0.83
Nodes (4): Brain and Checkmark Iconography, Psico-Tools Brand, Square Logo, Teal Rounded-Square Glyph Style

## Ambiguous Edges - Review These
- `Lightning bolt / double zigzag glyph (main path silhouette)` → `Alternate reading: Z-shaped double-chevron monogram`  [AMBIGUOUS]
  FrontEnd/public/favicon.svg · relation: conceptually_related_to
- `Social Icon - person with five-pointed star badge, purple stroke (symbol #social-icon)` → `Community / Social Links (Bluesky, Discord, GitHub, X)`  [AMBIGUOUS]
  FrontEnd/public/icons.svg · relation: conceptually_related_to
- `Hero Illustration (Layered Slabs)` → `Landing Page Hero Section`  [AMBIGUOUS]
  FrontEnd/src/assets/hero.png · relation: conceptually_related_to
- `Large Logo (MIDORI)` → `Logo Grande Asset Variant`  [AMBIGUOUS]
  FrontEnd/src/assets/logos.jpg/logo_grande.png · relation: references
- `React Logo SVG File` → `React JavaScript Library`  [AMBIGUOUS]
  FrontEnd/src/assets/react.svg · relation: conceptually_related_to
- `Vite Logo (parenthesized bolt icon SVG)` → `Vite Build Tool (concept)`  [AMBIGUOUS]
  FrontEnd/src/assets/vite.svg · relation: rationale_for

## Knowledge Gaps
- **347 isolated node(s):** `Agenda`, `Consultorios`, `MedioEnvios`, `Notificacions`, `Pacientes` (+342 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 440 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **12 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PsychologistsAPI.Models` connect `Entity-DTO Mappers` to `Login & JWT Auth`, `Domain Entities`, `API Controllers`, `App Entry & Services`, `Repository Layer`?**
  _High betweenness centrality (0.057) - this node is a cross-community bridge._
- **What connects `Agenda`, `Consultorios`, `MedioEnvios` to the rest of the system?**
  _347 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Agenda & PlanTurno UI` be split into smaller, more focused modules?**
  _Cohesion score 0.07627118644067797 - nodes in this community are weakly interconnected._
- **Why does `PsychologistsAPI Project Structure` connect `Backend Architecture Docs` to `Design System Docs`, `App Entry & Services`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Should `Login & JWT Auth` be split into smaller, more focused modules?**
  _Cohesion score 0.052525252525252523 - nodes in this community are weakly interconnected._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `Lightning bolt / double zigzag glyph (main path silhouette)` and `Alternate reading: Z-shaped double-chevron monogram`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **What is the exact relationship between `Social Icon - person with five-pointed star badge, purple stroke (symbol #social-icon)` and `Community / Social Links (Bluesky, Discord, GitHub, X)`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._