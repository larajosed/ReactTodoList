import React, { useState, useContext } from "react";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { Button, Row, Col } from "react-bootstrap";
import { TodoFormContext } from "./context/todoFormContext";
import "./App.css";

function App() {
  const { setShowModal } = useContext(TodoFormContext);

  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Lista de Tareas</h1>
      <div className="my-5">
        <Row className="mb-3">
          <Col className="add-task-button-container">
            <div className="buttonsContainer">
              <Button variant="primary" onClick={handleShow}>
                Agregar Tarea
              </Button>
            </div>
          </Col>
        </Row>
        <TodoForm />
        <TodoList />
      </div>
      <div className="footer">
        Powered By{" "}
        <a href="https://larajosed.github.io/#/" target="blank">
          José Daniel Lara Meza{" "}
          <img
            src="https://raw.githubusercontent.com/larajosed/larajosed.github.io/refs/heads/main/src/assets/images/JL.png"
            alt="JL"
          ></img>
        </a>
      </div>
    </div>
  );
}

export default App;
