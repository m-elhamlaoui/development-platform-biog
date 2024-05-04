import HomeNavbar from "../components/HomeNavbarComponent";
import Trending from "../components/TrendingComponent";
import Rankings from "../components/RankingsComponent";
import UpcomingEvents from "../components/UpcomingEventsComponent";

function HomePage() {
  return (
    <>
      <HomeNavbar />
      <Trending />
      <Rankings />
      <UpcomingEvents />
    </>
  );
}

export default HomePage;
