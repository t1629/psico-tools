import Header from "../components/Header";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import { useState } from "react";

// Motivo: el grid de 2 columnas metía a Header como celda lateral.
// Ahora Header va full-width arriba y Nav+Outlet comparten una fila
// inferior (layout-body), logrando la barra horizontal superior.
export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div className="layout-container">
      <Header />
      <div className={`layout-body ${isOpen ? "sidebar-open" : "sidebar-closed"}`}>
        <Nav isOpen={isOpen} toggleNav={toggleNav} />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
