import { useState, useContext } from "react";
import { Login } from "../services/authService";
import "../styles/UI/LoginForm.css";
import { useNavigate } from "react-router-dom";
import { Login as AuthContext } from "../context/authContext";

const LoginPage = () => {
  const { loginPage } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("Faltan datos");
    }

    try {
      const data = await Login(email, password);

      // Aquí puedes guardar el token en localStorage o context
      loginPage(data.token);

      // Redirigir o actualizar estado
      console.log("Login exitoso", data);
      navigate("/inicio");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleLogin} className="login-card">
        <h2 className="title">Iniciar sesion</h2>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
