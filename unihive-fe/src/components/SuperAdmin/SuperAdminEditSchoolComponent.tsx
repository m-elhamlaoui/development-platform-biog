import { Col, Modal, Row } from "react-bootstrap";
import DashboardSidebarComponent from "../DashboardSidebarComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../../services/SuperAdminModelsService";
import School from "../../models/School";
import { Schools } from "../../models/Schools";
import { Cities } from "../../models/Cities";
import { CircularSpinner } from "infinity-spinners";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

function SuperAdminEditSchoolComponent() {
  const { id } = useParams();
  const { state } = useLocation();
  const [school, setSchool] = useState<School>(state.school);
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
    ModelsService.deleteSchool(token, school.id)
      .then((response) => {
        console.log(response);
        handleClose();
        enqueueSnackbar("School deleted successfully.", {
          variant: "success",
          autoHideDuration: 1000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
          onClose: () => {
            navigate("/superadmin/schools");
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setIsDisabled1(false);
        enqueueSnackbar("Failed to delete school", {
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
    ModelsService.updateSchool(token, school.id, {
      schoolName: event.target[1].value,
      schoolAddress: event.target[2].value,
      schoolCity: event.target[3].value,
    })
      .then((response) => {
        console.log(response);
        enqueueSnackbar("School updated successfully.", {
          variant: "success",
          autoHideDuration: 1000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
          onClose: () => {
            navigate("/superadmin/schools");
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setIsDisabled2(false);
        enqueueSnackbar("Failed to update school", {
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

  const SchoolsArray = Object.values(Schools);
  const CitiesArray = Object.values(Cities);
  SchoolsArray.sort();
  CitiesArray.sort();

  return (
    <>
      <SnackbarProvider maxSnack={4} />
      <Row className="row2">
        <Col className="col-md-2">
          <DashboardSidebarComponent option={"upschool"} />
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
                    <input type="text" value={school.id} disabled />
                  </div>
                  <div className="info-row">
                    SCHOOL NAME
                    <select
                      name=""
                      id=""
                      value={school.schoolName}
                      onChange={(event) => {
                        const updatedSchool = {
                          ...school,
                          schoolName: event.target.value,
                        };
                        setSchool(updatedSchool);
                      }}
                    >
                      {SchoolsArray.map((school: string) => (
                        <option key={school} value={school}>
                          {school}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="info-row">
                    SCHOOL ADDRESS
                    <input
                      type="text"
                      placeholder="school address"
                      value={school.schoolAddress}
                      onChange={(event) => {
                        const updatedSchool = {
                          ...school,
                          schoolAddress: event.target.value,
                        };
                        setSchool(updatedSchool);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    SCHOOL CITY
                    <select
                      name=""
                      id=""
                      value={school.schoolCity}
                      onChange={(event) => {
                        const updatedSchool = {
                          ...school,
                          schoolCity: event.target.value,
                        };
                        setSchool(updatedSchool);
                      }}
                    >
                      {CitiesArray.map((city: string) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
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
                      onClick={() => navigate("/superadmin/schools")}
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
          Delete School with name {school.schoolName}? <br />
          This will affect the tables: Students, Clubs, and Events.
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

export default SuperAdminEditSchoolComponent;
