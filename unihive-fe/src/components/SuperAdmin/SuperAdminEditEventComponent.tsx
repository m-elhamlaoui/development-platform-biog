import { Col, Modal, Row } from "react-bootstrap";
import DashboardSidebarComponent from "../SuperAdminDashboardSidebarComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../../services/SuperAdminModelsService";
import Club from "../../models/Club";
import Event from "../../models/Event";
import { CircularSpinner } from "infinity-spinners";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

function SuperAdminEditEventComponent() {
  const { id } = useParams();
  const { state } = useLocation();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [event, setEvent] = useState<Event>(state.event);
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
        const clubsResponse = await ModelsService.listClubs(token);
        setClubs(clubsResponse.data);
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
    ModelsService.deleteEvent(token, event.id)
      .then((response) => {
        console.log(response);
        handleClose();
        enqueueSnackbar("Event deleted successfully.", {
          variant: "success",
          autoHideDuration: 1000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
          onClose: () => {
            navigate("/superadmin/events");
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setIsDisabled1(false);
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

  const handleSave = (e: any) => {
    setIsDisabled2(true);
    e.preventDefault();
    ModelsService.updateEvent(token, event.id, {
      eventName: e.target[1].value,
      eventCategory: e.target[2].value,
      eventDescription: e.target[3].value,
      eventLocation: e.target[4].value,
      eventBanner: e.target[5].value,
      eventRating: e.target[6].value,
      ratingCount: e.target[7].value,
      club: { id: e.target[8].value } as Club,
      startTime: e.target[9].value + ":00Z",
      endTime: e.target[10].value + ":00Z",
    })
      .then((response) => {
        console.log(response);
        enqueueSnackbar("Event updated successfully", {
          variant: "success",
          autoHideDuration: 1000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
          onClose: () => {
            navigate("/superadmin/events");
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setIsDisabled2(false);
        enqueueSnackbar("Failed to update event", {
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
          <DashboardSidebarComponent option={"upevent"} />
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
                    <input type="text" value={event.id} disabled />
                  </div>
                  <div className="info-row">
                    EVENT NAME
                    <input
                      type="text"
                      placeholder="event name"
                      value={event.eventName}
                      onChange={(e) => {
                        const updatedEvent: Event = {
                          ...event,
                          eventName: e.target.value,
                        };
                        setEvent(updatedEvent);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    EVENT CATEGORY
                    <input
                      type="text"
                      placeholder="event category"
                      value={event.eventCategory}
                      onChange={(e) => {
                        const updatedEvent = {
                          ...event,
                          eventCategory: e.target.value,
                        };
                        setEvent(updatedEvent);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    EVENT DESCRIPTION
                    <textarea
                      placeholder="event description"
                      value={event.eventDescription}
                      onChange={(e) => {
                        const updatedEvent = {
                          ...event,
                          eventDescription: e.target.value,
                        };
                        setEvent(updatedEvent);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    EVENT LOCATION
                    <input
                      type="text"
                      placeholder="event location"
                      value={event.eventLocation}
                      onChange={(e) => {
                        const updatedEvent = {
                          ...event,
                          eventLocation: e.target.value,
                        };
                        setEvent(updatedEvent);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    EVENT BANNER
                    <input
                      type="text"
                      placeholder="event banner"
                      value={event.eventBanner}
                      onChange={(e) => {
                        const updatedEvent = {
                          ...event,
                          eventBanner: e.target.value,
                        };
                        setEvent(updatedEvent);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    EVENT RATING
                    <input
                      type="number"
                      placeholder="club rating"
                      value={event.eventRating}
                      onChange={(e) => {
                        const updatedEvent = {
                          ...event,
                          eventRating: parseFloat(e.target.value),
                        };
                        setEvent(updatedEvent);
                      }}
                      min={0}
                      step={0.01}
                    />
                  </div>
                  <div className="info-row">
                    RATING COUNT
                    <input
                      type="number"
                      placeholder="rating count"
                      value={event.ratingCount}
                      onChange={(e) => {
                        const updatedEvent = {
                          ...event,
                          ratingCount: parseInt(e.target.value, 10),
                        };
                        setEvent(updatedEvent);
                      }}
                      min={0}
                    />
                  </div>
                  <div className="info-row">
                    CLUB
                    <select
                      name=""
                      id=""
                      value={event.club.id}
                      onChange={(e) => {
                        const updatedEvent = {
                          ...event,
                          club: { id: e.target.value },
                        };
                        setEvent(updatedEvent as Event);
                      }}
                    >
                      {clubs.map((club) => (
                        <option key={club.id} value={club.id}>
                          {club.clubName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="info-row">
                    START TIME
                    <input
                      type="datetime-local"
                      placeholder="start time"
                      value={
                        (event.startTime &&
                          new Date(event.startTime)
                            .toISOString()
                            .slice(0, -1)) ??
                        ""
                      }
                      onChange={(e) => {
                        const updatedEvent = {
                          ...event,
                          startTime: new Date(e.target.value + ":00Z"),
                        };
                        setEvent(updatedEvent);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    END TIME
                    <input
                      type="datetime-local"
                      placeholder="end time"
                      value={
                        (event.endTime &&
                          new Date(event.endTime).toISOString().slice(0, -1)) ??
                        ""
                      }
                      onChange={(e) => {
                        const updatedEvent = {
                          ...event,
                          endTime: new Date(e.target.value + ":00Z"),
                        };
                        setEvent(updatedEvent);
                      }}
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
                      onClick={() => navigate("/superadmin/events")}
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
        <Modal.Body>Delete Event with name {event.eventName}?</Modal.Body>
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

export default SuperAdminEditEventComponent;
