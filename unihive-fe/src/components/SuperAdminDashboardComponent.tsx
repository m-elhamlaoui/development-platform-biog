import { Col, Row } from "react-bootstrap";
import DashboardSidebarComponent from "../components/DashboardSidebarComponent";
import { useNavigate, useParams } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import Club from "../models/Club";
import ModelsService from "../services/SuperAdminModelsService";
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

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const responseClubs = await ModelsService.listClubs(token);
      setClubs(responseClubs.data);

      const responseAdmins = await ModelsService.listAdmins(token);
      setAdmins(responseAdmins.data);

      const responseEvents = await ModelsService.listEvents(token);
      setEvents(responseEvents.data);

      const responseSchools = await ModelsService.listSchools(token);
      setSchools(responseSchools.data);

      const responseStudents = await ModelsService.listStudents(token);
      setStudents(responseStudents.data);

      const responseRequests = await ModelsService.listRequests(token);
      setRequests(responseRequests.data);

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    setIsLoading(true);
    fetchData();
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
          {isLoading ? (
            <div>Loading...</div>
          ) : (
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
          )}
        </div>
        <div className="entity">
          <span>Clubs Table</span>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
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
          )}
        </div>
        <div className="entity">
          <span>Events Table</span>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
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
          )}
        </div>
        <div className="entity">
          <span>Schools Table</span>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
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
          )}
        </div>
        <div className="entity">
          <span>Students Table</span>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
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
          )}
        </div>
        <div className="entity">
          <span>Pending Sign Up Requests</span>
          {isLoading ? (
            <div>Loading...</div>
          ) : (
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
          )}
        </div>
      </Col>
    </Row>
  );
}

export default SuperAdminDashboardComponent;
