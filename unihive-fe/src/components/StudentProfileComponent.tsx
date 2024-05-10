import { Col, Container, Row } from "react-bootstrap";
import "../styles/ProfilePage.css";
import {
  ArrowLeftEndOnRectangleIcon,
  Cog6ToothIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import Student from "../models/Student";
import StudentService from "../services/StudentService";
import Club from "../models/Club";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import ModelsService from "../services/SuperAdminModelsService";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { InfinitySpin } from "react-loader-spinner";

function StudentProfileComponent(props: { student: Student; clubs: Club[] }) {
  const [filetext, setFiletext] = useState("Choose Image...");
  const [file, setFile] = useState<File | undefined>();
  const [isDisabled1, setIsDisabled1] = useState(false);
  const [isDisabled2, setIsDisabled2] = useState(false);
  const [email, setEmail] = useState(props.student.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("student");
  const student = props.student;

  const handleUpdate1 = async () => {
    setIsDisabled1(true);
    if (email && !file) {
      await StudentService.updateStudentEmail(token, student.id, email).then(
        (response) => {
          localStorage.removeItem("student");
          localStorage.setItem("student", response.data.token);
          enqueueSnackbar("Email updated successfully", {
            variant: "success",
            autoHideDuration: 5000,
            transitionDuration: 300,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            preventDuplicate: true,
          });
          window.location.reload();
        },
        () => {
          enqueueSnackbar("Error updating email", {
            variant: "error",
            autoHideDuration: 5000,
            transitionDuration: 300,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            preventDuplicate: true,
          });
        }
      );
    } else if (!email && file) {
      if (file && file.size > 10 * 1024 * 1024) {
        enqueueSnackbar("File size should be less than 10MB", {
          variant: "info",
          autoHideDuration: 5000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
        });
        return;
      }
      const formData = new FormData();

      formData.append("files", file);

      await ModelsService.uploadFile(formData).then(
        () => {
          console.log("File uploaded successfully");
        },
        () => {
          enqueueSnackbar("Error uploading file", {
            variant: "error",
            autoHideDuration: 5000,
            transitionDuration: 300,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            preventDuplicate: true,
          });
        }
      );

      await StudentService.updateStudentProfileImage(
        token,
        student.id,
        "https://storage.googleapis.com/unihive-files/" + file.name
      ).then(
        () => {
          enqueueSnackbar("Profile image updated successfully", {
            variant: "success",
            autoHideDuration: 5000,
            transitionDuration: 300,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            preventDuplicate: true,
          });
          window.location.reload();
        },
        () => {
          enqueueSnackbar("Error updating profile image", {
            variant: "error",
            autoHideDuration: 5000,
            transitionDuration: 300,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            preventDuplicate: true,
          });
        }
      );
    } else if (email && file) {
      try {
        if (file && file.size > 10 * 1024 * 1024) {
          enqueueSnackbar("File size should be less than 10MB", {
            variant: "info",
            autoHideDuration: 5000,
            transitionDuration: 300,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            preventDuplicate: true,
          });
          return;
        }
        const formData = new FormData();

        formData.append("files", file);

        await ModelsService.uploadFile(formData).then(
          (response) => {
            console.log(response);
          },
          () => {
            enqueueSnackbar("Error uploading file", {
              variant: "error",
              autoHideDuration: 5000,
              transitionDuration: 300,
              anchorOrigin: {
                vertical: "top",
                horizontal: "right",
              },
              preventDuplicate: true,
            });
          }
        );

        await StudentService.updateStudentEmail(token, student.id, email).then(
          (response) => {
            localStorage.removeItem("student");
            localStorage.setItem("student", response.data.token);
          },
          (error) => {
            console.error(error);
          }
        );

        await StudentService.updateStudentProfileImage(
          token,
          student.id,
          "https://storage.googleapis.com/unihive-files/" + file.name
        ).then(
          () => {},
          (error) => {
            console.error(error);
          }
        );
        enqueueSnackbar("Profile updated successfully", {
          variant: "success",
          autoHideDuration: 5000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
        });
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No changes made");
    }
    setIsDisabled1(false);
  };

  const handleUpdate2 = async () => {
    setIsDisabled2(true);
    if (oldPassword === "" || newPassword === "") {
      enqueueSnackbar("Please fill in all fields", {
        variant: "warning",
        autoHideDuration: 5000,
        transitionDuration: 300,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        preventDuplicate: true,
      });
      setIsDisabled2(false);
      return;
    }
    if (oldPassword === newPassword) {
      enqueueSnackbar("New password must be different", {
        variant: "warning",
        autoHideDuration: 5000,
        transitionDuration: 300,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
      });
      setIsDisabled2(false);
      return;
    }
    await StudentService.updateStudentPassword(token, {
      oldPassword: oldPassword,
      newPassword: newPassword,
    }).then(
      (response) => {
        if (response.data.token == "INVALID_TOKEN") {
          enqueueSnackbar("Old Password Incorrect", {
            variant: "error",
            autoHideDuration: 5000,
            transitionDuration: 300,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          setIsDisabled2(false);
          return;
        }
        enqueueSnackbar("Password updated successfully", {
          variant: "success",
          autoHideDuration: 5000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        setIsDisabled2(false);
      },
      () => {
        enqueueSnackbar("Error updating password", {
          variant: "error",
          autoHideDuration: 5000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
        });
        setIsDisabled2(false);
      }
    );
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
                    setFile((e.target as HTMLInputElement).files?.[0]);
                  }}
                />
                <div className="file-input-2">
                  <span id="file-chosen">{filetext}</span>
                  <label htmlFor="actual-btn">Browse</label>
                </div>
              </div>
              <div className="profile-info-btn">
                <button
                  className="btn save-save-2"
                  type="button"
                  onClick={handleUpdate1}
                  disabled={isDisabled1}
                >
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
                <input
                  type="password"
                  placeholder="old password"
                  onChange={(e) => setOldPassword(e.target.value)}
                />
              </div>
              <div className="profile-info-row">
                New Password
                <input
                  type="password"
                  placeholder="new password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className="profile-info-btn">
                <button
                  className="btn save-save-2"
                  type="button"
                  onClick={handleUpdate2}
                >
                  Update
                </button>
              </div>
            </div>
          </Col>
        </Row>
        <div className="followers">
          <span className="follow-title">Clubs you're following</span>
          <div className="clubs">
            {props.clubs.map((club) => (
              <div className="club-item" key={club.id}>
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
    </>
  );
}

export default StudentProfileComponent;
