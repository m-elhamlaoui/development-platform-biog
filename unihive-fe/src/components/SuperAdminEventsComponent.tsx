import { Col, Modal, Row, Table } from "react-bootstrap";
import DashboardSidebarComponent from "../components/DashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/SuperAdminModelsService";
import Event from "../models/Event";

function SuperAdminEventsComponent() {
  const [events, setEvents] = useState<Event[]>([]);
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
  const [eventId, setEventId] = useState("");
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    ModelsService.listEvents(token)
      .then((response) => {
        setEvents(response.data);
        setIsLoading(false);
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
    ModelsService.deleteEvent(token, id)
      .then((response) => {
        console.log(response);
        handleClose();
        ModelsService.listEvents(token)
          .then((response) => {
            setEvents(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
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
              <div className="no-data">Loading...</div>
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
                                  `/superadmin/upevent/${
                                    events.indexOf(event) + 1
                                  }`,
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
            onClick={() => navigate("/superadmin/addevent")}
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
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SuperAdminEventsComponent;
