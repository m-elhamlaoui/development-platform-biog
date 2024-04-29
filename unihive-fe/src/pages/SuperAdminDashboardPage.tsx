import { useParams } from "react-router-dom";
import DashboardNavbarComponent from "../components/DashboardNavbarComponent";
import "../styles/DashboardPage.css";
import SuperAdminDashboardComponent from "../components/SuperAdminDashboardComponent";
import SuperAdminClubsComponent from "../components/SuperAdminClubsComponent";
import SuperAdminAdminsComponent from "../components/SuperAdminAdminsComponent";
import SuperAdminEventsComponent from "../components/SuperAdminEventsComponent";
import SuperAdminSchoolsComponent from "../components/SuperAdminSchoolsComponent";
import SuperAdminStudentsComponent from "../components/SuperAdminStudentsComponent";
import SuperAdminRequestsComponent from "../components/SuperAdminRequestsComponent";

function SuperAdminDashboardPage() {
  const { option } = useParams();
  return (
    <>
      <DashboardNavbarComponent name="Super Admin" />
      {option === "dashboard" && <SuperAdminDashboardComponent />}
      {option === "admins" && <SuperAdminAdminsComponent />}
      {option === "clubs" && <SuperAdminClubsComponent />}
      {option === "events" && <SuperAdminEventsComponent />}
      {option === "schools" && <SuperAdminSchoolsComponent />}
      {option === "students" && <SuperAdminStudentsComponent />}
      {option === "requests" && <SuperAdminRequestsComponent />}
    </>
  );
}

export default SuperAdminDashboardPage;
