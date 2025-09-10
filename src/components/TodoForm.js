import { useContext, useState, useEffect } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { TodoFormContext } from "../context/todoFormContext";
import todoService from "../services/todoService";
import "../css/TodoForm.css";
import { AppThemeContext } from "../context/appThemeContext";
import Task from "../model/taskModel";

function TodoForm() {
  const {
    showModal,
    setShowModal,
    setRefreshTasks,
    refreshTasks,
    taskToEdit,
    setTaskToEdit,
  } = useContext(TodoFormContext);
  const { theme } = useContext(AppThemeContext);
  const [taskName, setTaskName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");
  const [note, setNote] = useState("");
  const [creationDate, setCreationDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [status, setStatus] = useState("To Do");

  useEffect(() => {
    if (taskToEdit) {
      setTaskName(taskToEdit.taskName || "");
      setAssignedTo(taskToEdit.assignedTo || "");
      setPriority(taskToEdit.priority || "");
      setDescription(taskToEdit.description || "");
      setNote(taskToEdit.note || "");
      setCreationDate(
        taskToEdit.creationDate
          ? new Date(taskToEdit.creationDate).toISOString().slice(0, 10)
          : ""
      );
      setDueDate(
        taskToEdit.dueDate
          ? new Date(taskToEdit.dueDate).toISOString().slice(0, 10)
          : ""
      );
      setCompletionDate(
        taskToEdit.completionDate
          ? new Date(taskToEdit.completionDate).toISOString().slice(0, 10)
          : ""
      );
      setStatus(taskToEdit.status || "To Do");
      setIsEditing(true);
    } else {
      resetTaskFields();
      setIsEditing(false);
    }
  }, [taskToEdit]);

  const addTask = () => {
    const isCompleted = status === "Done";
    let taskData = new Task(
      null,
      taskName,
      assignedTo,
      priority,
      description,
      note,
      null,
      null,
      isCompleted ? new Date().toISOString() : null,
      status
    );

    if (!isEditing) {
      taskData.creationDate = new Date().toISOString();
    }
    if (isEditing && taskToEdit.id) {
      taskData.id = taskToEdit.id;
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
    setPriority("");
    setDescription("");
    setNote("");
    setCreationDate("");
    setDueDate("");
    setCompletionDate("");
    setStatus("To Do");
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
          <Form.Group className="col-md-6 mb-3">
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

          <Form.Group className="col-md-6 mb-3">
            <Form.Label className="title">Asignado a:</Form.Label>
            <Form.Control
              className="input-background"
              type="text"
              placeholder="Persona asignada"
              required
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="col-md-12 mb-3">
            <Form.Label className="title">Descripción:</Form.Label>
            <Form.Control
              className="input-background"
              as="textarea"
              rows={3}
              placeholder="Ingresa la descripción de la tarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label className="title">Fecha límite:</Form.Label>
            <Form.Control
              type="date"
              className="input-background"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="col-md-6 mb-3">
            <Form.Label className="title">Prioridad:</Form.Label>
            <Form.Control
              as="select"
              className="input-background"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="">Selecciona una prioridad</option>
              <option value="Baja">Baja</option>
              <option value="Media">Media</option>
              <option value="Alta">Alta</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="col-md-12 mb-3">
            <Form.Label className="title">Nota:</Form.Label>
            <Form.Control
              className="input-background"
              as="textarea"
              rows={3}
              placeholder="Inserta una nota"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </Form.Group>
          {isEditing && (
            <>
              <Form.Group className="col-md-4 mb-3">
                <Form.Label className="title">Fecha de Creación:</Form.Label>
                <Form.Control
                  type="date"
                  className="input-background"
                  value={creationDate}
                  readOnly
                />
              </Form.Group>
              <Form.Group className="col-md-4 mb-3">
                <Form.Label className="title">
                  Fecha de Finalización:
                </Form.Label>
                <Form.Control
                  type="date"
                  className="input-background"
                  value={completionDate}
                  readOnly
                />
              </Form.Group>
            </>
          )}

          <Form.Group className="col-md-3 mb-3">
            <Form.Label className="title">Estado:</Form.Label>
            <Form.Control
              as="select"
              className="input-background"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Selecciona un estado</option>
              <option value="To Do">To Do</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </Form.Control>
          </Form.Group>

          <div className="col-12 text-end">
            <Button className="btn btn-primary" onClick={addTask}>
              {isEditing ? "Guardar Cambios" : "Guardar Tarea"}
            </Button>
            <Button
              className="btn btn-secondary ms-2"
              onClick={handleCloseModal}
            >
              Cancelar
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default TodoForm;
