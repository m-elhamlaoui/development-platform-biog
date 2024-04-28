import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";

function DashboardNavbarComponent(props: { name: string }) {
  return (
    <Navbar expand="lg" className="bg-body-tertiary nav2">
      <Container className="cont3" fluid>
        <Navbar.Brand href="/">{props.name} Dashboard</Navbar.Brand>
        <Nav>
          <button className="btn btn-outline-primary">Log Out</button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default DashboardNavbarComponent;
