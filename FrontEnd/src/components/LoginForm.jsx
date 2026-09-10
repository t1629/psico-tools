import { useState } from "react";
import { Login } from "../services/authService";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Faltan datos");
    }

    try {
      const data = await Login(email, password);

      // Aquí puedes guardar el token en localStorage o context
      localStorage.setItem("token", data.token);

      // Redirigir o actualizar estado
      console.log("Login exitoso", data);
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
    </>
  );
};

export default LoginPage;
