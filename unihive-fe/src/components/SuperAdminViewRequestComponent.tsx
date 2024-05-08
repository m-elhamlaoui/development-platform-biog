import { Col, Modal, Row } from "react-bootstrap";
import DashboardSidebarComponent from "./DashboardSidebarComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/SuperAdminModelsService";
import School from "../models/School";
import Request from "../models/Request";
import { ArrowsPointingOutIcon } from "@heroicons/react/24/outline";

function SuperAdminViewRequestComponent() {
  const { id } = useParams();
  const { state } = useLocation();
  const [schools, setSchools] = useState<School[]>([]);
  const [request, setRequest] = useState<Request>(state.request);
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
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

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

  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);
  const handleShow2 = () => setShow2(true);
  const handleClose2 = () => setShow2(false);
  const handleShow3 = () => setShow3(true);
  const handleClose3 = () => setShow3(false);

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
          <DashboardSidebarComponent option={"viewrequest"} />
        </Col>
        <Col className="col2">
          <div className="table-entity-add">
            <div className="header">
              <span style={{ fontSize: "1.5rem" }}>{strId + " Row"}</span>
            </div>
            {isLoading ? (
              <div className="is-loading">Loading...</div>
            ) : (
              <div className="req-entity">
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
                <div className="school-card">
                  <div className="sc-img">
                    <img src={request.schoolCard} alt="" />
                  </div>
                  <div className="sc-title">
                    <span>SCHOOL CARD</span>
                    <div className="sc-title-btn">
                      <button
                        className="btn fs"
                        type="button"
                        onClick={handleShow3}
                      >
                        <ArrowsPointingOutIcon
                          width={20}
                          height={20}
                          color="black"
                        />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
      <Modal
        className="modal-img-cont"
        show={show3}
        onHide={handleClose3}
        centered
      >
        <Modal.Body className="modal-img">
          <img src={request.schoolCard} alt="" />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default SuperAdminViewRequestComponent;
