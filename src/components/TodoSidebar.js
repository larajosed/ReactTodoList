import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useContext } from "react";
import { TodoSidebarContext } from "../context/todoSidebarContext";
import { AppThemeContext } from "../context/appThemeContext";
import "../css/SidebarTask.css";
import { FaCheck } from "react-icons/fa6";
import { ImBlocked } from "react-icons/im";
import {
  BsArrowUpCircleFill,
  BsDashCircleFill,
  BsArrowDownCircleFill,
} from "react-icons/bs";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

function TodoSidebar() {
  const { showSideBar, setShowSideBar, selectedTask } =
    useContext(TodoSidebarContext);
  const handleClose = () => setShowSideBar(false);
  const { theme } = useContext(AppThemeContext);
  if (!selectedTask) {
    return null;
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "Alta":
        return <BsArrowUpCircleFill style={{ color: "red" }} />;
      case "Media":
        return <BsDashCircleFill style={{ color: "orange" }} />;
      case "Baja":
        return <BsArrowDownCircleFill style={{ color: "green" }} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Offcanvas
        show={showSideBar}
        onHide={handleClose}
        placement="end"
        className={`offcanvas-container ${theme}`}
      >
        <Offcanvas.Header closeButton className={theme}>
          <Offcanvas.Title>Detalles de la Tarea</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className={theme}>
          <p>
            <strong>Tarea:</strong> {selectedTask.taskName}
          </p>
          <p>
            <strong>Descripción:</strong> <pre>{selectedTask.description}</pre>
          </p>
          <p>
            <strong>Asignado a:</strong> {selectedTask.assignedTo}
          </p>
          <p>
            <strong>Prioridad:</strong> {getPriorityIcon(selectedTask.priority)}
          </p>
          <p>
            <strong>Completada:</strong>
            {selectedTask.completed ? (
              <FaCheckCircle style={{ color: "green", marginLeft: "5px" }} />
            ) : (
              <FaTimesCircle style={{ color: "red", marginLeft: "5px" }} />
            )}
          </p>
          <p>
            <strong>Fecha Límite:</strong> {selectedTask.dueDate}
          </p>
          <p>
            <strong>Nota:</strong> {selectedTask.note}
          </p>
          <p>
            <strong>Fecha de Creación:</strong> {selectedTask.creationDate}
          </p>
          <p>
            <strong>Fecha de Finalización:</strong>{" "}
            {selectedTask.completionDate}
          </p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default TodoSidebar;
