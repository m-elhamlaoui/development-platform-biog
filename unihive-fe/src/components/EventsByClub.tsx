import { Button, Card } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import StudentService from "../services/StudentService";
import { useEffect, useState } from "react";
import { isExpired } from "react-jwt";
import Event from "../models/Event";
import Club from "../models/Club";

function EventsByClub() {
  let { id } = useParams();
  id = id ?? "";

  const [events, setEvents] = useState<Event[]>([]);

  var token: string = "";

  const [club, setClub] = useState<Club | undefined>();
  if (localStorage.getItem("superadmin")) {
    token = localStorage.getItem("superadmin") as string;
  } else if (localStorage.getItem("admin")) {
    token = localStorage.getItem("admin") as string;
  } else if (localStorage.getItem("student")) {
    token = localStorage.getItem("student") as string;
  }

  // useEffect(() => {
  //   StudentService.getEventsByClub(token, id)
  //     .then((response) => {
  //       setEvents(response.data);
  //       console.log(response);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }, []);
  const firstEvent = events.length > 0 ? events[0] : null;

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {events.map((event) => (
          <Card
            key={event.id}
            style={{
              width: "18rem",
              marginLeft: "200px",
              marginTop: "35px",
              height: "400px",
            }}
          >
            <div
              style={{
                height: "200px",
                overflow: "hidden",
                borderRadius: "20px",
                margin: "5px",
              }}
            >
              <img
                src={event.eventBanner}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <Card.Body>
              <Card.Title>{event.eventName}</Card.Title>
              {/* <Card.Subtitle>{`From ${formatDate(
                // event.startTime
              )} to ${formatDate(event.endTime)}`}</Card.Subtitle> */}
              <Button variant="primary" style={{ bottom: "10px" }}>
                Learn More
              </Button>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
}
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

export default EventsByClub;
