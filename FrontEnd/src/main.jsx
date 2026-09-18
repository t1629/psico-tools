import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";
import Nav from "./components/Nav.jsx";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import AuthProvider from "./context/authContext";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <AuthProvider>
      <StrictMode>
        <Nav />
        <App />
      </StrictMode>
    </AuthProvider>
  </HashRouter>,
);
