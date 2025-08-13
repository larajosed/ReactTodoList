import { useContext } from "react";
import { AppThemeContext } from "./context/appThemeContext";
import "./App.css";
import TodoListView from "./views/TodoListView";
import TodoDarkLightModeButton from "./components/TodoDarkLightModeButton";

function App() {
  const { theme, toggleTheme } = useContext(AppThemeContext);

  return (
    <div className={`body ${theme}`}>
      <div className={`app-container ${theme}`}>
        <div className={`App ${theme}`}>
          <TodoDarkLightModeButton />
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
