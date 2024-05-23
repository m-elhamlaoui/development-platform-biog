import { Col, Modal, Row } from "react-bootstrap";
import DashboardSidebarComponent from "../AdminDashboardSidebarComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ModelsService from "../../services/AdminModelsService";
import School from "../../models/School";
import Student from "../../models/Student";
import { CircularSpinner } from "infinity-spinners";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { decodeToken } from "react-jwt";

function AdminEditStudentComponent() {
  const { id } = useParams();
  const { state } = useLocation();
  const [school, setSchool] = useState<School>();
  const [student, setStudent] = useState<Student>(state.student);
  var token: string = "";
  const navigate = useNavigate();
  const [isDisabled1, setIsDisabled1] = useState(false);
  const [isDisabled2, setIsDisabled2] = useState(false);

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
        const decodedToken: any = decodeToken(token);
        const schoolResponse = await ModelsService.School(
          token,
          decodedToken.sub
        );
        setSchool(schoolResponse.data);
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
    setIsDisabled1(true);
    ModelsService.deleteStudent(token, student.id, school!.id)
      .then((response) => {
        console.log(response);
        handleClose();
        enqueueSnackbar("Student deleted successfully.", {
          variant: "success",
          autoHideDuration: 1000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
          onClose: () => {
            navigate("/superadmin/students");
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setIsDisabled1(false);
        enqueueSnackbar("Failed to delete student", {
          variant: "error",
          autoHideDuration: 2000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
        });
      });
  };

  const handleSave = (event: any) => {
    setIsDisabled2(true);
    event.preventDefault();
    ModelsService.updateStudent(
      token,
      student.id,
      {
        firstName: event.target[1].value,
        lastName: event.target[2].value,
        cne: event.target[3].value,
        numApogee: event.target[4].value,
        profileImage: event.target[5].value,
        email: event.target[7].value,
      },
      school!.id
    )
      .then((response) => {
        console.log(response);
        enqueueSnackbar("Student updated successfully.", {
          variant: "success",
          autoHideDuration: 1000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
          onClose: () => {
            navigate("/admin/students");
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setIsDisabled2(false);
        enqueueSnackbar("Failed to update student", {
          variant: "error",
          autoHideDuration: 2000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
        });
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
      <SnackbarProvider maxSnack={4} />
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
              <div className="is-loading">
                <CircularSpinner color="#000" size={60} speed={2} weight={3} />
              </div>
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
                    <button
                      className="btn save-update"
                      type="submit"
                      disabled={isDisabled2}
                    >
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
                      onClick={() => navigate("/admin/students")}
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
            disabled={isDisabled1}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminEditStudentComponent;
