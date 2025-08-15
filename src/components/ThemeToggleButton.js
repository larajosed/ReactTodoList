import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";
import { useContext } from "react";
import { AppThemeContext } from "../context/appThemeContext";
import "../css/ThemeToggleButton.css";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(AppThemeContext);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
    </Tooltip>
  );

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <div className="buttonsContainer float-end">
        {theme === "light" ? (
          <FaMoon className="mode" onClick={toggleTheme} />
        ) : (
          <MdOutlineWbSunny className="mode" onClick={toggleTheme} />
        )}
      </div>
    </OverlayTrigger>
  );
}

export default ThemeToggleButton;
