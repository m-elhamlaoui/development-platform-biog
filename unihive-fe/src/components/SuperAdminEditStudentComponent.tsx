import { Col, Modal, Row } from "react-bootstrap";
import DashboardSidebarComponent from "./DashboardSidebarComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/SuperAdminModelsService";
import School from "../models/School";
import Student from "../models/Student";

function SuperAdminEditStudentComponent() {
  const { id } = useParams();
  const { state } = useLocation();
  const [schools, setSchools] = useState<School[]>([]);
  const [student, setStudent] = useState<Student>(state.student);
  var token: string = "";
  const navigate = useNavigate();

  if (localStorage.getItem("superadmin")) {
    token = localStorage.getItem("superadmin") as string;
  } else if (localStorage.getItem("admin")) {
    token = localStorage.getItem("admin") as string;
  } else if (localStorage.getItem("student")) {
    token = localStorage.getItem("student") as string;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsResponse = await ModelsService.listSchools(token);
        setSchools(schoolsResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDelete = () => {
    ModelsService.deleteStudent(token, student.id)
      .then((response) => {
        console.log(response);
        handleClose();
        navigate("/superadmin/students");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSave = (event: any) => {
    event.preventDefault();
    ModelsService.updateStudent(token, student.id, {
      firstName: event.target[1].value,
      lastName: event.target[2].value,
      cne: event.target[3].value,
      numApogee: event.target[4].value,
      profileImage: event.target[5].value,
      school: schools.find((school) => school.id === event.target[6].value),
      email: event.target[7].value,
    })
      .then((response) => {
        console.log(response);
        navigate("/superadmin/students");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  var strId = String(id);

  if (strId[strId.length - 1] === "1") {
    strId += "st";
  } else if (strId[strId.length - 1] === "2") {
    strId += "nd";
  } else if (strId[strId.length - 1] === "3") {
    strId += "rd";
  } else {
    strId += "th";
  }

  return (
    <>
      <Row className="row2">
        <Col className="col-md-2">
          <DashboardSidebarComponent option={"upstudent"} />
        </Col>
        <Col className="col2">
          <div className="table-entity-add">
            <div className="header">
              <span style={{ fontSize: "1.5rem" }}>{strId + " Row"}</span>
            </div>
            {isLoading ? (
              <div className="is-loading">Loading...</div>
            ) : (
              <form onSubmit={handleSave}>
                <div className="info">
                  <div className="info-row">
                    ID
                    <input type="text" value={student.id} disabled />
                  </div>
                  <div className="info-row">
                    FIRST NAME
                    <input
                      type="text"
                      placeholder="first name"
                      value={student.firstName}
                      onChange={(event) => {
                        const updatedStudent = {
                          ...student,
                          firstName: event.target.value,
                        };
                        setStudent(updatedStudent);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    LAST NAME
                    <input
                      type="text"
                      placeholder="last name"
                      value={student.lastName}
                      onChange={(event) => {
                        const updatedStudent = {
                          ...student,
                          lastName: event.target.value,
                        };
                        setStudent(updatedStudent);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    CNE
                    <input
                      type="text"
                      placeholder="cne"
                      value={student.cne}
                      onChange={(event) => {
                        const updatedStudent = {
                          ...student,
                          cne: event.target.value,
                        };
                        setStudent(updatedStudent);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    NUM APOGEE
                    <input
                      type="number"
                      placeholder="num  apogee"
                      value={student.numApogee}
                      onChange={(event) => {
                        const updatedClub = {
                          ...student,
                          numApogee: parseInt(event.target.value, 10),
                        };
                        setStudent(updatedClub);
                      }}
                      min={0}
                      max={99999999}
                    />
                  </div>
                  <div className="info-row">
                    PROFILE IMAGE
                    <input
                      type="text"
                      placeholder="profile image"
                      value={student.profileImage}
                      onChange={(event) => {
                        const updatedStudent = {
                          ...student,
                          profileImage: event.target.value,
                        };
                        setStudent(updatedStudent);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    SCHOOL
                    <select
                      name=""
                      id=""
                      value={student.school.id}
                      onChange={(event) => {
                        const updatedStudent = {
                          ...student,
                          school: { id: event.target.value },
                        };
                        setStudent(updatedStudent as Student);
                      }}
                    >
                      {schools.map((school) => (
                        <option key={school.id} value={school.id}>
                          {school.schoolName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="info-row">
                    EMAIL
                    <input
                      type="text"
                      placeholder="email"
                      value={student.email}
                      onChange={(event) => {
                        const updatedStudent = {
                          ...student,
                          email: event.target.value,
                        };
                        setStudent(updatedStudent);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    PASSWORD
                    <input
                      type="text"
                      placeholder="password"
                      value={student.password}
                      disabled
                    />
                  </div>
                  <div className="info-btns">
                    <button className="btn save-update" type="submit">
                      Save
                    </button>
                    <button
                      className="btn delete"
                      type="button"
                      onClick={handleShow}
                    >
                      Delete
                    </button>
                    <button
                      className="btn cancel-update"
                      type="button"
                      onClick={() => navigate("/superadmin/students")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete Student with name {student.firstName} {student.lastName}?
        </Modal.Body>
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
            onClick={handleDelete}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SuperAdminEditStudentComponent;
