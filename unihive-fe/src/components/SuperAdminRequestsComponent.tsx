import { Col, Row, Table } from "react-bootstrap";
import DashboardSidebarComponent from "../components/DashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/ModelsService";
import Request from "../models/Request";

function SuperAdminRequestsComponent() {
  const [requests, setRequests] = useState<Request[]>([]);
  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    ModelsService.listRequests(token)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const requestsArray = Object.values(requests);
  const requestsCount = requestsArray.length;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Request[]>(requests);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = requests.filter(
      (request) =>
        request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, requests]);

  const filteredRequests = searchTerm ? searchResults : requestsArray;

  return (
    <Row className="row2">
      <Col className="col-md-2">
        <DashboardSidebarComponent option={"requests"} />
      </Col>
      <Col className="col2">
        <div className="table-entity">
          <div className="header">
            <span style={{ fontSize: "1.5rem" }}>Pending Sign Up Requests</span>
            <span style={{ fontSize: "1.2rem" }}>
              {requestsCount} {requestsCount > 1 ? "requests" : "request"}
            </span>
          </div>
          <div className="table-bar2">
            <div>Search</div>
            <input
              type="text"
              placeholder="Email, first name, or last name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {requestsCount === 0 ? (
            <div className="no-data">No Data.</div>
          ) : (
            <div className="table-table">
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>CNE</th>
                    <th>NUM APOGEE</th>
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>SCHOOL CARD</th>
                    <th>SCHOOL</th>
                    <th>EMAIL</th>
                    <th>PASSWORD</th>
                    <th>EDIT/DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRequests.map((request) => (
                    <tr key={request.id}>
                      <td>{request.id.slice(0, 5)}...</td>
                      <td>
                        {request.cne.length > 9
                          ? request.cne.slice(0, 9) + "..."
                          : request.cne}
                      </td>
                      <td>
                        {request.numApogee!.toString().length > 9
                          ? request.numApogee.toString().slice(0, 9) + "..."
                          : request.numApogee.toString()}
                      </td>
                      <td>
                        {request.firstName.length > 9
                          ? request.firstName.slice(0, 9) + "..."
                          : request.firstName}
                      </td>
                      <td>
                        {request.lastName.length > 9
                          ? request.lastName.slice(0, 9) + "..."
                          : request.lastName}
                      </td>
                      <td>
                        {request.schoolCard.length > 9
                          ? request.schoolCard.slice(0, 9) + "..."
                          : request.schoolCard}
                      </td>
                      <td>
                        {request.schoolName.length > 9
                          ? request.schoolName.slice(0, 9) + "..."
                          : request.schoolName}
                      </td>
                      <td>
                        {request.email.length > 9
                          ? request.email.slice(0, 9) + "..."
                          : request.email}
                      </td>
                      <td>
                        {request.password.length > 9
                          ? request.password.slice(0, 9) + "..."
                          : request.password}
                      </td>
                      <td>
                        <div className="modify">
                          <button className="btn btn-edit" type="button">
                            Edit
                          </button>
                          <button className="btn btn-delete" type="button">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </div>
        <button className="btn btn-add3" type="button">
          Add Request
        </button>
      </Col>
    </Row>
  );
}

export default SuperAdminRequestsComponent;
