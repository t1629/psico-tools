import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./index.css";
import App from "./App.jsx";
import Nav from "../src/components/Nav.jsx"; // Verifica que esta ruta sea correcta
import AuthProvider from "./context/authContext";
createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <HashRouter>
      <StrictMode>
        <Nav />
        <App />
      </StrictMode>
    </HashRouter>
  </AuthProvider>,
);
