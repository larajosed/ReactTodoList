import React, { useState, useEffect, useContext } from "react";
import todoService from "../services/todoService";
import TodoItem from "./TodoItem";
import { Form } from "react-bootstrap";
import { TodoFormContext } from "../context/todoFormContext";
import "../css/TodoList.css";

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { refreshTasks, setRefreshTasks } = useContext(TodoFormContext);

  useEffect(() => {
    try {
      todoService.getTasks().then((data) => {
        if (searchTerm) {
          data = data.filter(
            (task) =>
              (task.taskName &&
                task.taskName
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())) ||
              (task.assignedTo &&
                task.assignedTo
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()))
          );
        }
        setTasks(data);
      });
    } catch (err) {
      console.error("Error:", err);
    }
  }, [refreshTasks, searchTerm]);

  function tooggleRefreshTasks() {
    setRefreshTasks(!refreshTasks);
  }

  console.log("rerendeing full component");
  const completedTask = tasks.filter((task) => task.completed);
  const incompletedTask = tasks.filter((task) => !task.completed);

  return (
    <div>
      <Form.Group className="col-md-3 search">
        <Form.Control
          className="input-background"
          type="text"
          placeholder="Buscar tarea por nombre o persona..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Form.Group>

      {tasks.length === 0 && <p>No hay tareas para mostrar.</p>}
      {incompletedTask.length > 0 && (
        <>
          <h3 className="title"> Tareas Pendientes</h3>
          <div className="todo-list-container">
            {incompletedTask.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                refresh={tooggleRefreshTasks}
              />
            ))}
          </div>
        </>
      )}
      {completedTask.length > 0 && (
        <>
          {" "}
          <h3 className="title"> Tareas Completadas</h3>
          <div className="todo-list-container">
            {completedTask.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                refresh={tooggleRefreshTasks}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default TodoList;
