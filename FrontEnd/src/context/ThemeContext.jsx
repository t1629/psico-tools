import { tr } from "date-fns/locale";
import { Children } from "react";
import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const savedTheme = localStorage.getItem("app-theme");
    return savedTheme !== null
      ? savedTheme
      : window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
  });

  function toggleTheme() {
    currentTheme === "light"
      ? setCurrentTheme("dark")
      : setCurrentTheme("light");
  }

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", currentTheme);
    localStorage.setItem("app-theme", currentTheme);
  }, [currentTheme]);

  return (
    <>
      <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
};
