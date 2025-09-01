import TodoDashboardSimple from "./TodoDashboardSimple";
import TodoDashboardProductivity from "./TodoDashboardProductivity";
import TodoDashboardStatus from "./TodoDashboardStatus";
import { useState, useEffect } from "react";
import todoService from "../services/todoService";
import { Nav } from "react-bootstrap";
import "../css/TodoDashboard.css";

function TodoDashboard() {
  const [tasks, setTasks] = useState([]);
  const [activeView, setActiveView] = useState("simple");

  useEffect(() => {
    todoService
      .getTasks()
      .then((fetchedTasks) => {
        setTasks(fetchedTasks);
      })
      .catch((error) => {
        console.error("Error al cargar las tareas:", error);
      });
  }, []);

  return (
    <div className="dashboardContainer">
      <Nav
        variant="tabs"
        activeKey={activeView}
        onSelect={(selectedKey) => setActiveView(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="simple">Progreso General</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="productivity">Productividad Semanal</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="status">Estados de Tareas</Nav.Link>
        </Nav.Item>
      </Nav>
      <div className="dashboardContent">
        {activeView === "simple" ? (
          <TodoDashboardSimple tasks={tasks} />
        ) : activeView === "productivity" ? (
          <TodoDashboardProductivity tasks={tasks} />
        ) : activeView === "status" ? (
          <TodoDashboardStatus tasks={tasks} />
        ) : null}
      </div>
    </div>
  );
}

export default TodoDashboard;
