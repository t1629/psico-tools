import { useState } from "react";
import { Login } from "../services/authService";
import "../styles/UI/LoginForm.css";
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
        {/* <a href="" className="forgot-password">
          ¿Olvidaste tu contraseña?
        </a>
        <div className="social-section">
          <div className="separator">
            <span>or</span>
          </div>

          <button type="button" className="social-btn">
            Iniciar sesión con Google
          </button>

          <button type="button" className="social-btn">
            Iniciar sesión con Facebook
          </button>

          <p className="signup-text">
            ¿No tienes una cuenta? <a href="#">Crear cuenta</a>
          </p>
        </div> */}
      </form>
    </div>
  );
};

export default LoginPage;
