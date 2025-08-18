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
  BsCalendarDate,
  BsCalendar2Date,
  BsCalendar2DateFill,
} from "react-icons/bs";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaRegListAlt,
  FaRegClock,
} from "react-icons/fa";
import {
  MdOutlineDescription,
  MdOutlineAssignmentInd,
  MdLowPriority,
} from "react-icons/md";
import { GrCompliance } from "react-icons/gr";
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
  const formattedCreationDate = selectedTask.creationDate
    ? moment(selectedTask.creationDate).format("DD/MM/YYYY")
    : "No establecida";
  const formattedCompletionDate = selectedTask.completionDate
    ? moment(selectedTask.completionDate).format("DD/MM/YYYY")
    : "No establecida";

  const statusTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Estado: {selectedTask.status || "No disponible"}
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
          <h5>{selectedTask.taskName}</h5>

          <div className="container-icons">
            <OverlayTrigger
              placement="bottom"
              delay={{ show: 250, hide: 400 }}
              overlay={statusTooltip}
            >
              <p>
                <strong>Estado:</strong>{" "}
                {getTaskStatusIcon(selectedTask.status)}
              </p>
            </OverlayTrigger>
            <div>
              {" "}
              <MdOutlineAssignmentInd />
              {selectedTask.assignedTo}
            </div>
            <div>
              {" "}
              <MdLowPriority /> {getPriorityIcon(selectedTask.priority)}
            </div>
          </div>

          <p>
            <strong>
              <pre style={{ fontFamily: "system-ui" }}>
                {selectedTask.description}
              </pre>
            </strong>
          </p>

          <p>
            <BsCalendarDate />
            <strong>Fecha Límite:</strong> {formattedDueDate}
          </p>
          <p>
            <LuNotebookPen />
            <strong>Nota:</strong>
            <pre style={{ fontFamily: "system-ui" }}> {selectedTask.note}</pre>
          </p>
          <p>
            <BsCalendar2Date />
            <strong>Fecha de Creación:</strong> {formattedCreationDate}
          </p>
          <p>
            <BsCalendar2DateFill />
            <strong>Fecha de Finalización:</strong> {formattedCompletionDate}
          </p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default TodoSidebar;
