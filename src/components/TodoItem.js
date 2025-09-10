import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import React, { useState, useContext } from "react";
import todoService from "../services/todoService";
import { TodoFormContext } from "../context/todoFormContext";
import { TodoSidebarContext } from "../context/todoSidebarContext";
import "../css/TodoItem.css";
import { BsPencil } from "react-icons/bs";
import { RiDeleteBin2Line } from "react-icons/ri";
import { IoEyeOutline } from "react-icons/io5";

function TodoItem({ refresh, task }) {
  const [show, setShow] = useState(false);
  const { setTaskToEdit, setShowModal } = useContext(TodoFormContext);
  const { setShowSideBar, setSelectedTask } = useContext(TodoSidebarContext);

  const handleClose = () => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const showSidebar = () => {
    setShowSideBar(true);
    setSelectedTask(task);
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
    task.isCompleted() ? "completedTask" : "incompleteTask"
  }`;

  const moreInfo = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Ver mas información
    </Tooltip>
  );

  const deleteTasks = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Eliminar tarea
    </Tooltip>
  );

  const editTask = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Editar tarea
    </Tooltip>
  );

  return (
    <>
      <div className={taskCardClass}>
        <div>
          <div className="taskInfo">
            ID:
            {task.id}
          </div>
          <div>
            <strong>Tarea: </strong>
            {task.taskName}
          </div>
          <div>
            <strong>Completado: </strong>
            {task.isCompleted() ? "Sí" : "No"}
          </div>
          <div>
            <strong>Asignada a: </strong>
            {task.assignedTo}
          </div>
        </div>

        <div className="buttonsContainer">
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={moreInfo}
          >
            <Button variant="success" onClick={showSidebar}>
              <IoEyeOutline />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={deleteTasks}
          >
            <Button
              variant="danger"
              onClick={() => {
                handleShow();
              }}
            >
              <RiDeleteBin2Line />
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="bottom"
            delay={{ show: 250, hide: 400 }}
            overlay={editTask}
          >
            <Button
              variant="primary"
              onClick={() => {
                updateTask();
              }}
            >
              <BsPencil />
            </Button>
          </OverlayTrigger>
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
