import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Inicio from "./pages/Inicio";
import Turnos from "./pages/Turnos";
import Paciente from "./pages/Paciente";
import Nav from "./components/Nav";
import { UserProvider } from "./hooks/UseProvider";
import Header from "./components/Header";
import MainLayout from "./components/MainLayout";
import "./App.css";

//localStorage.getItem("token") Remplase temporalmente la linea 14 con el true para poder entrar al las interfazes sin necesidad de inicia la API

function ProtectedRoute({ children }) {
  return true ? children : <Navigate to="/login" replace />;
}

function App() {
  return (
    <div className="app-shell">
      <UserProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/inicio" replace />} />
          <Route path="/login" element={<Navigate to="/inicio" replace />} />
          <Route element={<MainLayout />}>
            <Route
              path="/inicio"
              element={
                <ProtectedRoute>
                  <Inicio />
                </ProtectedRoute>
              }
            />
            <Route
              path="/paciente"
              element={
                <ProtectedRoute>
                  <Paciente />
                </ProtectedRoute>
              }
            />
            <Route
              path="/turnos"
              element={
                <ProtectedRoute>
                  <Turnos />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
