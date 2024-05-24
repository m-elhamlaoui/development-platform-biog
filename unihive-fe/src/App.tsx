import Login from "./auth/Login";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SuperAdminDashboardPage from "./pages/SuperAdminDashboardPage";
import Event from "./pages/Events";
import Contact from "./pages/ContactPage";
import About from "./pages/AboutPage";
import ForgottenPassword from "./auth/ForgottenPassword";
import Profile from "./pages/ClubProfile";
import Signup from "./auth/Signup";
import StudentProfilePage from "./pages/StudentProfilePage";
import CalendarPage from "./pages/CalendarPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";
import NotFoundPage from "./pages/NotFoundPage";
import EventPage from "./pages/EventPage";
import EventProfile from "./pages/EventPage";

function App() {
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
          <Route path="/club/:id" element={<Profile />} />
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
