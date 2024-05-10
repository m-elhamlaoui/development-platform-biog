import { Col, Container, Row } from "react-bootstrap";
import "../styles/ProfilePage.css";
import {
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useState } from "react";
import logo from "../assets/eitc-logo.png";

function StudentProfileComponent() {
  const [filetext, setFiletext] = useState("Choose Image...");
  return (
    <Container fluid className="cont6">
      <Row className="student-profile">
        <Col className="profile-dash-1 col-custom">
          <div className="pfp">
            <img
              src="https://img.uhdpaper.com/wallpaper/ninja-kamui-oni-mask-joe-higan-256@1@o-thumb.jpg?dl"
              alt=""
            />
          </div>
          <div className="username">Username</div>
          <div className="school-city">
            <div className="titles">
              <span>School</span>
              <span>City</span>
            </div>
            <div className="sc-info">
              <span>ENSIAS</span>
              <span>RABAT</span>
            </div>
          </div>
          <div className="logout">
            <ArrowLeftEndOnRectangleIcon
              style={{
                width: "20px",
                height: "20px",
                strokeWidth: "3",
                marginRight: "0.5rem",
                transform: "translateY(-1.5px)",
              }}
            />
            Log out
          </div>
        </Col>
        <Col className="profile-dash-2">
          <div className="panel">
            <div className="panel-title atv">
              <UserCircleIcon
                style={{
                  width: "25px",
                  height: "25px",
                  strokeWidth: "2.5",
                }}
              />
              Profile
            </div>
            <div className="panel-title">
              <Cog6ToothIcon
                style={{
                  width: "25px",
                  height: "25px",
                  strokeWidth: "2.5",
                }}
              />
              Settings
            </div>
          </div>
          <div className="profile-info">
            <div className="profile-info-row">
              Email Address
              <input type="email" placeholder="email" />
            </div>
            <div className="profile-info-row">
              Profile Image
              <input
                type="file"
                id="actual-btn"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const fileName = (e.target as HTMLInputElement).files?.[0]
                    ?.name;
                  const len = fileName?.length || 0;
                  if (len > 15) {
                    setFiletext(
                      fileName?.slice(0, 7) +
                        "..." +
                        fileName?.slice(len - 7, len)
                    );
                  } else {
                    setFiletext(fileName || "Choose Image...");
                  }
                }}
              />
              <div className="file-input-2">
                <span id="file-chosen">{filetext}</span>
                <label htmlFor="actual-btn">Browse</label>
              </div>
            </div>
            <div className="profile-info-btn">
              <button className="btn save-save-2" type="button">
                Update
              </button>
            </div>
            <div
              className="profile-info-row"
              style={{
                fontSize: "1.4rem",
                fontWeight: "500",
              }}
            >
              Change Password
            </div>
            <div className="profile-info-row">
              Password
              <input type="password" placeholder="password" />
            </div>
            <div className="profile-info-row">
              Confirm Password
              <input type="password" placeholder="confirm password" />
            </div>
            <div className="profile-info-btn">
              <button className="btn save-save-2" type="button">
                Update
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <div className="followers">
        <span className="follow-title">Clubs you're following</span>
        <div className="clubs">
          <div className="club-item">
            <div className="club-logo">
              <img src={logo} alt="club logo" />
            </div>
            <span className="club-title">ENSIAS IT CLUB</span>
            <button className="btn unfollow-btn" type="button">
              Unfollow
            </button>
          </div>
          <div className="club-item">
            <div className="club-logo">
              <img src={logo} alt="club logo" />
            </div>
            <span className="club-title">ENSIAS IT CLUB</span>
            <button className="btn unfollow-btn" type="button">
              Unfollow
            </button>
          </div>
          <div className="club-item">
            <div className="club-logo">
              <img src={logo} alt="club logo" />
            </div>
            <span className="club-title">ENSIAS IT CLUB</span>
            <button className="btn unfollow-btn" type="button">
              Unfollow
            </button>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default StudentProfileComponent;
