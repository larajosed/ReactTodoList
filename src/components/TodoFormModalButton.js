import { Button } from "react-bootstrap";
import { TodoFormContext } from "../context/todoFormContext";
import { useContext } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";

function TodoFormModalButton() {
  const { setShowModal } = useContext(TodoFormContext);
  const handleShow = () => {
    setShowModal(true);
  };

  return (
    <Button variant="primary" onClick={handleShow}>
      Agregar tarea <IoMdAddCircleOutline />
    </Button>
  );
}

export default TodoFormModalButton;
