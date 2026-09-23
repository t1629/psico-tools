import { useNavigate } from "react-router-dom";
import "../styles/layout/LogoutPage.css";

const LogoutPage = () => {
  const navigate = useNavigate();

  const handleExit = () => {
    // Redirige al login o página pública
    navigate("/login");
  };

  return (
    <main className="logout-page">
      <div className="logout-card">
        <h1>¡Hasta pronto!</h1>
        <p>
          Gracias por tu dedicación y compromiso con tus pacientes.
          <br />
          Cerraste sesión en el sistema de agenda clínica.
        </p>
        <button className="logout-button" onClick={handleExit}>
          Volver al inicio
        </button>
      </div>
    </main>
  );
};

export default LogoutPage;
