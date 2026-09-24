import { useState, useEffect } from "react";
import { getById } from "../services/UsuarioService";
import { UserContext } from "../context/UserContext";

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      getById(userId).then(setUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
