import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Dropdown } from "react-bootstrap";
import AuthService from "../services/AuthService";
import Student from "../models/Student";

function HomeNavbarComponent(props: {
  loggedin: boolean;
  student: Student | null;
  home?: boolean | false;
  about?: boolean | false;
  contact?: boolean | false;
  events?: boolean | false;
}) {
  const navigate = useNavigate();
  const student = props.student;

  function logout() {
    AuthService.logout();
    window.location.reload();
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="/home">
          <img
            src="https://storage.googleapis.com/unihive-files/uh-logo.png"
            alt="UniHive Logo"
            width="80%"
          />
        </a>
        <div className="navbar-nav">
          <a
            className={"nav-link" + (props.home ? " active" : "")}
            aria-current="page"
            href="/home"
            style={{ cursor: "pointer" }}
          >
            Home
          </a>
          <a className={"nav-link" + (props.events ? " active" : "")} href="#">
            Events
          </a>
          <a
            className={"nav-link" + (props.contact ? " active" : "")}
            href="/contact"
          >
            Contact
          </a>
          <a
            className={"nav-link me-md-3" + (props.about ? " active" : "")}
            href="#"
          >
            About
          </a>
          <div className="d-grid gap-4 d-md-block">
            {props.loggedin ? (
              <Dropdown>
                <Dropdown.Toggle
                  className="profile-dropdown"
                  id="dropdown-basic"
                >
                  <div className="profile-pic-small">
                    <img src={student?.profileImage} alt="" />
                  </div>
                  <span>{student?.firstName}</span>
                  <ChevronDownIcon
                    style={{
                      width: "20px",
                      height: "20px",
                      strokeWidth: "2.5",
                      marginRight: "0.5rem",
                    }}
                  />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="/user/profile">Profile</Dropdown.Item>
                  <Dropdown.Item href="/calendar">Calendar</Dropdown.Item>
                  <Dropdown.Item href="/user/settings">Settings</Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <button
                  className="btn btn-outline-primary me-md-1"
                  type="button"
                  onClick={() => navigate("/signup")}
                >
                  Sign Up
                </button>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() => navigate("/login")}
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HomeNavbarComponent;
