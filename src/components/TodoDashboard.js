import TodoDashboardSimple from "./TodoDashboardSimple";
import React, { useState, useEffect } from "react";
import todoService from "../services/todoService";
import "../css/TodoDashboard.css";

function TodoDashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await todoService.getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        console.error("Error al cargar las tareas:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="dashboardContainer">
      <h3>Resumen del Dashboard</h3>
      <TodoDashboardSimple tasks={tasks} />
    </div>
  );
}

export default TodoDashboard;
