import { Col, Container, Row } from "react-bootstrap";
import "../styles/ProfilePage.css";
import {
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import logo from "../assets/eitc-logo.png";
import Student from "../models/Student";
import StudentService from "../services/StudentService";

function StudentProfileComponent(props: { student: Student }) {
  const [filetext, setFiletext] = useState("Choose Image...");
  const [isDisabled, setIsDisabled] = useState(false);
  const [email, setEmail] = useState(props.student.email);
  const [profileImage, setProfileImage] = useState(props.student.profileImage);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const token = localStorage.getItem("student");
  const student = props.student;

  return (
    <Container fluid className="cont6">
      <Row className="student-profile">
        <Col className="profile-dash-1 col-custom">
          <div className="pfp">
            <img src={student.profileImage} alt="" />
          </div>
          <div className="username">
            {student.firstName + " " + student.lastName}
          </div>
          <div className="school-city">
            <div className="titles">
              <span>School</span>
              <span>City</span>
            </div>
            <div className="sc-info">
              <span>{student.school.schoolName}</span>
              <span>{student.school.schoolCity}</span>
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
              <input
                type="email"
                placeholder="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
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
              Old Password
              <input type="password" placeholder="old password" />
            </div>
            <div className="profile-info-row">
              New Password
              <input type="password" placeholder="new password" />
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
          {student.clubs.map((club) => (
            <div className="club-item">
              <div className="club-logo">
                <img src={club.clubLogo} alt="club logo" />
              </div>
              <span className="club-title">{club.clubName}</span>
              <button className="btn unfollow-btn" type="button">
                Unfollow
              </button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}

export default StudentProfileComponent;
