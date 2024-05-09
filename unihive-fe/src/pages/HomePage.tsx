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

function HomePage() {
  const [isLogged, setIsLogged] = useState(false);
  const [student, setStudent] = useState<Student>();
  const [clubs, setClubs] = useState<Club[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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
    }

    const decodedToken: any = decodeToken(token);
    console.log(decodedToken);

    const fetchData = async () => {
      try {
        const studentResponse = await StudentService.getStudent(
          token,
          decodedToken.sub
        );
        setStudent(studentResponse.data);
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
          <HomeNavbar loggedin={isLogged} student={student!} />
          <Trending events={events} />
          <ClubsRankings clubs={clubs} />
          <UpcomingEvents />
          <EventsRankings />
          <TryCalendar />
          <Footer />
        </>
      )}
    </>
  );
}

export default HomePage;
