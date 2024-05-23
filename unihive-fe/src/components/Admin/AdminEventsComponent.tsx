import { Col, Modal, Row, Table } from "react-bootstrap";
import DashboardSidebarComponent from "../AdminDashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../../services/AdminModelsService";
import Event from "../../models/Event";
import { CircularSpinner } from "infinity-spinners";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import School from "../../models/School";

function AdminEventsComponent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [school, setSchool] = useState<School>();
  var token: string = "";
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  if (localStorage.getItem("superadmin")) {
    token = localStorage.getItem("superadmin") as string;
  } else if (localStorage.getItem("admin")) {
    token = localStorage.getItem("admin") as string;
  } else if (localStorage.getItem("student")) {
    token = localStorage.getItem("student") as string;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    const decodedToken: any = decodeToken(token);
    ModelsService.School(token, decodedToken.sub)
      .then((response) => {
        setSchool(response.data);
        ModelsService.listEvents(token, response.data.id)
          .then((response) => {
            setEvents(response.data);
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

  const handleShow = (id: string, name: string) => {
    setShow(true);
    setEventId(id);
    setEventName(name);
  };
  const handleClose = () => setShow(false);

  const handleDelete = (id: string) => {
    setIsDisabled(true);
    ModelsService.deleteEvent(token, id, school!.id)
      .then((response) => {
        console.log(response);
        handleClose();
        setIsDisabled(false);
        enqueueSnackbar("Event deleted successfully.", {
          variant: "success",
          autoHideDuration: 2000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
        });
        ModelsService.listEvents(token, school!.id)
          .then((response) => {
            setEvents(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
        setIsDisabled(false);
        enqueueSnackbar("Failed to delete event", {
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

  const eventsArray = Object.values(events);
  const eventsCount = eventsArray.length;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Event[]>(events);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = events.filter(
      (event) =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.club.clubName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, events]);

  const filteredEvents = searchTerm ? searchResults : eventsArray;

  return (
    <>
      <SnackbarProvider maxSnack={4} />
      <Row className="row2">
        <Col className="col-md-2">
          <DashboardSidebarComponent option={"events"} />
        </Col>
        <Col className="col2">
          <div className="table-entity">
            <div className="header">
              <span style={{ fontSize: "1.5rem" }}>Events Table</span>
              <span style={{ fontSize: "1.2rem" }}>
                {eventsCount} {eventsCount > 1 ? "rows" : "row"}
              </span>
            </div>
            <div className="table-bar3">
              <div>Search</div>
              <input
                type="text"
                placeholder="Event name, or club name"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {isLoading ? (
              <div className="no-data">
                <CircularSpinner color="#000" size={60} speed={2} weight={3} />
              </div>
            ) : eventsCount === 0 ? (
              <div className="no-data">No Data.</div>
            ) : (
              <div className="table-table">
                <Table>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>CATEGORY</th>
                      <th>DESCRIPTION</th>
                      <th>LOCATION</th>
                      <th>START TIME</th>
                      <th>END TIME</th>
                      <th>BANNER</th>
                      <th>RATING</th>
                      <th>CLUB</th>
                      <th>EDIT/DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((event) => (
                      <tr key={event.id}>
                        <td>
                          {event.eventName.length > 4
                            ? event.eventName.slice(0, 4) + "..."
                            : event.eventName}
                        </td>
                        <td>
                          {event.eventCategory.length > 8
                            ? event.eventCategory.slice(0, 8) + "..."
                            : event.eventCategory}
                        </td>
                        <td>
                          {event.eventDescription.length > 11
                            ? event.eventDescription.slice(0, 11) + "..."
                            : event.eventDescription}
                        </td>
                        <td>
                          {event.eventLocation.length > 8
                            ? event.eventLocation.slice(0, 8) + "..."
                            : event.eventLocation}
                        </td>
                        <td>
                          {event.startTime!.toString()?.length > 10
                            ? event.startTime?.toString()?.slice(0, 10) + "..."
                            : event.startTime?.toString() ?? ""}
                        </td>
                        <td>
                          {event.endTime!.toString()?.length > 8
                            ? event.endTime?.toString()?.slice(0, 8) + "..."
                            : event.endTime?.toString() ?? ""}
                        </td>
                        <td>
                          {event.eventBanner.length > 6
                            ? event.eventBanner.slice(0, 6) + "..."
                            : event.eventBanner}
                        </td>
                        <td>{event.eventRating}</td>
                        <td>
                          {event.club.clubName.length > 4
                            ? event.club.clubName.slice(0, 4) + "..."
                            : event.club.clubName}
                        </td>
                        <td>
                          <div className="modify">
                            <button
                              className="btn btn-edit"
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/admin/upevent/${events.indexOf(event) + 1}`,
                                  { state: { event } }
                                )
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-delete"
                              type="button"
                              onClick={() =>
                                handleShow(event.id, event.eventName)
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
            className="btn btn-add1"
            type="button"
            onClick={() => navigate("/admin/addevent")}
          >
            Add Event
          </button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete Club with name {eventName}?</Modal.Body>
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
            onClick={() => handleDelete(eventId)}
            disabled={isDisabled}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminEventsComponent;
