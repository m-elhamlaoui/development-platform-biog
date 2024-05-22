import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";
import { Col, Row } from "react-bootstrap";
import "../styles/Auth.css";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import ModelsService from "../services/SuperAdminModelsService";
import { Schools } from "../models/Schools";

function Signup() {
  const navigate = useNavigate();
  const [filetext, setFiletext] = useState("Choose Image...");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (
      localStorage.getItem("superadmin") &&
      !isExpired(localStorage.getItem("superadmin") as string)
    ) {
      navigate("/superadmin/dashboard");
    } else if (
      localStorage.getItem("admin") &&
      !isExpired(localStorage.getItem("admin") as string)
    ) {
      navigate("/admin/dashboard");
    } else if (
      localStorage.getItem("student") &&
      !isExpired(localStorage.getItem("student") as string)
    ) {
      navigate("/home");
    }
  });

  function signup(event: any) {
    event.preventDefault();
    setIsSubmitted(true);
    for (let i = 0; i < 8; i++) {
      if (!event.target[i].value && i !== 4) {
        enqueueSnackbar("All fields are required", {
          variant: "warning",
          autoHideDuration: 5000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
        });
        setIsSubmitted(false);
        return;
      }
    }

    if (!event.target[4].files[0]) {
      enqueueSnackbar("School card is required", {
        variant: "warning",
        autoHideDuration: 5000,
        transitionDuration: 300,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        preventDuplicate: true,
      });
      setIsSubmitted(false);
      return;
    }
    const file = event.target[4].files[0];
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
      setIsSubmitted(false);
      return;
    }
    const password = event.target[7].value;
    const confirmPassword = event.target[8].value;
    const fileName = file.name;
    if (password !== confirmPassword) {
      enqueueSnackbar("Passwords do not match", {
        variant: "warning",
        autoHideDuration: 5000,
        transitionDuration: 300,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        preventDuplicate: true,
      });
      setIsSubmitted(false);
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    ModelsService.uploadFile(formData).then(
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
        setIsSubmitted(false);
      }
    );

    const data = {
      firstName: event.target[0].value,
      lastName: event.target[1].value,
      cne: event.target[2].value,
      numApogee: event.target[3].value,
      schoolCard: "https://storage.googleapis.com/unihive-files/" + fileName,
      school: event.target[5].value,
      email: event.target[6].value,
      password: password,
    };

    AuthService.register(data).then(
      () => {
        enqueueSnackbar("Signed up successfully, check your Email", {
          variant: "success",
          autoHideDuration: 2000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
          onClose: () => {
            navigate("/login");
          },
        });
        setIsSubmitted(false);
      },
      () => {
        enqueueSnackbar("Something wrong occured", {
          variant: "error",
          autoHideDuration: 5000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
        });
        setIsSubmitted(false);
      }
    );
  }

  const SchoolsArray = Object.values(Schools);
  SchoolsArray.sort();

  return (
    <>
      <SnackbarProvider maxSnack={4} />
      <Row className="row3">
        <Col className="col4 col4-1">
          <div className="auth-img">
            <img src="https://picsum.photos/1920/1080?random=1" alt="" />
          </div>
        </Col>
        <Col className="col4">
          <div className="uh-logo2">
            <img
              src="https://storage.googleapis.com/unihive-files/uh-logo.png"
              alt=""
            />
          </div>
          <form onSubmit={signup}>
            <div className="fields">
              <div className="field2">
                <div className="field">
                  <label>First Name</label>
                  <input type="text" placeholder="First Name" />
                </div>
                <div className="field">
                  <label>Last Name</label>
                  <input type="text" placeholder="Last Name" />
                </div>
              </div>
              <div className="field2">
                <div className="field">
                  <label>CNE / MASSAR</label>
                  <input type="text" placeholder="CNE / MASSAR" />
                </div>
                <div className="field">
                  <label>Num Apogée</label>
                  <input
                    type="number"
                    placeholder="Num Apogée"
                    min={0}
                    max={99999999}
                  />
                </div>
              </div>
              <div className="field2">
                <div className="field">
                  <label>School Card</label>
                  <input
                    type="file"
                    id="actual-btn"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const fileName = (e.target as HTMLInputElement).files?.[0]
                        ?.name;
                      const len = fileName?.length || 0;
                      if (len > 45) {
                        setFiletext(
                          fileName?.slice(0, 22) +
                            "..." +
                            fileName?.slice(len - 22, len)
                        );
                      } else {
                        setFiletext(fileName || "Choose Image...");
                      }
                    }}
                  />
                  <div className="file-input">
                    <span id="file-chosen">{filetext}</span>
                    <label htmlFor="actual-btn">Browse</label>
                  </div>
                </div>
              </div>
              <div className="field2">
                <div className="field">
                  <label>School</label>
                  <select name="" id="">
                    {SchoolsArray.map((school) => (
                      <option key={school} value={school}>
                        {school}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Email Address</label>
                  <input type="email" placeholder="Email Address" />
                </div>
              </div>
              <div className="field2">
                <div className="field">
                  <label>Password</label>
                  <input type="password" placeholder="Password" />
                </div>
                <div className="field">
                  <label>Confirm Password</label>
                  <input type="password" placeholder="Confirm Password" />
                </div>
              </div>
              <button
                className="btn btn-primary auth-btn"
                type="submit"
                disabled={isSubmitted}
              >
                Sign up
              </button>
            </div>
          </form>
          <div className="account2">
            <span>Already have an account?</span>
            <span
              style={{ color: "#46bfff", cursor: "pointer" }}
              onClick={() => navigate("/login")}
            >
              Log in
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Signup;
