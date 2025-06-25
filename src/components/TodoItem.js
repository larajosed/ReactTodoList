import { Button, Modal } from "react-bootstrap";
import React, { useState, useContext } from "react";
import todoService from "../services/todoService";
import { TodoFormContext } from "../context/todoFormContext";
import "../css/TodoItem.css";

function TodoItem({ refresh, task }) {
  const [show, setShow] = useState(false);
  const { setTaskToEdit, setShowModal } = useContext(TodoFormContext);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const deleteTask = () => {
    todoService.deleteTask(task.id).then(refresh());
    setShow(false);
  };

  const updateTask = () => {
    setShowModal(true);
    setTaskToEdit(task);
  };

  const taskCardClass = `todoItemCard ${
    task.completada ? "completedTask" : "incompleteTask"
  }`;

  return (
    <>
      <div className={taskCardClass}>
        <div>
          <div className="taskInfo">
            <strong>ID:</strong> {task.id}
          </div>
          <div>
            <strong>Tarea:</strong> {task.texto}
          </div>
          <div>
            <strong>Completada:</strong> {task.completada ? "Sí" : "No"}
          </div>
          <div>
            <strong>Asignada a:</strong> {task.assignedTo}
          </div>
        </div>
        <div className="buttonsContainer">
          <Button
            variant="danger"
            onClick={() => {
              handleShow();
            }}
          >
            Eliminar
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              updateTask();
            }}
          >
            Editar
          </Button>
        </div>
        <Modal
          centered
          show={show}
          onHide={handleClose}
          className="modalConfirm"
        >
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              <h3>¿Desea eliminar esta tarea?</h3>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleClose();
              }}
            >
              No
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                deleteTask();
              }}
            >
              Si
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default TodoItem;
