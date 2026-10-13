import "../styles/layout/Header.css";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { ThemeContext } from "../context/ThemeContext";
import { Moon, Sun } from "lucide-react";
import LogoutForm from "./LogoutCard";

// Motivo 1: el interruptor de tema se mueve del menú a la izquierda del
// usuario (petición del usuario). Sigue siendo único en toda la app.
// Motivo 2: "Cerrar sesión" abre la tarjeta flotante de confirmación en
// vez de cerrar sesión directo (petición del usuario).
export default function Header() {
  const { user } = useContext(UserContext);
  const { toggleTheme, currentTheme } = useContext(ThemeContext);
  const isDark = currentTheme === "dark";
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const menuRef = useRef(null);
  const profileBtnRef = useRef(null);

  const initials = user?.Name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "??";

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        profileBtnRef.current?.focus();
      }
    };
    const onPointer = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [menuOpen]);

  const handleLogout = () => {
    setMenuOpen(false);
    setShowLogout(true);
  };

  return (
    <header className="app-header">
      <h1 className="app-header__title">Psicólogos UI</h1>

      <div className="app-header__actions">
        <button
          type="button"
          className="app-header__theme-toggle"
          onClick={toggleTheme}
          aria-pressed={isDark}
// Motivo: botón solo-icono (se elimina el texto) con ambos iconos apilados:
// el fundido/rotación sol↔luna se anima por CSS según aria-pressed.
          aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
        >
          <span className="theme-icon-stack" aria-hidden="true">
            <Sun size={18} className="theme-icon theme-icon--sun" />
            <Moon size={18} className="theme-icon theme-icon--moon" />
          </span>
        </button>

        <div className="app-header__profile-wrap" ref={menuRef}>
          <button
            ref={profileBtnRef}
            type="button"
            className="app-header__profile"
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-controls="profile-menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="profile-avatar" aria-hidden="true">
              {initials}
            </span>
            <span className="profile-info">
              <strong>{user?.name ?? "Invitado"}</strong>
              <span>{user ? "Psicólogo" : "Sin rol"}</span>
            </span>
          </button>

          <div
            id="profile-menu"
            className="profile-menu"
            role="menu"
            aria-label="Menú de perfil"
            hidden={!menuOpen}
          >
            <Link
              role="menuitem"
              to="/turnos"
              onClick={() => setMenuOpen(false)}
            >
              Mis turnos
            </Link>
            <Link
              role="menuitem"
              to="/paciente"
              onClick={() => setMenuOpen(false)}
            >
              Pacientes
            </Link>
            <button type="button" role="menuitem" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>

      {showLogout && <LogoutForm onClose={() => setShowLogout(false)} />}
    </header>
  );
}
