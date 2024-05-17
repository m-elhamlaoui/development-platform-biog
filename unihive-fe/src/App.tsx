import Login from "./auth/Login";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperAdminDashboardPage from "./pages/SuperAdminDashboardPage";
import Event from "./pages/Events";
import Contact from "./pages/ContactPage";
import About from "./pages/AboutPage";
import ForgottenPassword from "./auth/ForgottenPassword";
import Profile from "./pages/ClubProfile";
import Signup from "./auth/Signup";
import StudentProfilePage from "./pages/StudentProfilePage";
import EventPage from "./pages/EventPage";

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
          <Route path="/home" element={<HomePage />} />
          <Route path="/user/profile" element={<StudentProfilePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgottenpassword" element={<ForgottenPassword />} />
          <Route path="/events" element={<Event />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/club/:id" element={<Profile />} />
          <Route path="/events/:id" element={<EventPage/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
