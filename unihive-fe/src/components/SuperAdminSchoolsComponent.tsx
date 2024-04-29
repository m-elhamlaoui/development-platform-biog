import { Col, Row, Table } from "react-bootstrap";
import DashboardSidebarComponent from "../components/DashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/ModelsService";
import School from "../models/School";

function SuperAdminSchoolsComponent() {
  const [schools, setSchools] = useState<School[]>([]);
  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    ModelsService.listSchools(token)
      .then((response) => {
        setSchools(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const schoolsArray = Object.values(schools);
  const schoolsCount = schoolsArray.length;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<School[]>(schools);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = schools.filter(
      (school) =>
        school.schoolCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        school.schoolName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, schools]);

  const filteredSchools = searchTerm ? searchResults : schoolsArray;

  return (
    <Row className="row2">
      <Col className="col-md-2">
        <DashboardSidebarComponent option={"schools"} />
      </Col>
      <Col className="col2">
        <div className="table-entity">
          <div className="header">
            <span style={{ fontSize: "1.5rem" }}>Schools Table</span>
            <span style={{ fontSize: "1.2rem" }}>
              {schoolsCount} {schoolsCount > 1 ? "rows" : "row"}
            </span>
          </div>
          <div className="table-bar1">
            <div>Search</div>
            <input
              type="text"
              placeholder="School name, or city"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {schoolsCount === 0 ? (
            <div className="no-data">No Data.</div>
          ) : (
            <div className="table-table">
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>SCHOOL NAME</th>
                    <th>SCHOOL ADDRESS</th>
                    <th>SCHOOL CITY</th>
                    <th>EDIT/DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSchools.map((school) => (
                    <tr key={school.id}>
                      <td>{school.id.slice(0, 5)}...</td>
                      <td>
                        {school.schoolName.length > 30
                          ? school.schoolName.slice(0, 30) + "..."
                          : school.schoolName}
                      </td>
                      <td>
                        {school.schoolAddress.length > 60
                          ? school.schoolAddress.slice(0, 60) + "..."
                          : school.schoolAddress}
                      </td>
                      <td>
                        {school.schoolCity.length > 30
                          ? school.schoolCity.slice(0, 30) + "..."
                          : school.schoolCity}
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
          Add School
        </button>
      </Col>
    </Row>
  );
}

export default SuperAdminSchoolsComponent;
