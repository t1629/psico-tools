import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import Nav from "../src/components/Nav.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <HashRouter>
    <StrictMode>
      <Nav />
      <App />
    </StrictMode>
  </HashRouter>,
);
