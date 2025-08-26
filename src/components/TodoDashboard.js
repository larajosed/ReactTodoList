import TodoDashboardSimple from "./TodoDashboardSimple";
import TodoDashboardProductivity from "./TodoDashboardProductivity";
import TodoDashboardStatus from "./TodoDashboardStatus";
import { useState, useEffect } from "react";
import todoService from "../services/todoService";
import { Nav } from "react-bootstrap";
import "../css/TodoDashboard.css";

function TodoDashboard() {
  const [tasks, setTasks] = useState([]);
  const [activeView, setActiveView] = useState(null);

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
      <h3>Resumen del Dashboard</h3>
      <Nav
        variant="tabs"
        activeKey={activeView}
        onSelect={(selectedKey) => setActiveView(selectedKey)}
      >
        <Nav.Item>
          <Nav.Link eventKey="simple">Progreso</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="productivity">Productividad Semanal</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="status">Estados de Tareas</Nav.Link>
        </Nav.Item>
      </Nav>
      {activeView === "simple" ? (
        <TodoDashboardSimple tasks={tasks} />
      ) : activeView === "productivity" ? (
        <TodoDashboardProductivity tasks={tasks} />
      ) : activeView === "status" ? ( // 👈 Nueva condición
        <TodoDashboardStatus tasks={tasks} />
      ) : null}
    </div>
  );
}

export default TodoDashboard;
