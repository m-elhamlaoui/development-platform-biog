import React, { useEffect, useState } from "react";
import { decodeToken, isExpired } from "react-jwt";
import { useParams } from "react-router-dom";
import Student from "../models/Event";
import StudentService from "../services/StudentService";
import EventTime from "./EventTime";
import Button from "react-bootstrap/Button";
import UserRating from "./Rating";
import CalendarService from "../services/CalendarService";
import { enqueueSnackbar } from "notistack";

function EventPage() {
  const { id } = useParams();
  const [event, setEvent] = useState<Student>();
  const [newDescription, setNewDescription] = useState("");
  const [isDisabled3, setIsDisabled3] = useState(false);
  const [isDisabled4, setIsDisabled4] = useState(false);
  const [student, setStudent] = useState<Student>();
  const [token, setToken] = useState("");

  useEffect(() => {
    const token =
      localStorage.getItem("superadmin") ||
      localStorage.getItem("admin") ||
      localStorage.getItem("student") ||
      "";
    setToken(token);
  }, []);

  useEffect(() => {
    if (id && token) {
      StudentService.getEvent(token, id)
        .then((response) => {
          setEvent(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id, token]);

  useEffect(() => {
    const decodedToken: any = decodeToken(token);
    console.log(decodedToken);
    const fetchData = async () => {
      try {
        if (!isExpired(token)) {
          const studentResponse = await StudentService.getStudent(
            token,
            decodedToken.sub
          );
          setStudent(studentResponse.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const handleAdd = async () => {
    if (event && student) {
      CalendarService.addEvent(token, student.id, {
        title: "UniHive:" + event?.eventName,
        startTime: event?.startTime?.toString().slice(0, -1) + "+01:00",
        endTime: event?.startTime?.toString().slice(0, -1) + "+01:00",
        location: event?.eventLocation,
        reminder: "True",
        color: "7",
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log("error adding event");
        });
    }
  };

  return (
    <div className="container" style={{ width: "700px", marginLeft: "300px" }}>
      {event && (
        <>
          <div
            style={{
              position: "relative",
              height: "290px",
              borderRadius: "20px",
            }}
          >
            {event.eventBanner && (
              <img
                src={event.eventBanner}
                className="background-image"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "fill",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  borderRadius: "20px",
                }}
                alt="Event Banner"
              />
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              borderBottom: "1px solid grey",
              paddingBottom: "50px",
            }}
          >
            <div>
              <div style={{ fontSize: "20px", color: "#13a6ec" }}>
                {event.eventCategory}
              </div>
              <div style={{ fontSize: "30px", width: "400px" }}>
                {event.eventName}
              </div>
            </div>
            <div className="col" style={{ marginRight: "0px" }}>
              <button className="club" type="button">
                <img
                  width="20%"
                  src={event.club?.clubLogo || ""}
                  alt="club logo"
                />
                <span>{event.club?.clubName || ""}</span>
              </button>
            </div>
          </div>
          <div
            style={{ display: "flex", flexDirection: "row", height: "400px" }}
          >
            <div style={{ borderRight: "1px solid grey", width: "500px" }}>
              <div style={{ height: "200px", marginRight: "30px" }}>
                <EventTime
                  startTime={event.startTime}
                  endTime={event.endTime}
                />
                <Button
                  variant="primary"
                  style={{ bottom: "10px", marginTop: "10px" }}
                  onClick={handleAdd}
                  disabled={isDisabled3}
                >
                  Add to calendar
                </Button>
                <div className="rating">{/* <UserRating  /> */}</div>
              </div>
            </div>
            <div style={{ marginTop: "20px", marginLeft: "20px" }}>
              <div style={{ fontSize: "22px", fontWeight: "bold" }}>
                Description
              </div>
              <div>{event.eventDescription || ""}</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default EventPage;
