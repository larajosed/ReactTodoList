import TodoList from "../components/TodoList";
import TodoForm from "../components/TodoForm";
import { Row, Col } from "react-bootstrap";
import { TodoFormContextProvider } from "../context/todoFormContext";
import { TodoSidebarContextProvider } from "../context/todoSidebarContext";
import TodoFormModalButton from "../components/TodoFormModalButton";
import SidebarTask from "../components/SidebarTask";
import TodoItem from "../components/TodoItem";

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

        <TodoSidebarContextProvider>
          <TodoList />
          <SidebarTask />
        </TodoSidebarContextProvider>
      </div>
    </TodoFormContextProvider>
  );
}

export default TodoListView;
