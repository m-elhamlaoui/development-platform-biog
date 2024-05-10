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

function Event() {
  
  return (
    <>
      <NavBar />
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