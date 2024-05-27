import { useNavigate, useParams } from "react-router-dom";
import DashboardNavbarComponent from "../components/DashboardNavbarComponent";
import "../styles/DashboardPage.css";
import SuperAdminDashboardComponent from "../components/SuperAdmin/SuperAdminDashboardComponent";
import SuperAdminClubsComponent from "../components/SuperAdmin/SuperAdminClubsComponent";
import SuperAdminAdminsComponent from "../components/SuperAdmin/SuperAdminAdminsComponent";
import SuperAdminEventsComponent from "../components/SuperAdmin/SuperAdminEventsComponent";
import SuperAdminSchoolsComponent from "../components/SuperAdmin/SuperAdminSchoolsComponent";
import SuperAdminStudentsComponent from "../components/SuperAdmin/SuperAdminStudentsComponent";
import SuperAdminRequestsComponent from "../components/SuperAdmin/SuperAdminRequestsComponent";
import SuperAdminAddClubComponent from "../components/SuperAdmin/SuperAdminAddClubComponent";
import SuperAdminEditClubComponent from "../components/SuperAdmin/SuperAdminEditClubComponent";
import SuperAdminAddAdminComponent from "../components/SuperAdmin/SuperAdminAddAdminComponent";
import SuperAdminEditAdminComponent from "../components/SuperAdmin/SuperAdminEditAdminComponent";
import SuperAdminAddEventComponent from "../components/SuperAdmin/SuperAdminAddEventComponent";
import SuperAdminEditEventComponent from "../components/SuperAdmin/SuperAdminEditEventComponent";
import SuperAdminAddSchoolComponent from "../components/SuperAdmin/SuperAdminAddSchoolComponent";
import SuperAdminEditSchoolComponent from "../components/SuperAdmin/SuperAdminEditSchoolComponent";
import SuperAdminAddStudentComponent from "../components/SuperAdmin/SuperAdminAddStudentComponent";
import SuperAdminEditStudentComponent from "../components/SuperAdmin/SuperAdminEditStudentComponent";
import SuperAdminViewRequestComponent from "../components/SuperAdmin/SuperAdminViewRequestComponent";
import { isExpired } from "react-jwt";
import { useEffect } from "react";
import SuperAdminProfileComponent from "../components/SuperAdmin/SuperAdminProfileComponent";

function SuperAdminDashboardPage() {
  const { option } = useParams();
  var token: string = "";
  const navigate = useNavigate();

  if (localStorage.getItem("superadmin")) {
    token = localStorage.getItem("superadmin") as string;
  } else if (localStorage.getItem("admin")) {
    navigate("/admin/dashboard");
  } else if (localStorage.getItem("student")) {
    navigate("/home");
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

    if (
      option !== "dashboard" &&
      option !== "admins" &&
      option !== "clubs" &&
      option !== "events" &&
      option !== "schools" &&
      option !== "students" &&
      option !== "requests" &&
      option !== "addclub" &&
      option !== "upclub" &&
      option !== "addadmin" &&
      option !== "upadmin" &&
      option !== "addevent" &&
      option !== "upevent" &&
      option !== "addschool" &&
      option !== "upschool" &&
      option !== "addstudent" &&
      option !== "upstudent" &&
      option !== "viewrequest" &&
      option !== "profile"
    ) {
      navigate("/404");
    }
  }, []);

  return (
    <>
      <DashboardNavbarComponent name="Super Admin Dashboard" />
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
