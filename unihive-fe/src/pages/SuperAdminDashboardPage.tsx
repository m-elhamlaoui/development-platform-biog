import { useParams } from "react-router-dom";
import DashboardNavbarComponent from "../components/DashboardNavbarComponent";
import "../styles/DashboardPage.css";
import SuperAdminDashboardComponent from "../components/SuperAdminDashboardComponent";
import SuperAdminClubsComponent from "../components/SuperAdminClubsComponent";

function SuperAdminDashboardPage() {
  const { option } = useParams();
  return (
    <>
      <DashboardNavbarComponent name="Super Admin" />
      {option === "dashboard" && <SuperAdminDashboardComponent />}
      {option === "clubs" && <SuperAdminClubsComponent />}
    </>
  );
}

export default SuperAdminDashboardPage;
