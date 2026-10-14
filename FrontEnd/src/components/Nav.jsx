import "../styles/UI/Nav.css";
import { Link } from "react-router-dom";

// Motivo: "Cerrar sesión" se traslada al popup del usuario en el Header
// (petición del usuario). Nav queda solo con navegación + botón colapso;
// se elimina el modal LogoutForm y su estado local ya sin uso.
function Nav({ isOpen, toggleNav }) {
  return (
    <nav
      aria-label="Navegación principal"
      className={`side-nav ${isOpen ? "side-nav--open" : "side-nav--collapsed"}`}
    >
      <ul className="side-nav__list">
        <li className="side-nav__item">
          <button
            type="button"
            className="side-nav__toggle-btn"
            onClick={toggleNav}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Colapsar navegación" : "Expandir navegación"}
          >
            {isOpen ? "◀" : "▶"}
          </button>
        </li>
        <li className="side-nav__item">
          <Link to="/inicio" className="side-nav__link">
            Inicio
          </Link>
        </li>
        <li className="side-nav__item">
          <Link to="/paciente" className="side-nav__link">
            Paciente
          </Link>
        </li>
        <li className="side-nav__item">
          <Link to="/turnos" className="side-nav__link">
            Turnos
          </Link>
        </li>
        <li className="side-nav__item">
          <Link to="/turno/todos" className="side-nav__link">
            Todos los Turnos
          </Link>
        </li>
        <li className="side-nav__item">
          <Link to="/crearAgenda" className="side-nav__link">
            Crear Agenda
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
