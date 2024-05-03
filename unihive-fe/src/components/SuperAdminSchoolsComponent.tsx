import { Col, Modal, Row, Table } from "react-bootstrap";
import DashboardSidebarComponent from "../components/DashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/SuperAdminModelsService";
import School from "../models/School";

function SuperAdminSchoolsComponent() {
  const [schools, setSchools] = useState<School[]>([]);
  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [schoolId, setSchoolId] = useState("");
  const [schoolName, setSchoolName] = useState("");

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    ModelsService.listSchools(token)
      .then((response) => {
        setSchools(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleShow = (id: string, name: string) => {
    setShow(true);
    setSchoolId(id);
    setSchoolName(name);
  };
  const handleClose = () => setShow(false);

  const handleDelete = (id: string) => {
    ModelsService.deleteSchool(token, id)
      .then((response) => {
        console.log(response);
        handleClose();
        setIsLoading(true);
        ModelsService.listSchools(token)
          .then((response) => {
            setSchools(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
    <>
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
            {isLoading ? (
              <div className="no-data">Loading...</div>
            ) : schoolsCount === 0 ? (
              <div className="no-data">No Data.</div>
            ) : (
              <div className="table-table">
                <Table>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>ADDRESS</th>
                      <th>CITY</th>
                      <th>EDIT/DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSchools.map((school) => (
                      <tr key={school.id}>
                        <td>{school.schoolName}</td>
                        <td>
                          {school.schoolAddress.length > 60
                            ? school.schoolAddress.slice(0, 60) + "..."
                            : school.schoolAddress}
                        </td>
                        <td>{school.schoolCity}</td>
                        <td>
                          <div className="modify">
                            <button
                              className="btn btn-edit"
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/superadmin/upschool/${
                                    schools.indexOf(school) + 1
                                  }`,
                                  { state: { school } }
                                )
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-delete"
                              type="button"
                              onClick={() =>
                                handleShow(school.id, school.schoolName)
                              }
                            >
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
          <button
            className="btn btn-add2"
            type="button"
            onClick={() => navigate("/superadmin/addschool")}
          >
            Add School
          </button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete School with name {schoolName}?</Modal.Body>
        <Modal.Footer>
          <button
            className="btn modal-cancel"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="btn modal-confirm"
            type="button"
            onClick={() => handleDelete(schoolId)}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SuperAdminSchoolsComponent;
