import Offcanvas from "react-bootstrap/Offcanvas";
import React, { useContext } from "react";
import { TodoFormContext } from "../context/todoFormContext";

function SidebarTask() {
  const { showSideBar, setShowSideBar } = useContext(TodoFormContext);
  const handleClose = () => setShowSideBar(false);
  return (
    <>
      <Offcanvas show={showSideBar} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Tarea</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Some text as placeholder. In real life you can have the elements you
          have chosen. Like, text, images, lists, etc.
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SidebarTask;
