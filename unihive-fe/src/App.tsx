import Login from "./auth/Login";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperAdminDashboardPage from "./pages/SuperAdminDashboardPage";
import Event from "./pages/Events";
import Contact from "./pages/ContactPage";
import About from "./pages/AboutPage";
import EventComponent from "./components/EventComponent";

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
          <Route path="/login" element={<Login />} />
          <Route path="/events" element={<Event />} />
          <Route path="/About" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
