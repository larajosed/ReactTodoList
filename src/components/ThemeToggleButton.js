import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";
import { useContext } from "react";
import { AppThemeContext } from "../context/appThemeContext";
import "../css/ThemeToggleButton.css";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(AppThemeContext);

  return (
    <div className="buttonsContainer">
      {theme === "light" ? (
        <FaMoon className="mode" onClick={toggleTheme} />
      ) : (
        <MdOutlineWbSunny className="mode" onClick={toggleTheme} />
      )}
    </div>
  );
}

export default ThemeToggleButton;
