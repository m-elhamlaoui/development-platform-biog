import { Col, Row } from "react-bootstrap";
import DashboardSidebarComponent from "../components/DashboardSidebarComponent";
import { useNavigate, useParams } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import Club from "../models/Club";
import ModelsService from "../services/ModelsService";
import Admin from "../models/Admin";
import School from "../models/School";
import Student from "../models/Student";

function SuperAdminDashboardComponent() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    ModelsService.listClubs(token)
      .then((response) => {
        setClubs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    ModelsService.listAdmins(token)
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    ModelsService.listEvents(token)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    ModelsService.listSchools(token)
      .then((response) => {
        setSchools(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    ModelsService.listStudents(token)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    ModelsService.listRequests(token)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const clubsCount = clubs.length;
  const adminsCount = admins.length;
  const eventsCount = events.length;
  const schoolsCount = schools.length;
  const studentsCount = students.length;
  const requestsCount = requests.length;

  return (
    <Row className="row2">
      <Col className="col-md-2">
        <DashboardSidebarComponent option={"dashboard"} />
      </Col>
      <Col className="col2">
        <div className="entity">
          <span>Admins Table</span>
          <div className="rb">
            <span>
              {adminsCount} {adminsCount > 1 ? "rows" : "row"}
            </span>
            <button
              className="btn btn-pr2"
              onClick={() => navigate("/superadmin/admins")}
              type="button"
            >
              Edit Table
            </button>
          </div>
        </div>
        <div className="entity">
          <span>Clubs Table</span>
          <div className="rb">
            <span>
              {clubsCount} {clubsCount > 1 ? "rows" : "row"}
            </span>
            <button
              className="btn btn-pr2"
              onClick={() => navigate("/superadmin/clubs")}
              type="button"
            >
              Edit Table
            </button>
          </div>
        </div>
        <div className="entity">
          <span>Events Table</span>
          <div className="rb">
            <span>
              {eventsCount} {eventsCount > 1 ? "rows" : "row"}
            </span>
            <button
              className="btn btn-pr2"
              onClick={() => navigate("/superadmin/events")}
              type="button"
            >
              Edit Table
            </button>
          </div>
        </div>
        <div className="entity">
          <span>Schools Table</span>
          <div className="rb">
            <span>
              {schoolsCount} {schoolsCount > 1 ? "rows" : "row"}
            </span>
            <button
              className="btn btn-pr2"
              onClick={() => navigate("/superadmin/schools")}
              type="button"
            >
              Edit Table
            </button>
          </div>
        </div>
        <div className="entity">
          <span>Students Table</span>
          <div className="rb">
            <span>
              {studentsCount} {studentsCount > 1 ? "rows" : "row"}
            </span>
            <button
              className="btn btn-pr2"
              onClick={() => navigate("/superadmin/students")}
              type="button"
            >
              Edit Table
            </button>
          </div>
        </div>
        <div className="entity">
          <span>Pending Sign Up Requests</span>
          <div className="rb">
            <span>
              {requestsCount} {requestsCount > 1 ? "requests" : "request"}
            </span>
            <button
              className="btn btn-pr2"
              onClick={() => navigate("/superadmin/requests")}
              type="button"
            >
              Edit Table
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default SuperAdminDashboardComponent;
