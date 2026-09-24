import { Navigate, Route, Routes } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import Inicio from "./pages/Inicio";
import Turnos from "./pages/Turnos";
import Paciente from "./pages/Paciente";
import Nav from "./components/Nav";
import { UserProvider } from "./hooks/UseProvider";
import Header from "./components/Header";
import "./App.css";

function ProtectedRoute({ children }) {
  return localStorage.getItem("token") ? (
    children
  ) : (
    <Navigate to="/login" replace />
  );
}

function App() {
  return (
    <div className="app-shell">
      <UserProvider>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />

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

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
