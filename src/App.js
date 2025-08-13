import { useContext } from "react";
import { AppThemeContext } from "./context/appThemeContext";
import { MdOutlineWbSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa6";
import "./App.css";
import TodoListView from "./views/TodoListView";

function App() {
  const { theme, toggleTheme } = useContext(AppThemeContext);

  return (
    <div className={`body ${theme}`}>
      <div className={`app-container ${theme}`}>
        <div className={`App ${theme}`}>
          <div className="buttonsContainer">
            {" "}
            {theme === "light" ? (
              <FaMoon onClick={toggleTheme} />
            ) : (
              <MdOutlineWbSunny onClick={toggleTheme} />
            )}
          </div>
          <TodoListView />
          <div className="footer">
            Powered By{" "}
            <a href="https://larajosed.github.io/#/" target="blank">
              José Daniel Lara Meza{" "}
              <img
                src="https://raw.githubusercontent.com/larajosed/larajosed.github.io/refs/heads/main/src/assets/images/JL.png"
                alt="JL"
              ></img>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
