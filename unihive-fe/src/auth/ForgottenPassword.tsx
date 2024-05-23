import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { Col, Row } from "react-bootstrap";
import "../styles/Auth.css";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

function Login() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

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

  function forgottenPassword(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (!email) {
      enqueueSnackbar("Email required", {
        variant: "warning",
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
    AuthService.forgottenPassword(email).then(
      (response) => {
        if (response.data.token == "INVALID_TOKEN") {
          enqueueSnackbar("Email not found", {
            variant: "error",
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
        setIsSubmitted(true);
        enqueueSnackbar("Check your email for your new password", {
          variant: "success",
          autoHideDuration: 5000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
        });
      },
      () => {
        enqueueSnackbar("Email not found", {
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
  }

  return (
    <>
      <SnackbarProvider />
      <Row className="row3">
        <Col className="col3 col3-1">
          <div className="auth-img">
            <img src="https://picsum.photos/1920/1080?random=1" alt="" />
          </div>
        </Col>
        <Col className="col3">
          <div className="uh-logo">
            <img
              src="https://storage.googleapis.com/unihive-files/uh-logo.png"
              alt=""
            />
          </div>
          <form>
            <div className="fields">
              <div className="field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button
                className="btn btn-primary auth-btn"
                type="submit"
                onClick={forgottenPassword}
                disabled={isSubmitted}
              >
                Submit
              </button>
            </div>
          </form>
          <div className="account">
            <span>Return to login page.</span>
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

export default Login;
