import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = createContext();

const decodeToken = (token) => {
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    if (payload.exp * 1000 < Date.now()) {
      return null;
    }
    return token;
  } catch {
    return null;
  }
};

const AuthProvider = ({ children }) => {
  // Motivo: si en localStorage quedó guardado el texto "null"/"undefined"
  // (p. ej. un login que no devolvió token), se trataría como sesión válida
  // y la app saltaría directo a /inicio. Se normaliza a null (= sin sesión).
  const storedToken = localStorage.getItem("token");
  const initialToken =
    storedToken && storedToken !== "null" && storedToken !== "undefined"
      ? decodeToken(storedToken)
      : null;
  const [token, setToken] = useState(initialToken);
  const navigate = useNavigate();
  const loginPage = (newToken) => {
    // Motivo: no persistir tokens vacíos que crearían una sesión fantasma.
    if (!newToken) return;
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  };
  return (
    <Login.Provider
      value={{
        token,
        loginPage,
        logout,
      }}
    >
      {children}
    </Login.Provider>
  );
};

export default AuthProvider;
