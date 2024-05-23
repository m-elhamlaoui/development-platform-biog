import { Col, Modal, Row, Table } from "react-bootstrap";
import DashboardSidebarComponent from "../AdminDashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ModelsService from "../../services/AdminModelsService";
import Request from "../../models/Request";
import { CircularSpinner } from "infinity-spinners";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import School from "../../models/School";
import { decodeToken } from "react-jwt";

function AdminRequestsComponent() {
  const [requests, setRequests] = useState<Request[]>([]);
  const [school, setSchool] = useState<School>();
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
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [requestName, setRequestName] = useState("");

  useEffect(() => {
    const decodedToken: any = decodeToken(token);
    ModelsService.School(token, decodedToken.sub)
      .then((response) => {
        setSchool(response.data);
        ModelsService.listRequests(token, response.data.id)
          .then((response) => {
            setRequests(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleShow1 = (id: string, name: string) => {
    setShow1(true);
    setRequestId(id);
    setRequestName(name);
  };
  const handleClose1 = () => setShow1(false);

  const handleShow2 = (id: string, name: string) => {
    setShow2(true);
    setRequestId(id);
    setRequestName(name);
  };
  const handleClose2 = () => setShow2(false);

  const handleReject = () => {
    setIsDisabled2(true);
    ModelsService.deleteRequest(token, requestId, school!.id)
      .then((response) => {
        console.log(response);
        handleClose1();
        setIsDisabled2(false);
        enqueueSnackbar("Request rejected successfully.", {
          variant: "success",
          autoHideDuration: 2000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
        });
        setIsLoading(true);
        ModelsService.listRequests(token, school!.id)
          .then((response) => {
            setRequests(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
        setIsDisabled2(false);
        enqueueSnackbar("Failed to reject request", {
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

  const handleAccept = () => {
    setIsDisabled1(true);
    ModelsService.acceptRequest(token, requestId, school!.id)
      .then((response) => {
        console.log(response);
        handleClose2();
        setIsDisabled1(false);
        enqueueSnackbar("Request accepted successfully.", {
          variant: "success",
          autoHideDuration: 2000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
        });
        ModelsService.listRequests(token, school!.id)
          .then((response) => {
            setRequests(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
        setIsDisabled2(false);
        enqueueSnackbar("Request to accept student", {
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

  const requestsArray = Object.values(requests);
  const requestsCount = requestsArray.length;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Request[]>(requests);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = requests.filter(
      (request) =>
        request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, requests]);

  const filteredRequests = searchTerm ? searchResults : requestsArray;

  return (
    <>
      <SnackbarProvider maxSnack={4} />
      <Row className="row2">
        <Col className="col-md-2">
          <DashboardSidebarComponent option={"requests"} />
        </Col>
        <Col className="col2">
          <div className="table-entity">
            <div className="header">
              <span style={{ fontSize: "1.5rem" }}>
                Pending Sign Up Requests
              </span>
              <span style={{ fontSize: "1.2rem" }}>
                {requestsCount} {requestsCount > 1 ? "requests" : "request"}
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
            {isLoading ? (
              <div className="no-data">
                <CircularSpinner color="#000" size={60} speed={2} weight={3} />
              </div>
            ) : requestsCount === 0 ? (
              <div className="no-data">No Data.</div>
            ) : (
              <div className="table-table">
                <Table>
                  <thead>
                    <tr>
                      <th>CNE</th>
                      <th>NUM APOGEE</th>
                      <th>FIRST NAME</th>
                      <th>LAST NAME</th>
                      <th>SCHOOL CARD</th>
                      <th>SCHOOL</th>
                      <th>EMAIL</th>
                      <th>
                        <span>VIEW/ACCEPT/REJECT</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRequests.map((request) => (
                      <tr key={request.id}>
                        <td>
                          {request.cne.length > 3
                            ? request.cne.slice(0, 3) + "..."
                            : request.cne}
                        </td>
                        <td>
                          {request.numApogee!.toString().length > 10
                            ? request.numApogee.toString().slice(0, 10) + "..."
                            : request.numApogee.toString()}
                        </td>
                        <td>
                          {request.firstName.length > 10
                            ? request.firstName.slice(0, 10) + "..."
                            : request.firstName}
                        </td>
                        <td>
                          {request.lastName.length > 9
                            ? request.lastName.slice(0, 9) + "..."
                            : request.lastName}
                        </td>
                        <td>
                          {request.schoolCard.length > 11
                            ? request.schoolCard.slice(0, 11) + "..."
                            : request.schoolCard}
                        </td>
                        <td>
                          {request.schoolName.length > 6
                            ? request.schoolName.slice(0, 6) + "..."
                            : request.schoolName}
                        </td>
                        <td>
                          {request.email.length > 5
                            ? request.email.slice(0, 5) + "..."
                            : request.email}
                        </td>
                        <td>
                          <div className="modify">
                            <button
                              className="btn btn-edit"
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/admin/viewrequest/${
                                    requests.indexOf(request) + 1
                                  }`,
                                  { state: { request } }
                                )
                              }
                            >
                              View
                            </button>
                            <button
                              className="btn btn-edit"
                              type="button"
                              onClick={() =>
                                handleShow2(
                                  request.id,
                                  request.firstName + " " + request.lastName
                                )
                              }
                            >
                              Accept
                            </button>
                            <button
                              className="btn btn-delete"
                              type="button"
                              onClick={() =>
                                handleShow1(
                                  request.id,
                                  request.firstName + " " + request.lastName
                                )
                              }
                            >
                              Reject
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
        </Col>
      </Row>
      <Modal show={show1} onHide={handleClose1} centered>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Reject Request with student name {requestName}?</Modal.Body>
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
            disabled={isDisabled2}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={show2} onHide={handleClose2} centered>
        <Modal.Header>
          <Modal.Title className="title2">Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Accept Request with student name {requestName}?</Modal.Body>
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
            disabled={isDisabled1}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminRequestsComponent;
