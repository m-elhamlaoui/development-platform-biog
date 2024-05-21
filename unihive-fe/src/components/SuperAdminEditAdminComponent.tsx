import { Col, Modal, Row } from "react-bootstrap";
import DashboardSidebarComponent from "./DashboardSidebarComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/SuperAdminModelsService";
import School from "../models/School";
import Admin from "../models/Admin";
import { CircularSpinner } from "infinity-spinners";

function SuperAdminEditAdminComponent() {
  const { id } = useParams();
  const { state } = useLocation();
  const [schools, setSchools] = useState<School[]>([]);
  const [admin, setAdmin] = useState<Admin>(state.admin);
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
    ModelsService.deleteAdmin(token, admin.id)
      .then((response) => {
        console.log(response);
        handleClose();
        navigate("/superadmin/admins");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSave = (event: any) => {
    event.preventDefault();
    ModelsService.updateAdmin(token, admin.id, {
      firstName: event.target[1].value,
      lastName: event.target[2].value,
      school: schools.find((school) => school.id === event.target[3].value),
      email: event.target[4].value,
    })
      .then((response) => {
        console.log(response);
        navigate("/superadmin/admins");
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
          <DashboardSidebarComponent option={"upadmin"} />
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
                    <input type="text" value={admin.id} disabled />
                  </div>
                  <div className="info-row">
                    FIRST NAME
                    <input
                      type="text"
                      placeholder="first name"
                      value={admin.firstName}
                      onChange={(event) => {
                        const updatedAdmin = {
                          ...admin,
                          firstName: event.target.value,
                        };
                        setAdmin(updatedAdmin);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    LAST NAME
                    <input
                      type="text"
                      placeholder="last name"
                      value={admin.lastName}
                      onChange={(event) => {
                        const updatedAdmin = {
                          ...admin,
                          lastName: event.target.value,
                        };
                        setAdmin(updatedAdmin);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    SCHOOL
                    <select
                      name=""
                      id=""
                      value={admin.school.id}
                      onChange={(event) => {
                        const updatedAdmin = {
                          ...admin,
                          school: { id: event.target.value },
                        };
                        setAdmin(updatedAdmin as Admin);
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
                      value={admin.email}
                      onChange={(event) => {
                        const updatedAdmin = {
                          ...admin,
                          email: event.target.value,
                        };
                        setAdmin(updatedAdmin);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    PASSWORD
                    <input
                      type="text"
                      placeholder="password"
                      value={admin.password}
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
                      onClick={() => navigate("/superadmin/admins")}
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
          Delete Admin with name {admin.firstName} {admin.lastName}?
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

export default SuperAdminEditAdminComponent;
