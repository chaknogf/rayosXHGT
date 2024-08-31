import React, { useState, useEffect } from "react";
import "@/components/toggleSwitch/toggleSwitch.css"
import '@/style.css';



const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // Inicializar el tema según el valor guardado en el localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.setAttribute("data-bs-theme", savedTheme);
    }
  }, []);

  const handleToggle = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.setAttribute("data-bs-theme", newTheme);
    localStorage.setItem("theme", newTheme); // Guarda el tema en localStorage
  };
    

  return (
    <div>

     
      <label className="switch">
        <input
          type="checkbox"
          id="checkboxInput"
          checked={isDarkMode}
          onChange={handleToggle}
          style={{ display: 'none' }} // Oculta el input
        />
        <span className="slider"></span>

      </label>
      
    </div>
  );
};

export default ThemeToggle;
