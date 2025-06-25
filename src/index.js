import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { TodoFormContextProvider } from "./context/todoFormContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <TodoFormContextProvider>
      <App />
    </TodoFormContextProvider>
  </React.StrictMode>
);

reportWebVitals();
