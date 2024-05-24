import { useNavigate, useParams } from "react-router-dom";
import DashboardNavbarComponent from "../components/DashboardNavbarComponent";
import "../styles/DashboardPage.css";
import AdminDashboardComponent from "../components/Admin/AdminDashboardComponent";
import AdminClubsComponent from "../components/Admin/AdminClubsComponent";
import AdminEventsComponent from "../components/Admin/AdminEventsComponent";
import AdminStudentsComponent from "../components/Admin/AdminStudentsComponent";
import AdminRequestsComponent from "../components/Admin/AdminRequestsComponent";
import AdminAddClubComponent from "../components/Admin/AdminAddClubComponent";
import AdminEditClubComponent from "../components/Admin/AdminEditClubComponent";
import AdminAddEventComponent from "../components/Admin/AdminAddEventComponent";
import AdminEditEventComponent from "../components/Admin/AdminEditEventComponent";
import AdminAddStudentComponent from "../components/Admin/AdminAddStudentComponent";
import AdminEditStudentComponent from "../components/Admin/AdminEditStudentComponent";
import AdminViewRequestComponent from "../components/Admin/AdminViewRequestComponent";
import { decodeToken, isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import AdminProfileComponent from "../components/Admin/AdminProfileComponent";
import School from "../models/School";
import ModelsService from "../services/AdminModelsService";
import { InfinitySpin } from "react-loader-spinner";

function AdminDashboardPage() {
  const { option } = useParams();
  var token: string = "";
  const navigate = useNavigate();
  const [school, setSchool] = useState<School>();
  const [isLoading, setIsLoading] = useState(true);

  if (localStorage.getItem("superadmin")) {
    navigate("/superadmin/dashboard");
  } else if (localStorage.getItem("admin")) {
    token = localStorage.getItem("admin") as string;
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

    const decodedToken: any = decodeToken(token);
    ModelsService.School(token, decodedToken.sub)
      .then((response) => {
        setSchool(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="load">
          <InfinitySpin color="#46bfff" />
        </div>
      ) : (
        <>
          <DashboardNavbarComponent
            name={"Admin Dashboard - " + school!.schoolName}
          />
          {option === "dashboard" && <AdminDashboardComponent />}
          {option === "clubs" && <AdminClubsComponent />}
          {option === "events" && <AdminEventsComponent />}
          {option === "students" && <AdminStudentsComponent />}
          {option === "requests" && <AdminRequestsComponent />}
          {option === "addclub" && <AdminAddClubComponent />}
          {option === "upclub" && <AdminEditClubComponent />}
          {option === "addevent" && <AdminAddEventComponent />}
          {option === "upevent" && <AdminEditEventComponent />}
          {option === "addstudent" && <AdminAddStudentComponent />}
          {option === "upstudent" && <AdminEditStudentComponent />}
          {option === "viewrequest" && <AdminViewRequestComponent />}
          {option === "profile" && <AdminProfileComponent />}
        </>
      )}
    </>
  );
}

export default AdminDashboardPage;
