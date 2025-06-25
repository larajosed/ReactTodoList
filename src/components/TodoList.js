import React, { useState, useEffect, useContext } from "react";
import todoService from "../services/todoService";
import TodoItem from "./TodoItem";
import { Form, ListGroup } from "react-bootstrap";
import { TodoFormContext } from "../context/todoFormContext";
import "../css/TodoList.css";

function TodoList({ searchBarClassName }) {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { refreshTasks, setRefreshTasks } = useContext(TodoFormContext);

  useEffect(() => {
    try {
      todoService.getTasks().then((data) => {
        if (searchTerm) {
          data = data.filter(
            (task) =>
              (task.texto &&
                task.texto.toLowerCase().includes(searchTerm.toLowerCase())) ||
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

  return (
    <>
      <div>
        <Form.Group className={searchBarClassName}>
          <Form.Control
            type="text"
            placeholder="Buscar tarea por nombre o persona..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Form.Group>

        {tasks.length === 0 ? (
          <p>No hay tareas para mostrar.</p>
        ) : (
          <div className="todo-list-container">
            {tasks.map((task) => (
              <TodoItem
                key={task.id}
                task={task}
                refresh={tooggleRefreshTasks}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default TodoList;
