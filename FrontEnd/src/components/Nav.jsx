import "../styles/UI/Nav.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import LogoutForm from "./LogoutCard";
function Nav() {
  const [showLogout, setShowLogout] = useState(false);
  return (
    <nav className="side-nav" aria-label="Navegación principal">
      <ul className="side-nav__list">
        <li className="side-nav__item">
          <Link to="Inicio" className="side-nav__link">
            Inicio
          </Link>
        </li>
        <li className="side-nav__item">
          <Link to="/Paciente" className="side-nav__link">
            Paciente
          </Link>
        </li>
        <li className="side-nav__item">
          <Link to="Turnos" className="side-nav__link">
            Turnos
          </Link>
        </li>
        <li className="side-nav__item">
          <Link to="Login" className="side-nav__link">
            Login
          </Link>
        </li>
        <li className="side-nav__item">
          <button
            className="side-nav__link"
            onClick={() => setShowLogout(true)}
          >
            Cerrar sesión
          </button>
        </li>
      </ul>
      {showLogout && <LogoutForm onClose={() => setShowLogout(false)} />}
    </nav>
  );
}

export default Nav;
