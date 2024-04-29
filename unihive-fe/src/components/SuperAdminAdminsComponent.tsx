import { Col, Row, Table } from "react-bootstrap";
import DashboardSidebarComponent from "../components/DashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/ModelsService";
import Admin from "../models/Admin";

function SuperAdminAdminsComponent() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    ModelsService.listAdmins(token)
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const adminsArray = Object.values(admins);
  const adminsCount = adminsArray.length;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Admin[]>(admins);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = admins.filter(
      (admin) =>
        admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, admins]);

  const filteredAdmins = searchTerm ? searchResults : adminsArray;

  return (
    <Row className="row2">
      <Col className="col-md-2">
        <DashboardSidebarComponent option={"admins"} />
      </Col>
      <Col className="col2">
        <div className="table-entity">
          <div className="header">
            <span style={{ fontSize: "1.5rem" }}>Admins Table</span>
            <span style={{ fontSize: "1.2rem" }}>
              {adminsCount} {adminsCount > 1 ? "rows" : "row"}
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
          {adminsCount === 0 ? (
            <div className="no-data">No Data.</div>
          ) : (
            <div className="table-table">
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>FIRST NAME</th>
                    <th>LAST NAME</th>
                    <th>SCHOOL</th>
                    <th>EMAIL</th>
                    <th>PASSWORD</th>
                    <th>EDIT/DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.map((admin) => (
                    <tr key={admin.id}>
                      <td>{admin.id.slice(0, 5)}...</td>
                      <td>
                        {admin.firstName.length > 20
                          ? admin.firstName.slice(0, 20) + "..."
                          : admin.firstName}
                      </td>
                      <td>
                        {admin.lastName.length > 20
                          ? admin.lastName.slice(0, 20) + "..."
                          : admin.lastName}
                      </td>
                      <td>
                        {admin.school.schoolName.length > 20
                          ? admin.school.schoolName.slice(0, 20) + "..."
                          : admin.school.schoolName}
                      </td>
                      <td>
                        {admin.email.length > 20
                          ? admin.email.slice(0, 20) + "..."
                          : admin.email}
                      </td>
                      <td>
                        {admin.password.length > 36
                          ? admin.password.slice(0, 36) + "..."
                          : admin.password}
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
        <button className="btn btn-add2" type="button">
          Add Admin
        </button>
      </Col>
    </Row>
  );
}

export default SuperAdminAdminsComponent;
