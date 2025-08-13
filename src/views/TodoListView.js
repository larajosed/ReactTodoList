import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import { Row, Col } from "react-bootstrap";
import { TodoFormContextProvider } from "../context/todoFormContext";
import TodoFormModalButton from "../components/TodoFormModalButton";

function TodoListView() {
  return (
    <TodoFormContextProvider>
      <h1 className="title">Lista de Tareas</h1>
      <div className="my-5">
        <Row className="mb-3">
          <Col className="add-task-button-container">
            <div className="buttonsContainer">
              <TodoFormModalButton />
            </div>
          </Col>
        </Row>
        <TodoForm />
        <TodoList />
      </div>
    </TodoFormContextProvider>
  );
}

export default TodoListView;
