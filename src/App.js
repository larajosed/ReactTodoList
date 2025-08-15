import { useContext } from "react";
import { AppThemeContext } from "./context/appThemeContext";
import "./App.css";
import TodoListView from "./views/TodoListView";
import ThemeToggleButton from "./components/ThemeToggleButton";
import TodoFooter from "./components/footer/TodoFooter";

function App() {
  const { theme } = useContext(AppThemeContext);

  return (
    <div className={`body ${theme}`}>
      <div className={`app-container ${theme}`}>
        <div className={`App ${theme}`}>
          <ThemeToggleButton />
          <TodoListView />
          <TodoFooter />
        </div>
      </div>
    </div>
  );
}

export default App;
