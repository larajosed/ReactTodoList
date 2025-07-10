import React, { useContext, useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { TodoFormContext } from "../context/todoFormContext";
import todoService from "../services/todoService";
import "../css/TodoForm.css";

function TodoForm() {
  const {
    showModal,
    setShowModal,
    setRefreshTasks,
    refreshTasks,
    taskToEdit,
    setTaskToEdit,
  } = useContext(TodoFormContext);
  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [completed, setCompleted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.text || "");
      setAssignedTo(taskToEdit.assignedTo || "");
      setCompleted(taskToEdit.completed || false);
      setIsEditing(true);
    } else {
      resetTaskFields();
      setIsEditing(false);
    }
  }, [taskToEdit]);

  const addTask = () => {
    let taskData = {
      text: taskName,
      completed: completed,
      assignedTo: assignedTo,
    };
    if (isEditing && taskToEdit.id) {
      taskData = { ...taskData, id: taskToEdit.id };
    }

    todoService.addTask(taskData).then(() => {
      setShowModal(false);
      setRefreshTasks(!refreshTasks);
      resetTaskFields();
      setTaskToEdit(null);
    });
  };

  const resetTaskFields = () => {
    setTaskName("");
    setAssignedTo("");
    setCompleted(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Modal
      show={showModal}
      onHide={handleCloseModal}
      size="xl"
      className="todo-form-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {isEditing ? "Editar Tarea" : "Agregar Nueva Tarea"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="row">
          <Form.Group className="col-md-6">
            <Form.Label>Nombre de la Tarea:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el nombre de la tarea"
              required
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Label>Asignado a:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Persona asignada"
              required
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="col-md-6">
            <Form.Check
              type="checkbox"
              label="Tarea finalizada"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
            />
          </Form.Group>
          <div className="col-md-6">
            <Button
              className="btn btn-primary"
              onClick={() => {
                addTask();
              }}
            >
              {isEditing ? "Guardar Cambios" : "Guardar Tarea"}
            </Button>
            <Button className="btn btn-secondary" onClick={handleCloseModal}>
              Cancelar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TodoForm;
