import { useContext } from "react";
import { AppThemeContext } from "./context/appThemeContext";
import "./App.css";
import TodoListView from "./views/TodoListView";
import TodoDarkLightModeButton from "./components/TodoDarkLightModeButton";
import TodoFooter from "./components/footer/TodoFooter";

function App() {
  const { theme, toggleTheme } = useContext(AppThemeContext);

  return (
    <div className={`body ${theme}`}>
      <div className={`app-container ${theme}`}>
        <div className={`App ${theme}`}>
          <TodoDarkLightModeButton />
          <TodoListView />
          <TodoFooter />
        </div>
      </div>
    </div>
  );
}

export default App;
