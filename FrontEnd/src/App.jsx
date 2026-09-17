import LoginForm from "./components/LoginForm";
import Inicio from "./pages/Inicio";
import Turnos from "./pages/Turnos";
import Paciente from "./pages/Paciente";
import { Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/Login" element={<LoginForm />} />
        <Route path="/Inicio" element={<Inicio />} />
        <Route path="/Paciente" element={<Paciente />} />
        <Route path="/Turnos" element={<Turnos />} />
      </Routes>
    </div>
  );
}

export default App;
