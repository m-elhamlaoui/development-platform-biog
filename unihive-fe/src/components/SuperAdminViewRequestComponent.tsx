import { Col, Modal, Row } from "react-bootstrap";
import DashboardSidebarComponent from "./DashboardSidebarComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/SuperAdminModelsService";
import School from "../models/School";
import Request from "../models/Request";

function SuperAdminViewRequestComponent() {
  const { id } = useParams();
  const { state } = useLocation();
  const [schools, setSchools] = useState<School[]>([]);
  const [request, setRequest] = useState<Request>(state.request);
  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isMyTokenExpired) {
          localStorage.removeItem("user");
          navigate("/login");
        }
        const schoolsResponse = await ModelsService.listSchools(token);
        setSchools(schoolsResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);

  const handleReject = () => {
    ModelsService.deleteRequest(token, request.id)
      .then((response) => {
        console.log(response);
        handleClose1();
        navigate("/superadmin/requests");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleAccept = () => {
    ModelsService.updateRequest(token, request.id, {
      firstName: request.firstName,
      lastName: request.lastName,
      cne: request.cne,
      numApogee: request.numApogee,
      schoolName: request.schoolName,
      email: request.email,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });

    setTimeout(() => {
      ModelsService.acceptRequest(token, request.id)
        .then((response) => {
          console.log(response);
          handleClose2();
          navigate("/superadmin/requests");
        })
        .catch((error) => {
          console.error(error);
        });
    }, 1000);
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
          <DashboardSidebarComponent option={"uprequest"} />
        </Col>
        <Col className="col2">
          <div className="table-entity-add">
            <div className="header">
              <span style={{ fontSize: "1.5rem" }}>{strId + " Row"}</span>
            </div>
            {isLoading ? (
              <div className="is-loading">Loading...</div>
            ) : (
              <form>
                <div className="info">
                  <div className="info-row">
                    ID
                    <input type="text" value={request.id} disabled />
                  </div>
                  <div className="info-row">
                    FIRST NAME
                    <input
                      type="text"
                      placeholder="first name"
                      value={request.firstName}
                      onChange={(event) => {
                        const updatedRequest = {
                          ...request,
                          firstName: event.target.value,
                        };
                        setRequest(updatedRequest);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    LAST NAME
                    <input
                      type="text"
                      placeholder="last name"
                      value={request.lastName}
                      onChange={(event) => {
                        const updatedRequest = {
                          ...request,
                          lastName: event.target.value,
                        };
                        setRequest(updatedRequest);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    CNE
                    <input
                      type="text"
                      placeholder="cne"
                      value={request.cne}
                      onChange={(event) => {
                        const updatedRequest = {
                          ...request,
                          cne: event.target.value,
                        };
                        setRequest(updatedRequest);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    NUM APOGEE
                    <input
                      type="number"
                      placeholder="num  apogee"
                      value={request.numApogee}
                      onChange={(event) => {
                        const updatedClub = {
                          ...request,
                          numApogee: parseInt(event.target.value, 10),
                        };
                        setRequest(updatedClub);
                      }}
                      min={0}
                    />
                  </div>
                  <div className="info-row">
                    SCHOOL CARD
                    <input
                      type="text"
                      placeholder="profile image"
                      value={request.schoolCard}
                      onChange={(event) => {
                        const updatedRequest = {
                          ...request,
                          schoolCard: event.target.value,
                        };
                        setRequest(updatedRequest);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    SCHOOL
                    <select
                      name=""
                      id=""
                      value={request.schoolName}
                      onChange={(event) => {
                        const updatedRequest = {
                          ...request,
                          schoolName: event.target.value,
                        };
                        setRequest(updatedRequest);
                      }}
                    >
                      {schools.map((school) => (
                        <option
                          key={school.schoolName}
                          value={school.schoolName}
                        >
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
                      value={request.email}
                      onChange={(event) => {
                        const updatedRequest = {
                          ...request,
                          email: event.target.value,
                        };
                        setRequest(updatedRequest);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    PASSWORD
                    <input
                      type="text"
                      placeholder="password"
                      value={request.password}
                      disabled
                    />
                  </div>
                  <div className="info-btns">
                    <button
                      className="btn save-update"
                      type="button"
                      onClick={handleShow2}
                    >
                      Accept
                    </button>
                    <button
                      className="btn delete"
                      type="button"
                      onClick={handleShow1}
                    >
                      Reject
                    </button>
                    <button
                      className="btn cancel-update"
                      type="button"
                      onClick={() => navigate("/superadmin/requests")}
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
      <Modal show={show1} onHide={handleClose1} centered>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Reject Request with student name {request.firstName}{" "}
          {request.lastName}?
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn modal-cancel"
            type="button"
            onClick={handleClose1}
          >
            Cancel
          </button>
          <button
            className="btn modal-confirm"
            type="button"
            onClick={handleReject}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose2} centered>
        <Modal.Header>
          <Modal.Title className="title2">Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Accept Request with student name {request.firstName}{" "}
          {request.lastName}?
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn modal-cancel"
            type="button"
            onClick={handleClose2}
          >
            Cancel
          </button>
          <button
            className="btn modal-confirm-2"
            type="button"
            onClick={handleAccept}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SuperAdminViewRequestComponent;
