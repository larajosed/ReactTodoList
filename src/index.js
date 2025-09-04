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
const MODEL_VERSION_KEY = "myTodoAppVersion";
const CURRENT_MODEL_VERSION = 1;
const installedVersion = localStorage.getItem(MODEL_VERSION_KEY);
const existingData = localStorage.getItem(LOCAL_STORAGE_KEY) !== null;

if (!existingData || installedVersion !== CURRENT_MODEL_VERSION.toString()) {
  todoService.initMockTasks();
  localStorage.setItem(MODEL_VERSION_KEY, CURRENT_MODEL_VERSION);
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
