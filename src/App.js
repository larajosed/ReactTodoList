import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { AppThemeContext } from "./context/appThemeContext";
import "./App.css";
import TodoListView from "./views/TodoListView";
import TodoFooter from "./components/footer/TodoFooter";
import TodoDashboard from "./components/TodoDashboard";
import TodoNavbar from "./components/TodoNavbar";

function App() {
  const { theme } = useContext(AppThemeContext);

  return (
    <BrowserRouter>
      <div className={`body ${theme}`}>
        <TodoNavbar />
        <div className={`app-container ${theme}`}>
          <div className={`App ${theme}`}>
            <Routes>
              <Route path="/" element={<TodoListView />} />
              <Route path="/dashboard" element={<TodoDashboard />} />
            </Routes>
          </div>
        </div>
        <TodoFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
