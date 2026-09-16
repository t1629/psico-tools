import "./Nav.css";

const navigationItems = ["Inicio", "Paciente", "Turnos"];

function Nav() {
  return (
    <nav className="side-nav" aria-label="Navegación principal">
      <ul className="side-nav__list">
        {navigationItems.map((item) => (
          <li key={item} className="side-nav__item">
            <a href={`#${item.toLowerCase()}`} className="side-nav__link">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Nav;
