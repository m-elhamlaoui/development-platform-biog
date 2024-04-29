import {
  AcademicCapIcon,
  BuildingOfficeIcon,
  CalendarIcon,
  EllipsisHorizontalCircleIcon,
  FlagIcon,
  UserIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

import {
  AcademicCapIcon as AcademicCapIconSolid,
  BuildingOfficeIcon as BuildingOfficeIconSolid,
  CalendarIcon as CalendarIconSolid,
  EllipsisHorizontalCircleIcon as EllipsisHorizontalCircleIconSolid,
  FlagIcon as FlagIconSolid,
  UserIcon as UserIconSolid,
  Squares2X2Icon as Squares2X2IconSolid,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function DashboardSidebarComponent(props: { option: string }) {
  const dash = props.option === "dashboard";
  const admin = props.option === "admins";
  const club = props.option === "clubs" || "addclub" || "upclub/:";
  const event = props.option === "events";
  const school = props.option === "schools";
  const student = props.option === "students";
  const request = props.option === "requests";

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
    </div>
  );
}

export default DashboardSidebarComponent;
