import "../styles/UI/Nav.css";
import { Link } from "react-router-dom";

function Nav() {
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
      </ul>
    </nav>
  );
}

export default Nav;
