import logo from "../assets/uh-logo.png";

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <a className="navbar-brand" href="#">
          <img src={logo} alt="UniHive Logo" width="80%" />
        </a>
        <div className="navbar-nav">
          <a className="nav-link active" aria-current="page" href="/home">
            Home
          </a>
          <a className="nav-link" href="/Events">
            Events
          </a>
          <a className="nav-link" href="/Contact">
            Contact
          </a>
          <a className="nav-link me-md-3" href="/About">
            About
          </a>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
