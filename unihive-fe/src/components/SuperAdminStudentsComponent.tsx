import { Col, Row, Table } from "react-bootstrap";
import DashboardSidebarComponent from "../components/DashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/SuperAdminModelsService";
import Student from "../models/Student";

function SuperAdminStudentsComponent() {
  const [students, setStudents] = useState<Student[]>([]);
  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    ModelsService.listStudents(token)
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const studentsArray = Object.values(students);
  const studentsCount = studentsArray.length;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Student[]>(students);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = students.filter(
      (student) =>
        student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, students]);

  const filteredStudents = searchTerm ? searchResults : studentsArray;

  return (
    <Row className="row2">
      <Col className="col-md-2">
        <DashboardSidebarComponent option={"students"} />
      </Col>
      <Col className="col2">
        <div className="table-entity">
          <div className="header">
            <span style={{ fontSize: "1.5rem" }}>Students Table</span>
            <span style={{ fontSize: "1.2rem" }}>
              {studentsCount} {studentsCount > 1 ? "rows" : "row"}
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
          {studentsCount === 0 ? (
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
                    <th>PROFILE IMAGE</th>
                    <th>SCHOOL</th>
                    <th>EMAIL</th>
                    <th>PASSWORD</th>
                    <th>EDIT/DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student) => (
                    <tr key={student.id}>
                      <td>{student.id.slice(0, 5)}...</td>
                      <td>
                        {student.cne.length > 6
                          ? student.cne.slice(0, 6) + "..."
                          : student.cne}
                      </td>
                      <td>
                        {student.numApogee!.toString().length > 8
                          ? student.numApogee.toString().slice(0, 8) + "..."
                          : student.numApogee.toString()}
                      </td>
                      <td>
                        {student.firstName.length > 6
                          ? student.firstName.slice(0, 6) + "..."
                          : student.firstName}
                      </td>
                      <td>
                        {student.lastName.length > 6
                          ? student.lastName.slice(0, 6) + "..."
                          : student.lastName}
                      </td>
                      <td>
                        {student.profileImage.length > 10
                          ? student.profileImage.slice(0, 10) + "..."
                          : student.profileImage}
                      </td>
                      <td>
                        {student.school.schoolName.length > 6
                          ? student.school.schoolName.slice(0, 6) + "..."
                          : student.school.schoolName}
                      </td>
                      <td>
                        {student.email.length > 6
                          ? student.email.slice(0, 6) + "..."
                          : student.email}
                      </td>
                      <td>
                        {student.password.length > 15
                          ? student.password.slice(0, 15) + "..."
                          : student.password}
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
          Add Student
        </button>
      </Col>
    </Row>
  );
}

export default SuperAdminStudentsComponent;
