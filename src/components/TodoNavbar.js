import { useContext } from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { AppThemeContext } from "../context/appThemeContext";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

function TodoNavbar() {
  const { theme, toggleTheme } = useContext(AppThemeContext);

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
    </Tooltip>
  );

  return (
    <div className={`App ${theme}`}>
      <Navbar
        expand="lg"
        bg={theme === "light" ? "light" : "dark"}
        variant={theme === "light" ? "light" : "dark"}
        className="mb-4"
      >
        <Container>
          <Navbar.Brand href="#">Gestor de Tareas</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/">
                Lista de tareas
              </Nav.Link>
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>

              <div className="d-flex align-items-center">
                {theme === "light" && <MdLightMode style={{ color: "grey" }} />}
              </div>
              <OverlayTrigger
                placement="bottom"
                delay={{ show: 250, hide: 400 }}
                overlay={renderTooltip}
              >
                <Form className="mx-2">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label=""
                    onChange={toggleTheme}
                  />
                </Form>
              </OverlayTrigger>
              <div className="d-flex align-items-center me-2">
                {theme === "dark" && <MdDarkMode style={{ color: "white" }} />}
              </div>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default TodoNavbar;
