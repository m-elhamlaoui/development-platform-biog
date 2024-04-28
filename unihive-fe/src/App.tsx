import Login from "./auth/Login";
import ListClubsComponent from "./components/ListClubsComponent";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperAdminDashboardPage from "./pages/SuperAdminDashboardPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path={"/superadmin/:option"}
            element={<SuperAdminDashboardPage />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/clubs" element={<ListClubsComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
