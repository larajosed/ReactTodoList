import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import todoService from "./services/todoService";
import { ThemeContextProvider } from "./context/appThemeContext";

const LOCAL_STORAGE_KEY = "myTodoAppTasks";
const initTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
if (!initTasks) {
  todoService.initMockTasks();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <App />
    </ThemeContextProvider>
  </React.StrictMode>
);

reportWebVitals();
