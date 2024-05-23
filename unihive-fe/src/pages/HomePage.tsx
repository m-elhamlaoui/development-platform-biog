import HomeNavbar from "../components/HomeNavbarComponent";
import Trending from "../components/TrendingComponent";
import ClubsRankings from "../components/ClubsRankingsComponent";
import EventsRankings from "../components/EventsRankingsComponent";
import UpcomingEvents from "../components/UpcomingEventsComponent";
import TryCalendar from "../components/TryCalendarComponent";
import Footer from "../components/FooterComponent";
import { decodeToken, isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import Student from "../models/Student";
import StudentService from "../services/StudentService";
import { InfinitySpin } from "react-loader-spinner";
import ClubService from "../services/ClubService";
import Club from "../models/Club";
import EventService from "../services/EventService";
import Event from "../models/Event";
import ScrollToTop from "react-scroll-to-top";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

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
              <button
                style={{
                  width: "3rem",
                  height: "3rem",
                  backgroundColor: "#46bfff",
                  borderRadius: "0.5rem",
                  border: "none",
                  boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                  cursor: "pointer",
                }}
              >
                <ArrowUpIcon width={30} height={30} color="white" />
              </button>
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
