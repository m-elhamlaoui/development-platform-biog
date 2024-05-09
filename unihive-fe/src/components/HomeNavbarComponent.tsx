import { useNavigate } from "react-router-dom";
import logo from "../assets/uh-logo.png";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import AuthService from "../services/AuthService";
import Student from "../models/Student";

function HomeNavbarComponent(props: { loggedin: boolean; student: Student }) {
  const navigate = useNavigate();
  const student = props.student;

  function logout() {
    AuthService.logout();
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="UniHive Logo" width="80%" />
        </a>
        <div className="navbar-nav">
          <a className="nav-link active" aria-current="page" href="#">
            Home
          </a>
          <a className="nav-link" href="#">
            Events
          </a>
          <a className="nav-link" href="#">
            Contact
          </a>
          <a className="nav-link me-md-3" href="#">
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
                    <img src={student.profileImage} alt="" />
                  </div>
                  <span>Ilyass</span>
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
                  <Dropdown.Item href="#/action-1">Profile</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Log out</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <button
                  className="btn btn-outline-primary me-md-1"
                  type="button"
                >
                  Sign Up
                </button>
                <button className="btn btn-primary" type="button">
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
