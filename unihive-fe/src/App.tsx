import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ForgottenPassword from "./auth/ForgottenPassword";
import Login from "./auth/Login";
import About from "./pages/AboutPage";
import Contact from "./pages/ContactPage";
import Event from "./pages/Events";
import HomePage from "./pages/HomePage";
import SuperAdminDashboardPage from "./pages/SuperAdminDashboardPage";
// import Profile from "./pages/ClubProfile";
import Signup from "./auth/Signup";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import CalendarPage from "./pages/CalendarPage";
import {
  default as EventPage,
  default as EventProfile,
} from "./pages/EventPage";
import NotFoundPage from "./pages/NotFoundPage";
import StudentProfilePage from "./pages/StudentProfilePage";

function App() {
  function updateAdaptiveStyles(): void {
    const rootFontSize: number = parseFloat(
      getComputedStyle(document.documentElement).fontSize
    );
    const viewportWidth: number = window.innerWidth;
    const viewportHeight: number = window.innerHeight;

    const remToVw: number = rootFontSize * (100 / viewportWidth);
    const remToVh: number = rootFontSize * (100 / viewportHeight);

    document.documentElement.style.setProperty("--rem-to-vw", `${remToVw}vw`);
    document.documentElement.style.setProperty("--rem-to-vh", `${remToVh}vh`);
  }

  window.addEventListener("resize", updateAdaptiveStyles);
  updateAdaptiveStyles();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/superadmin/:option"}
            element={<SuperAdminDashboardPage />}
          />
          <Route
            path={"/superadmin/:option/:id"}
            element={<SuperAdminDashboardPage />}
          />
          <Route path="/admin/:option" element={<AdminDashboardPage />} />
          <Route path="/admin/:option/:id" element={<AdminDashboardPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/user/:option" element={<StudentProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgottenpassword" element={<ForgottenPassword />} />
          <Route path="/events" element={<Event />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          {/* <Route path="/club/:id" element={<Profile />} /> */}
          <Route path="/calendar" element={<CalendarPage />} />
          <Route path="/404" element={<NotFoundPage />}></Route>
          <Route path="*" element={<Navigate to="/404" />}></Route>
          <Route path="/events/:id" element={<EventProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
