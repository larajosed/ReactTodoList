import React, { useContext, useState, useEffect } from "react";
import { Form, Button, Modal, FormGroup, FormLabel } from "react-bootstrap";
import { TodoFormContext } from "../context/todoFormContext";
import todoService from "../services/todoService";
import "../css/TodoForm.css";
import { AppThemeContext } from "../context/appThemeContext";

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
  const { theme } = useContext(AppThemeContext);

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
      className={`todo-form-modal ${theme}`}
    >
      <Modal.Header closeButton>
        <Modal.Title className="title">
          {isEditing ? "Editar Tarea" : "Agregar Nueva Tarea"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="row">
          <Form.Group className="col-md-6">
            <Form.Label className="title">Nombre de la Tarea:</Form.Label>
            <Form.Control
              className="input-background"
              type="text"
              placeholder="Ingresa el nombre de la tarea"
              required
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
            />
          </Form.Group>
          <FormGroup>
            <FormLabel>Descripción:</FormLabel>
            <Form.Control
              className="input-background"
              type="text"
              placeholder="Ingresa la descripción de la tarea"
              required
            />
          </FormGroup>
          <Form.Group className="col-md-5">
            <Form.Label>Asignado a:</Form.Label>
            <Form.Control
              className="input-background"
              type="text"
              placeholder="Persona asignada"
              required
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
          </Form.Group>
          <FormGroup className="col-md-3">
            <FormLabel>Fecha limite:</FormLabel>
            <Form.Control
              type="date"
              placeholder="Fecha limite"
              required
              className="input-background"
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Nota:</FormLabel>
            <Form.Control
              type="text"
              placeholder="Inserta una nota"
              required
              className="input-background"
            />
          </FormGroup>
          <Form.Group className="col-md-6 title">
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
