import Header from "../components/Header";
import Nav from "../components/Nav";
import { Outlet } from "react-router-dom";
import { useState } from "react";
export default function MainLayout() {
  const [isOpen, setIsOpen] = useState(true);
  const toggleNav = () => {
    setIsOpen((prev) => !prev);
  };
  return (
    <div
      className={`layout-container ${isOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <Header />
      <Nav isOpen={isOpen} toggleNav={toggleNav} />
      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
