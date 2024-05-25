import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { decodeToken, isExpired } from "react-jwt";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import ClubsRankings from "../components/ClubsRankingsComponent";
import EventsRankings from "../components/EventsRankingsComponent";
import Footer from "../components/FooterComponent";
import HomeNavbar from "../components/HomeNavbarComponent";
import Trending from "../components/TrendingComponent";
import TryCalendar from "../components/TryCalendarComponent";
import UpcomingEvents from "../components/UpcomingEventsComponent";
import Club from "../models/Club";
import Event from "../models/Event";
import Student from "../models/Student";
import ClubService from "../services/ClubService";
import EventService from "../services/EventService";
import StudentService from "../services/StudentService";

function HomePage() {
  const [isLogged, setIsLogged] = useState(false);
  const [student, setStudent] = useState<Student>();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "UniHive - Home";
    var token: string = "";

    if (localStorage.getItem("student")) {
      token = localStorage.getItem("student") as string;
    } else if (localStorage.getItem("admin")) {
      navigate("/admin/dashboard");
    } else if (localStorage.getItem("superadmin")) {
      navigate("/superadmin/dashboard");
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
        }
        const clubsResponse = await ClubService.getClubs();
        setClubs(clubsResponse.data);
        const eventsResponse = await EventService.getEvents();
        setEvents(eventsResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="load">
          <InfinitySpin color="#46bfff" />
        </div>
      ) : (
        <>
          <HomeNavbar loggedin={isLogged} student={student!} home />
          <Trending events={events} />
          <ClubsRankings clubs={clubs} />
          <UpcomingEvents events={events} />
          <EventsRankings events={events} />
          <TryCalendar isLogged={isLogged} />
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

export default HomePage;
