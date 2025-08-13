import { Button } from "react-bootstrap";
import { TodoFormContext } from "../context/todoFormContext";
import { useContext } from "react";

function TodoFormModalButton() {
  const { setShowModal } = useContext(TodoFormContext);
  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <Button variant="primary" onClick={handleShow}>
      Agregar Tarea
    </Button>
  );
}

export default TodoFormModalButton;
