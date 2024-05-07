import HomeNavbar from "../components/HomeNavbarComponent";
import Trending from "../components/TrendingComponent";
import ClubsRankings from "../components/ClubsRankingsComponent";
import EventsRankings from "../components/EventsRankingsComponent";
import UpcomingEvents from "../components/UpcomingEventsComponent";
import TryCalendar from "../components/TryCalendarComponent";
import Footer from "../components/FooterComponent";
import { isExpired } from "react-jwt";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  var token: string = "";
  const navigate = useNavigate();

  if (localStorage.getItem("superadmin")) {
    token = localStorage.getItem("superadmin") as string;
  } else if (localStorage.getItem("admin")) {
    token = localStorage.getItem("admin") as string;
  } else if (localStorage.getItem("student")) {
    token = localStorage.getItem("student") as string;
  }

  const isMyTokenExpired = isExpired(token);

  useEffect(() => {
    if (isMyTokenExpired) {
      if (localStorage.getItem("superadmin")) {
        localStorage.removeItem("superadmin");
      } else if (localStorage.getItem("admin")) {
        localStorage.removeItem("admin");
      } else if (localStorage.getItem("student")) {
        localStorage.removeItem("student");
      }
      navigate("/login");
    }
  }, []);
  return (
    <>
      <HomeNavbar />
      <Trending />
      <ClubsRankings />
      <UpcomingEvents />
      <EventsRankings />
      <TryCalendar />
      <Footer />
    </>
  );
}

export default HomePage;
