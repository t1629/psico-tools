import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import LoginForm from "./components/LoginForm";
import Inicio from "./pages/Inicio";
import Turnos from "./pages/Turnos";
import Paciente from "./pages/Paciente";
import { UserProvider } from "./hooks/UseProvider";
import { Login as AuthContext } from "./context/authContext";
import MainLayout from "./components/MainLayout";
import AgendaForm from "./components/AgendaForm";
import Header from "./components/Header";

import TurnoAll from "./pages/TurnoAll";
import "./App.css";

// Motivo: ProtectedRoute leía `true` fijo (bypass). Ahora lee `token` real:
// sin token expulsa a /login, con token renderiza la vista.
function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);
  if (!token) return <Navigate to="/login" replace />;
  return children;
}

// Motivo: /login debe vivir fuera del layout y no mostrarse autenticado.
function PublicRoute({ children }) {
  const { token } = useContext(AuthContext);
  if (token) return <Navigate to="/inicio" replace />;
  return children;
}

// Motivo: "/" decide destino según auth en vez de forzar /inicio siempre.
function RootRedirect() {
  const { token } = useContext(AuthContext);
  return <Navigate to={token ? "/inicio" : "/login"} replace />;
}

function App() {
  return (
    <div className="app-shell">
      <UserProvider>
        <Routes>
          <Route path="/" element={<RootRedirect />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginForm />
              </PublicRoute>
            }
          />
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

            <Route
              path="/turnos/:id"
              element={
                <ProtectedRoute>
                  <Turnos />
                </ProtectedRoute>
              }
            />

            <Route
              path="/turno/todos"
              element={
                <ProtectedRoute>
                  <TurnoAll />
                </ProtectedRoute>
              }
            />
            <Route
              path="/crearAgenda"
              element={
                <ProtectedRoute>
                  <AgendaForm />
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
