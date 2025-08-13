import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";
import { useContext } from "react";
import { AppThemeContext } from "../context/appThemeContext";

function TodoDarkLightModeButton() {
  const { theme, toggleTheme } = useContext(AppThemeContext);

  return (
    <div className="buttonsContainer">
      {" "}
      {theme === "light" ? (
        <FaMoon onClick={toggleTheme} />
      ) : (
        <MdOutlineWbSunny onClick={toggleTheme} />
      )}
    </div>
  );
}

export default TodoDarkLightModeButton;
