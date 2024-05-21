import {
  AcademicCapIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  EllipsisHorizontalCircleIcon,
  FlagIcon,
  UserIcon,
  Squares2X2Icon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";

import {
  AcademicCapIcon as AcademicCapIconSolid,
  BuildingOfficeIcon as BuildingOfficeIconSolid,
  CalendarIcon as CalendarIconSolid,
  EllipsisHorizontalCircleIcon as EllipsisHorizontalCircleIconSolid,
  FlagIcon as FlagIconSolid,
  UserIcon as UserIconSolid,
  Squares2X2Icon as Squares2X2IconSolid,
  UserCircleIcon as UserCircleIconSolid,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function DashboardSidebarComponent(props: { option: string }) {
  const dash = props.option === "dashboard";
  const admin =
    props.option === "admins" ||
    props.option === "addadmin" ||
    props.option === "upadmin";
  const club =
    props.option === "clubs" ||
    props.option === "addclub" ||
    props.option === "upclub";
  const event =
    props.option === "events" ||
    props.option === "addevent" ||
    props.option === "upevent";
  const school =
    props.option === "schools" ||
    props.option === "addschool" ||
    props.option === "upschool";
  const student =
    props.option === "students" ||
    props.option === "addstudent" ||
    props.option === "upstudent";
  const request = props.option === "requests" || props.option === "viewrequest";
  const profile = props.option === "profile";

  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <button
        className={"btn btn-pr" + (dash ? "-active" : "") + " sidebar-item"}
        onClick={() => navigate("/superadmin/dashboard")}
        type="button"
      >
        {dash ? (
          <Squares2X2IconSolid
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        ) : (
          <Squares2X2Icon
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        )}
        <span>Dashboard</span>
      </button>
      <button
        className={"btn btn-pr" + (admin ? "-active" : "") + " sidebar-item"}
        onClick={() => navigate("/superadmin/admins")}
        type="button"
      >
        {admin ? (
          <UserIconSolid
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        ) : (
          <UserIcon
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        )}
        <span>Admins</span>
      </button>
      <button
        className={"btn btn-pr" + (club ? "-active" : "") + " sidebar-item"}
        onClick={() => navigate("/superadmin/clubs")}
        type="button"
      >
        {club ? (
          <FlagIconSolid
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        ) : (
          <FlagIcon
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        )}
        <span>Clubs</span>
      </button>
      <button
        className={"btn btn-pr" + (event ? "-active" : "") + " sidebar-item"}
        onClick={() => navigate("/superadmin/events")}
        type="button"
      >
        {event ? (
          <CalendarIconSolid
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        ) : (
          <CalendarIcon
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        )}
        <span>Events</span>
      </button>
      <button
        className={"btn btn-pr" + (school ? "-active" : "") + " sidebar-item"}
        onClick={() => navigate("/superadmin/schools")}
        type="button"
      >
        {school ? (
          <BuildingOfficeIconSolid
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        ) : (
          <BuildingOfficeIcon
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        )}
        <span>Schools</span>
      </button>
      <button
        className={"btn btn-pr" + (student ? "-active" : "") + " sidebar-item"}
        onClick={() => navigate("/superadmin/students")}
        type="button"
      >
        {student ? (
          <AcademicCapIconSolid
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        ) : (
          <AcademicCapIcon
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        )}
        <span>Students</span>
      </button>
      <button
        className={"btn btn-pr" + (request ? "-active" : "") + " sidebar-item"}
        onClick={() => navigate("/superadmin/requests")}
        type="button"
      >
        {request ? (
          <EllipsisHorizontalCircleIconSolid
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        ) : (
          <EllipsisHorizontalCircleIcon
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        )}
        <span>Sign Up Requests</span>
      </button>
      <button
        className={"btn btn-pr" + (profile ? "-active" : "") + " sidebar-item"}
        onClick={() => navigate("/superadmin/profile")}
        type="button"
        style={{
          position: "absolute",
          bottom: "0",
          width: "88%",
        }}
      >
        {profile ? (
          <UserCircleIconSolid
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        ) : (
          <UserCircleIcon
            style={{
              width: "22px",
              height: "22px",
              marginBottom: "2px",
            }}
          />
        )}
        <span>Profile</span>
      </button>
    </div>
  );
}

export default DashboardSidebarComponent;
