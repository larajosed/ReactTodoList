import Offcanvas from "react-bootstrap/Offcanvas";
import { useContext } from "react";
import { TodoSidebarContext } from "../context/todoSidebarContext";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { AppThemeContext } from "../context/appThemeContext";
import "../css/SidebarTask.css";
import {
  BsArrowUpCircleFill,
  BsDashCircleFill,
  BsArrowDownCircleFill,
} from "react-icons/bs";
import { FaCheckCircle, FaRegListAlt, FaRegClock } from "react-icons/fa";
import { MdOutlineAssignmentInd, MdLowPriority } from "react-icons/md";
import { LuNotebookPen } from "react-icons/lu";
import moment from "moment";

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

  const formattedDueDate = selectedTask.dueDate
    ? moment(selectedTask.dueDate).format("DD/MM/YYYY")
    : "No establecida";

  const dueDate = selectedTask.dueDate ? moment(selectedTask.dueDate) : null;
  const creationDate = selectedTask.creationDate
    ? moment(selectedTask.creationDate)
    : moment();
  const daysRemaining =
    dueDate && creationDate
      ? dueDate.diff(creationDate, "days")
      : "No disponible";

  const daysDifference = moment(selectedTask.dueDate).diff(moment(), "days");

  const statusTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Estado: {selectedTask.status || "No disponible"}
    </Tooltip>
  );

  const priorityTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Prioridad : {selectedTask.priority || "No disponible"}
    </Tooltip>
  );

  const assignedTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Asignado a : {selectedTask.assignedTo || "No disponible"}
    </Tooltip>
  );

  const dueDateTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Fecha de finalización: {formattedDueDate || "No disponible"}
    </Tooltip>
  );

  const getTaskStatusIcon = (status) => {
    switch (status) {
      case "To Do":
        return <FaRegListAlt style={{ color: "gray" }} />;
      case "Doing":
        return <FaRegClock style={{ color: "#007bff" }} />;
      case "Done":
        return <FaCheckCircle style={{ color: "green" }} />;
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
          <h5>
            {selectedTask.taskName}{" "}
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={statusTooltip}
            >
              <span>{getTaskStatusIcon(selectedTask.status)}</span>
            </OverlayTrigger>
          </h5>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={dueDateTooltip}
          >
            <p className="textDayLimit">
              {daysDifference > 0 ? (
                `Quedan ${daysDifference} días para la Finalización`
              ) : daysDifference < 0 ? (
                <span className="taskDelay">
                  La tarea esta retrasada por {Math.abs(daysDifference)} días.
                </span>
              ) : (
                `La fecha límite es hoy.`
              )}
            </p>
          </OverlayTrigger>
          <div className="container-icons">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={assignedTooltip}
            >
              <div className="icons">
                <MdOutlineAssignmentInd />
                {selectedTask.assignedTo}
              </div>
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={priorityTooltip}
            >
              <span>Prioridad {getPriorityIcon(selectedTask.priority)}</span>
            </OverlayTrigger>
          </div>

          <div className="descriptionBox">
            <pre className="textBox">
              {selectedTask.description || "Esta tarea no tiene descripción."}
            </pre>
          </div>
          <div>
            <LuNotebookPen />
            <strong>Nota:</strong>
            <pre style={{ fontFamily: "system-ui" }}>
              {" "}
              {selectedTask.note || "Esta tarea no tiene notas."}
            </pre>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default TodoSidebar;
