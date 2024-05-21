import { useNavigate, useParams } from "react-router-dom";
import DashboardNavbarComponent from "../components/DashboardNavbarComponent";
import "../styles/DashboardPage.css";
import SuperAdminDashboardComponent from "../components/SuperAdminDashboardComponent";
import SuperAdminClubsComponent from "../components/SuperAdminClubsComponent";
import SuperAdminAdminsComponent from "../components/SuperAdminAdminsComponent";
import SuperAdminEventsComponent from "../components/SuperAdminEventsComponent";
import SuperAdminSchoolsComponent from "../components/SuperAdminSchoolsComponent";
import SuperAdminStudentsComponent from "../components/SuperAdminStudentsComponent";
import SuperAdminRequestsComponent from "../components/SuperAdminRequestsComponent";
import SuperAdminAddClubComponent from "../components/SuperAdminAddClubComponent";
import SuperAdminEditClubComponent from "../components/SuperAdminEditClubComponent";
import SuperAdminAddAdminComponent from "../components/SuperAdminAddAdminComponent";
import SuperAdminEditAdminComponent from "../components/SuperAdminEditAdminComponent";
import SuperAdminAddEventComponent from "../components/SuperAdminAddEventComponent";
import SuperAdminEditEventComponent from "../components/SuperAdminEditEventComponent";
import SuperAdminAddSchoolComponent from "../components/SuperAdminAddSchoolComponent";
import SuperAdminEditSchoolComponent from "../components/SuperAdminEditSchoolComponent";
import SuperAdminAddStudentComponent from "../components/SuperAdminAddStudentComponent";
import SuperAdminEditStudentComponent from "../components/SuperAdminEditStudentComponent";
import SuperAdminViewRequestComponent from "../components/SuperAdminViewRequestComponent";
import { isExpired } from "react-jwt";
import { useEffect } from "react";
import SuperAdminProfileComponent from "../components/SuperAdminProfileComponent";

function SuperAdminDashboardPage() {
  const { option } = useParams();
  var token: string = "";
  const navigate = useNavigate();

  if (localStorage.getItem("superadmin")) {
    token = localStorage.getItem("superadmin") as string;
  } else if (localStorage.getItem("admin")) {
    token = localStorage.getItem("admin") as string;
  } else if (localStorage.getItem("student")) {
    token = localStorage.getItem("student") as string;
  }

  const isMyTokenExpired = isExpired(token);

  useEffect(() => {
    document.title = "UniHive - Super Admin Dashboard";
    if (isMyTokenExpired) {
      if (localStorage.getItem("superadmin")) {
        localStorage.removeItem("superadmin");
      } else if (localStorage.getItem("admin")) {
        localStorage.removeItem("admin");
      } else if (localStorage.getItem("student")) {
        localStorage.removeItem("student");
      }
      navigate("/login");
    }
  }, []);

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
      {option === "addclub" && <SuperAdminAddClubComponent />}
      {option === "upclub" && <SuperAdminEditClubComponent />}
      {option === "addadmin" && <SuperAdminAddAdminComponent />}
      {option === "upadmin" && <SuperAdminEditAdminComponent />}
      {option === "addevent" && <SuperAdminAddEventComponent />}
      {option === "upevent" && <SuperAdminEditEventComponent />}
      {option === "addschool" && <SuperAdminAddSchoolComponent />}
      {option === "upschool" && <SuperAdminEditSchoolComponent />}
      {option === "addstudent" && <SuperAdminAddStudentComponent />}
      {option === "upstudent" && <SuperAdminEditStudentComponent />}
      {option === "viewrequest" && <SuperAdminViewRequestComponent />}
      {option === "profile" && <SuperAdminProfileComponent />}
    </>
  );
}

export default SuperAdminDashboardPage;
