import { decodeToken, isExpired } from "react-jwt";
import HomeNavbar from "../components/HomeNavbarComponent";
import StudentService from "../services/StudentService";
import { useEffect, useState } from "react";
import Student from "../models/Student";
import Footer from "../components/FooterComponent";
import ScrollToTop from "react-scroll-to-top";
import {
  ArrowUpIcon,
  ClockIcon,
  MapPinIcon,
  PowerIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { InfinitySpin } from "react-loader-spinner";
import PageTitleComponent from "../components/PageTitleComponent";
import logo1 from "../assets/uh-logo.png";
import logo2 from "../assets/gc-logo.png";
import x from "../assets/collab-x.png";
import { FcGoogle } from "react-icons/fc";
import AuthService from "../services/AuthService";
import CalendarService from "../services/CalendarService";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EventRequest from "../models/EventRequest";
import { Month } from "../models/Month";
import { event } from "jquery";
import Event from "../models/Event";

function CalendarPage() {
  const [isLogged, setIsLogged] = useState(false);
  const [student, setStudent] = useState<Student>();
  const [eventRequest, setEventRequest] = useState<EventRequest>();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [isDisabled2, setIsDisabled2] = useState(false);
  const [isDisabled3, setIsDisabled3] = useState(false);
  const [isDisabled4, setIsDisabled4] = useState(false);
  const [isDisabled5, setIsDisabled5] = useState(false);
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const currentWindow = window.location;
  const [selectedCard, setSelectedCard] = useState<number>(-1);
  const [selectedEvent, setSelectedEvent] = useState<EventRequest>();
  const [isAdding, setIsAdding] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [newDescription, setNewDescription] = useState("");
  const [selectedEventId, setSelectedEventId] = useState<string>("");

  const handleAdding = () => {
    if (isAdding === false) {
      setIsAdding(true);
      setIsDisabled3(true);
      setSelectedCard(-1);
      setSelectedEvent(undefined);
    } else {
      setIsDisabled3(false);
    }
  };

  const handleCardClick = (index: number) => {
    if (selectedCard === index) {
      setSelectedCard(-1);
      setSelectedEvent(undefined);
    } else {
      setSelectedCard(index);
      setSelectedEvent(Events[index]);
      setDescription(Events[index].description);
      setIsAdding(false);
      setIsDisabled3(false);
    }
  };

  const handleEdit = () => {
    if (isEditing === false) {
      setIsEditing(true);
      setIsDisabled(false);
    } else {
      setIsDisabled2(true);
      CalendarService.updateDescription(
        localStorage.getItem("student") as string,
        student!.id,
        selectedEvent!.id,
        description
      ).then(
        (response) => {
          console.log(response.data);
          setIsEditing(false);
          setIsDisabled(true);
          setIsDisabled2(false);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  useEffect(() => {
    document.title = "UniHive - Calendar";
    var token: string = "";

    if (localStorage.getItem("student")) {
      token = localStorage.getItem("student") as string;
    } else {
      navigate("/home");
    }

    if (token !== "") {
      setIsLogged(true);
    }

    const isMyTokenExpired = isExpired(token);

    if (isMyTokenExpired) {
      setIsLogged(false);
      if (token) {
        localStorage.removeItem("student");
        navigate("/home");
      }
    }

    const decodedToken: any = decodeToken(token);
    console.log(decodedToken);

    const fetchData = async () => {
      try {
        if (!isMyTokenExpired) {
          const studentResponse = await StudentService.getStudent(
            token,
            decodedToken.sub
          );
          setStudent(studentResponse.data);
          CalendarService.getCalendar(token, studentResponse.data.id)
            .then((response) => {
              console.log(response.data);
              setIsAuthorized(true);
              CalendarService.getEvents(token, studentResponse.data.id).then(
                (response) => {
                  console.log(response.data);
                  setEventRequest(response.data);
                  setIsLoading(false);
                },
                (error) => {
                  console.error(error);
                }
              );
            })
            .catch(() => {
              setIsAuthorized(false);
              setIsLoading(false);
            });
          const eventsResponse = await StudentService.getEvents(token);
          setEvents(eventsResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const openAuthWindow = (url: string) => {
    return new Promise<string>((resolve, reject) => {
      const width = 600;
      const height = 600;
      const left = window.innerWidth / 2 - width / 2;
      const top = window.innerHeight / 2 - height / 2;

      const authWindow = window.open(
        url,
        "Google Calendar Authorization",
        `width=${width},height=${height},top=${top},left=${left}`
      );

      const messageListener = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) {
          return;
        }

        if (event.data.type === "oauth2callback" && event.data.url) {
          window.removeEventListener("message", messageListener);
          if (authWindow) {
            authWindow.close();
          }
          resolve(event.data.url);
        }
      };

      window.addEventListener("message", messageListener);

      const popupTick = setInterval(() => {
        if (!authWindow || authWindow.closed !== false) {
          clearInterval(popupTick);
          window.removeEventListener("message", messageListener);
          currentWindow.reload();
          reject(new Error("Popup was closed by user"));
        }
      }, 1000);
    });
  };

  const handleAuthClick = async () => {
    try {
      const response = await AuthService.googleCalendarAuth(student!.id);
      openAuthWindow(response.data);
    } catch (error) {
      console.error("Authorization Error:", error);
    }
  };

  function handleLogout() {
    CalendarService.logout(
      localStorage.getItem("student") as string,
      student!.id
    ).then(
      (response) => {
        console.log(response.data);
        window.location.reload();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  const handleSave = async () => {
    setIsDisabled4(true);
    if (selectedEventId === "") {
      const selectedEvent2 = Events2.find(
        (event) => event.id === Events2[0].id
      );
      CalendarService.addEvent(
        localStorage.getItem("student") as string,
        student!.id,
        {
          title: "UniHive:" + selectedEvent2?.eventName,
          description: newDescription === "" ? "None" : newDescription,
          startTime: selectedEvent2?.startTime?.toString(),
          endTime: selectedEvent2?.endTime?.toString(),
          location: selectedEvent2?.eventLocation,
          reminder: "True",
          color: "7",
        }
      ).then(
        (response) => {
          console.log(response.data);
          setIsAdding(false);
          setIsDisabled3(false);
          setIsDisabled4(false);
          handleAdding();
          CalendarService.getEvents(
            localStorage.getItem("student") as string,
            student!.id
          ).then(
            (response) => {
              console.log(response.data);
              setSelectedEvent(undefined);
              setEventRequest(response.data);
              Events = Object.values(eventRequest ?? {});
              Events.sort((a, b) => {
                return (
                  new Date(a.startTime ?? new Date()).getTime() -
                  new Date(b.startTime ?? new Date()).getTime()
                );
              });
            },
            (error) => {
              console.error(error);
            }
          );
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      const selectedEvent2 = Events2.find(
        (event) => event.id === selectedEventId
      );

      CalendarService.addEvent(
        localStorage.getItem("student") as string,
        student!.id,
        {
          title: selectedEvent2?.eventName,
          description: newDescription === "" ? "None" : newDescription,
          startTime: selectedEvent2?.startTime?.toString(),
          endTime: selectedEvent2?.endTime?.toString(),
          location: selectedEvent2?.eventLocation,
          reminder: "True",
          color: "7",
        }
      ).then(
        (response) => {
          console.log(response.data);
          setIsAdding(false);
          setIsDisabled3(false);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  const handleDelete = () => {
    setIsDisabled5(true);
    CalendarService.deleteEvent(
      localStorage.getItem("student") as string,
      student!.id,
      selectedEvent!.id
    ).then(
      (response) => {
        console.log(response.data);
        CalendarService.getEvents(
          localStorage.getItem("student") as string,
          student!.id
        ).then(
          (response) => {
            console.log(response.data);
            setSelectedEvent(undefined);
            setEventRequest(response.data);
            Events = Object.values(eventRequest ?? {});
            Events.sort((a, b) => {
              return (
                new Date(a.startTime ?? new Date()).getTime() -
                new Date(b.startTime ?? new Date()).getTime()
              );
            });
            setIsDisabled5(false);
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  };

  var Events = Object.values(eventRequest ?? {});
  const Events2 = Object.values(events ?? {}).filter(
    (event) => !Events.map((event2) => event2.title).includes(event.eventName)
  );
  Events.sort((a, b) => {
    return (
      new Date(a.startTime ?? new Date()).getTime() -
      new Date(b.startTime ?? new Date()).getTime()
    );
  });
  Events2.sort((a, b) => {
    return (
      new Date(a.startTime ?? new Date()).getTime() -
      new Date(b.startTime ?? new Date()).getTime()
    );
  });
  const MonthsArray = Object.values(Month);

  return (
    <>
      {isLoading ? (
        <div className="load">
          <InfinitySpin color="#46bfff" />
        </div>
      ) : (
        <>
          <HomeNavbar loggedin={isLogged} student={student!} />
          {isAuthorized ? (
            <>
              <PageTitleComponent title="MY CALENDAR" />
              <div className="container-fluid calendar2">
                <div className="calendar-body">
                  <Row className="cal-body">
                    <Col className="cal-cards">
                      <div className="calendar-cards">
                        <div className="calendar-cards-header">
                          <span>Upcoming events</span>
                          <div>
                            <button
                              className="btn btn-primary add-event-btn"
                              onClick={() => {
                                Events2.length != 0 && handleAdding();
                              }}
                              disabled={isDisabled3}
                            >
                              Add event
                            </button>
                            <button
                              className="btn btn-primary logout-btn"
                              onClick={handleLogout}
                            >
                              <PowerIcon width={20} height={20} />
                            </button>
                          </div>
                        </div>
                        <div className="calendar-cards-separator"></div>
                        <div className="calendar-cards-body">
                          {Events.map((event, index) => (
                            <div
                              key={index}
                              className={`calendar-cards-body-item ${
                                selectedCard === index ? "selected" : ""
                              }`}
                              onClick={() => handleCardClick(index)}
                            >
                              <div className="calendar-cards-body-item-date">
                                <span className="num">
                                  {new Date(event.startTime ?? new Date())
                                    .getDate()
                                    .toString()
                                    .padStart(2, "0")}
                                </span>
                                <span className="mon">
                                  {new Date(
                                    event.startTime ?? new Date()
                                  ).toLocaleString("default", {
                                    month: "short",
                                  })}
                                </span>
                              </div>
                              <div
                                className="calendar-cards-body-item-separator"
                                style={
                                  selectedCard === index
                                    ? { backgroundColor: "white" }
                                    : { backgroundColor: "black" }
                                }
                              ></div>
                              <div className="calendar-cards-body-item-desc">
                                <span className="title">
                                  {event.title.length > 48
                                    ? event.title.slice(0, 45) + "..."
                                    : event.title}
                                </span>
                                <div className="date">
                                  <span>
                                    {(() => {
                                      const startDate = new Date(
                                        event.startTime ?? new Date()
                                      );
                                      const endDate = new Date(
                                        event.endTime ?? new Date()
                                      );
                                      if (
                                        startDate.getUTCDate() ===
                                          endDate.getUTCDate() &&
                                        startDate.getUTCMonth() ===
                                          endDate.getUTCMonth() &&
                                        startDate.getUTCFullYear() ===
                                          endDate.getUTCFullYear()
                                      ) {
                                        const day = startDate.getUTCDate();
                                        let daySuffix;
                                        if (
                                          day === 1 ||
                                          day === 21 ||
                                          day === 31
                                        ) {
                                          daySuffix = "st";
                                        } else if (day === 2 || day === 22) {
                                          daySuffix = "nd";
                                        } else if (day === 3 || day === 23) {
                                          daySuffix = "rd";
                                        } else {
                                          daySuffix = "th";
                                        }
                                        return (
                                          <span>
                                            {
                                              MonthsArray[
                                                startDate.getUTCMonth()
                                              ]
                                            }{" "}
                                            {startDate.getUTCDate()}
                                            {daySuffix}{" "}
                                            {startDate.getUTCFullYear()}
                                          </span>
                                        );
                                      }
                                      return (
                                        <span>
                                          From{" "}
                                          {startDate
                                            .getUTCDate()
                                            .toString()
                                            .padStart(2, "0")}{" "}
                                          {MonthsArray[startDate.getUTCMonth()]}{" "}
                                          {startDate.getUTCFullYear()} To{" "}
                                          {endDate
                                            .getUTCDate()
                                            .toString()
                                            .padStart(2, "0")}{" "}
                                          {MonthsArray[endDate.getUTCMonth()]}{" "}
                                          {endDate.getUTCFullYear()}
                                        </span>
                                      );
                                    })()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </Col>
                    <Col className="cal-sep"></Col>
                    <Col className="cal-details">
                      {!isAdding ? (
                        selectedEvent === undefined ? (
                          <div className="nothing-here">No event selected</div>
                        ) : (
                          <div className="calendar-event">
                            <div className="calendar-event-title">
                              {selectedEvent!.title}
                            </div>
                            <div className="calendar-event-details">
                              <span>
                                <ClockIcon
                                  width={20}
                                  height={20}
                                  color="#46bfff"
                                  style={{
                                    marginRight: "0.3rem",
                                    transform: "translateY(-0.1rem)",
                                  }}
                                />
                                {new Date(
                                  selectedEvent!.startTime ?? new Date()
                                ).toLocaleString("default", {
                                  month: "long",
                                  day: "numeric",
                                })}
                                {(() => {
                                  if (
                                    new Date(
                                      selectedEvent!.startTime ?? new Date()
                                    ).getDate() === 1
                                  )
                                    return "st";
                                  else if (
                                    new Date(
                                      selectedEvent!.startTime ?? new Date()
                                    ).getDate() === 2
                                  )
                                    return "nd";
                                  else if (
                                    new Date(
                                      selectedEvent!.startTime ?? new Date()
                                    ).getDate() === 3
                                  )
                                    return "rd";
                                  else return "th";
                                })()}{" "}
                                -{" "}
                                {new Date(
                                  selectedEvent!.startTime ?? new Date()
                                ).toLocaleTimeString("default", {
                                  hour: "numeric",
                                  minute: "numeric",
                                })}
                              </span>
                              <div
                                style={{
                                  display: "flex",
                                }}
                              >
                                <span>
                                  <MapPinIcon
                                    width={20}
                                    height={20}
                                    color="#46bfff"
                                    style={{
                                      marginRight: "0.3rem",
                                      transform: "translateY(-0.1rem)",
                                    }}
                                  />
                                </span>
                                <span>{selectedEvent!.location}</span>
                              </div>
                            </div>
                            <div className="calendar-cards-separator"></div>
                            <div className="calendar-event-see">
                              <span>Event Details</span>
                              <button
                                className="btn btn-primary see-calendar-event-btn"
                                type="button"
                              >
                                See Event
                              </button>
                            </div>
                            <div className="calendar-event-desc">
                              <div className="my-desc">
                                <span>My description</span>
                                <button
                                  className="btn btn-primary add-event-btn"
                                  onClick={handleEdit}
                                  disabled={isDisabled2}
                                >
                                  {isEditing ? "Save" : "Edit"}
                                </button>
                              </div>
                              <textarea
                                className="desc"
                                value={description}
                                onChange={(e) => {
                                  setDescription(e.target.value);
                                }}
                                disabled={isDisabled}
                              />
                            </div>
                            <div className="delete-event">
                              <button
                                className="btn bnt-primary delete-event-btn"
                                onClick={handleDelete}
                                disabled={isDisabled5}
                              >
                                <TrashIcon width={20} height={20} color="red" />
                              </button>
                            </div>
                          </div>
                        )
                      ) : (
                        <div className="calendar-addevent">
                          <span>Add event</span>
                          <div className="event-fields">
                            <div className="event-field">
                              <label>Event</label>
                              <select
                                name=""
                                id=""
                                onChange={(e) => {
                                  setSelectedEventId(e.target.value);
                                }}
                              >
                                {Events2.map((event) => (
                                  <option key={event.id} value={event.id}>
                                    {event.eventName}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="event-field">
                              <label>Description</label>
                              <textarea
                                value={newDescription}
                                onChange={(e) => {
                                  setNewDescription(e.target.value);
                                }}
                              />
                            </div>
                            <button
                              className="btn btn-primary add-event-save-btn"
                              type="button"
                              onClick={handleSave}
                              disabled={isDisabled4}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      )}
                    </Col>
                  </Row>
                </div>
              </div>
            </>
          ) : (
            <div className="container-fluid calendar">
              <div className="google-auth">
                <div className="google-auth-imgs">
                  <img src={logo1} alt="UniHive" width={100} />
                  <img src={x} alt="Logo 2" width={20} />
                  <img src={logo2} alt="Google Calendar" width={50} />
                </div>
                <div className="google-auth-desc">
                  Connect your Google Calendar <br /> to UniHive to get a
                  personalized experience
                </div>
                <button
                  className="btn btn-primary google-auth-btn"
                  onClick={handleAuthClick}
                >
                  <FcGoogle
                    style={{
                      width: "1.5rem",
                      height: "1.5rem",
                      marginRight: "0.5rem",
                    }}
                  />
                  Connect Google Calendar
                </button>
              </div>
              <div className="calendar-img2"></div>
            </div>
          )}
          <Footer />
          <ScrollToTop
            smooth
            component={
              <div
                style={{
                  width: "3rem",
                  height: "3rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#46bfff",
                  borderRadius: "0.5rem",
                  border: "none",
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                }}
              >
                <ArrowUpIcon width={30} height={30} color="white" />
              </div>
            }
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "3rem",
              height: "3rem",
              padding: "0",
              borderRadius: "0.5rem",
            }}
          />
        </>
      )}
    </>
  );
}

export default CalendarPage;
