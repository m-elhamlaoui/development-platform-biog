import { useEffect, useState } from "react";
import EventComponent from "../components/EventComponent";
import NavBar from "../components/StudentNavbar";
import "../styles/events.css";
import axios from "axios";
import EventService from "../services/EventService";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";

function Event() {
  const [events, setEvents] = useState<Event[]>([]);
  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    EventService.getEvents(token)
      .then((response) => {
        setEvents(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <NavBar />
      <div className="event-banner">
        <h1>Events</h1>
      </div>
      <div className="hr-lines"></div>
      <EventComponent />
    </>
  );
}

export default Event;
