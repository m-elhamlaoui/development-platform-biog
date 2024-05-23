import EventComponent from "../components/EventComponent";
import "../styles/events.css";

import FooterComponent from "../components/FooterComponent";
import HomeNavbarComponent from "../components/HomeNavbarComponent";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import Student from "../models/Student";
import StudentNavbar from "../components/StudentNavbar";

function Event() {
  const [isLogged, setIsLogged] = useState(false);
  const [student, setStudent] = useState<Student>();
  
  useEffect(() => {
      var token: string = "";
  
      if (localStorage.getItem("student")) {
        token = localStorage.getItem("student") as string;
      }
  
      if (token !== "") {
        setIsLogged(true);
      }
  
      const isMyTokenExpired = isExpired(token);
  
      if (isMyTokenExpired) {
        setIsLogged(false);
        if (token) {
          localStorage.removeItem("student");
          window.location.reload();
        }
      }
  }, []);
  
  return (
    <>
        <StudentNavbar/>

      <div className="event-banner">
        <h1>Events</h1>
      </div>
      <div className="hr-lines"></div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <EventComponent />
      </div>
      <FooterComponent />
    </>
  );
}

export default Event;
