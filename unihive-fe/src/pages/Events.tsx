import { useEffect, useState } from "react";
import EventComponent from "../components/EventComponent";
import NavBar from "../components/StudentNavbar";
import "../styles/events.css";
import axios from "axios";
import EventService from "../services/StudentService";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import Sidebar from "../components/sideBar";
import FooterComponent from "../components/FooterComponent";
import HomeNavbarComponent from "../components/HomeNavbarComponent";
import Student from "../models/Student";

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
    <HomeNavbarComponent loggedin={isLogged} student={student!}/> 
      <div className="event-banner">
        <h1>Events</h1>
      </div>
      <div className="hr-lines"></div>
      <div style={{display:'flex', flexDirection:'row'}}>
      <EventComponent />
      </div>
      <FooterComponent/>

    </>
  );
}

export default Event;