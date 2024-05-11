import { Col, Container, Modal, Row } from "react-bootstrap";
import "../styles/ProfilePage.css";
import {
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Student from "../models/Student";
import StudentService from "../services/StudentService";
import Club from "../models/Club";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import FollowingsComponent from "./FollowingsComponent";
import { useState } from "react";

function StudentSettingsComponent(props: { student: Student; clubs: Club[] }) {
  const navigate = useNavigate();

  const token = localStorage.getItem("student");
  const student = props.student;
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDeleteAccount = async () => {
    try {
      const response = await StudentService.deleteStudent(token, student.id);
      if (response.status === 200) {
        handleClose();
        logout();
      }
    } catch (error) {
      console.error(error);
    }
  };

  function logout() {
    AuthService.logout();
    navigate("/login");
  }

  return (
    <>
      <SnackbarProvider maxSnack={4} />
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
            <div className="logout" onClick={logout}>
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
              <div
                className="panel-title"
                onClick={() => navigate("/user/profile")}
              >
                <UserCircleIcon
                  style={{
                    width: "25px",
                    height: "25px",
                    strokeWidth: "2.5",
                  }}
                />
                Profile
              </div>
              <div
                className="panel-title atv"
                onClick={() => navigate("/user/settings")}
              >
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
            <div className="profile-info2">
              <div className="profile-info-row2">
                Language
                <div
                  className="radios"
                  style={{
                    marginLeft: "0.4rem",
                  }}
                >
                  <div className="radio-item">
                    <input
                      type="radio"
                      id="english"
                      name="language"
                      value="english"
                      defaultChecked
                    />
                    <label htmlFor="english">English</label>
                  </div>
                  <div className="radio-item">
                    <input
                      type="radio"
                      id="french"
                      name="language"
                      value="french"
                    />
                    <label htmlFor="french">French</label>
                  </div>
                </div>
              </div>
              <div className="profile-info-row2">
                View Mode
                <div className="radios">
                  <div className="radio-item">
                    <input
                      type="radio"
                      id="light"
                      name="view mode"
                      value="light"
                      defaultChecked
                    />
                    <label htmlFor="light">Light</label>
                  </div>
                  <div className="radio-item">
                    <input
                      type="radio"
                      id="dark"
                      name="view mode"
                      value="dark"
                    />
                    <label htmlFor="dark">Dark</label>
                  </div>
                  <div className="radio-item">
                    <input
                      type="radio"
                      id="system"
                      name="view mode"
                      value="system"
                    />
                    <label htmlFor="system">System</label>
                  </div>
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
                  marginTop: "2rem",
                }}
              >
                Danger Zone
                <button
                  className="btn delete-account"
                  type="button"
                  onClick={handleShow}
                >
                  Delete Account
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <FollowingsComponent studentId={student.id} clubs={props.clubs} />
      </Container>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Are you sure?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You are about to delete your account. This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn modal-cancel"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="btn modal-confirm"
            type="button"
            onClick={handleDeleteAccount}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default StudentSettingsComponent;
