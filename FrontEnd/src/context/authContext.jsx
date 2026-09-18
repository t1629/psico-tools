import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = createContext();

const AuthProvider = ({ children }) => {
  const resultToken = localStorage.getItem("token");
  const [token, setToken] = useState(resultToken);
  const navigate = useNavigate();
  const loginPage = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
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
