// DarkModeToggle.js
import React, { useContext } from "react";
import "../Assets/CSS/DarkModeToggle.css";
import Moon from "@iconscout/react-unicons/icons/uil-moon";
import Sun from "@iconscout/react-unicons/icons/uil-sun";
import { themeContext } from "../Context";

const DarkModeToggle = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  
  const handleClick = () => {
    theme.dispatch({ type: "toggle" });
  };
  
  return (
    <div className="toggle-container">
      <div className={`toggle ${darkMode ? "dark" : ""}`} onClick={handleClick}>
        <Moon />
        <Sun />
        <div className="t-button"></div>
      </div>
    </div>
  );
};

export default DarkModeToggle;
