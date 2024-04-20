import React from "react";
import logo from "../assets/uh-logo.png";

function Navbar() {
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
            <button className="btn btn-outline-primary me-md-1" type="button">
              Sign Up
            </button>
            <button className="btn btn-primary" type="button">
              Log In
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
