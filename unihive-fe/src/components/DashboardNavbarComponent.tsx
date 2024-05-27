import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

function DashboardNavbarComponent(props: { name: string }) {
  const navigate = useNavigate();

  function logout() {
    AuthService.logout();
    navigate("/login");
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary nav2">
      <Container className="cont3" fluid>
        <Navbar.Brand href="/">{props.name}</Navbar.Brand>
        <Nav>
          <button className="btn btn-outline-primary" onClick={logout}>
            Log Out
          </button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default DashboardNavbarComponent;
