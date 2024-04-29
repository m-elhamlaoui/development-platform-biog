import { useEffect, useState } from "react";
import EventComponent from "../components/EventComponent";
import NavBar from "../components/StudentNavbar";
import "../styles/events.css";
import axios from "axios";

function Event() {

    const [events, setEvents] = useState([]);

useEffect(() => {
    loadEvents();
}, []);

const loadEvents = async () => { 
    try {
        const result = await axios.get("http://localhost:8080/student/events");
        setEvents(result.data); 
        console.log(result);
    } catch (error) {
        console.error("Error loading events:", error);
    }
};

    return ( <>
    <NavBar/>
    <div className="event-banner">
      <h1 >Events</h1>
      </div>
      <div className="hr-lines">

      </div>
      <EventComponent/>

    </> );
}

export default Event;