import "../styles/layout/Header.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function Header() {
  const { user } = useContext(UserContext);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "??";

  return (
    <header className="app-header">
      <h1 className="app-header__title">Psicólogos UI</h1>

      <div className="app-header__profile">
        <div className="profile-avatar">{initials}</div>
        <div className="profile-info">
          <strong>{user?.name ?? "Invitado"}</strong>
          <span>{user ? "Psicólogo" : "Sin rol"}</span>
        </div>
      </div>
    </header>
  );
}
