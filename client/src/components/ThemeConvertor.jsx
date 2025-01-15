import React, { useState, useEffect } from "react";
import { IoSunnySharp, IoMoonSharp } from "react-icons/io5";

const ThemeConverter = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("selectedTheme");
    if (theme === "dark") {
      setDarkMode();
    } else {
      setLightMode();
    }
  }, []);

  const setDarkMode = () => {
    document.querySelector("body").setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
    setIsDarkMode(true);
  };

  const setLightMode = () => {
    document.querySelector("body").setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
    setIsDarkMode(false);
  };

  return (
    <div className="z-50">
      {isDarkMode ? (
        <IoSunnySharp size={24} className="text-white" onClick={setLightMode} />
      ) : (
        <IoMoonSharp size={24} className="text-black" onClick={setDarkMode} />
      )}
    </div>
  );
};

export default ThemeConverter;
