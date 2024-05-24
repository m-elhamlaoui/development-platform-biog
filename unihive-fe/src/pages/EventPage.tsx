import { useEffect, useState } from "react";
import FooterComponent from "../components/FooterComponent";
import HomeNavbarComponent from "../components/HomeNavbarComponent";
import Student from "../models/Student";
import { isExpired } from "react-jwt";
import { useParams } from "react-router-dom";
import EventPage from "../components/EventById";
import StudentNavbar from "../components/StudentNavbar";


function EventProfile() {
  return (
  <>
    <StudentNavbar/>
    <EventPage/>
    <FooterComponent/>
</>  
);
}

export default EventProfile;