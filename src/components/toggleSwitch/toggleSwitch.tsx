import React, { useState, useEffect } from "react";
import "@/components/toggleSwitch/toggleSwitch.css";
import '@/style.css';

const ThemeToggle: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Inicializar el tema según el valor guardado en localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.setAttribute("data-bs-theme", "dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.setAttribute("data-bs-theme", "light");
    }
  }, []);

  const handleToggle = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Guarda el tema en localStorage
  };

  return (
    <div className="toggle-switch">
      <label className="switch-label">
        <input
          className="checkbox"
          type="checkbox"
          checked={isDarkMode}
          onChange={handleToggle}
          aria-label="Toggle Dark Mode"
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};

export default ThemeToggle;
