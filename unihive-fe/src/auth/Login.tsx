import { useEffect, useState } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";
import { Col, Row } from "react-bootstrap";
import "../styles/Auth.css";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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

  function login(event: { preventDefault: () => void }) {
    event.preventDefault();
    if (!email && !password) {
      enqueueSnackbar("Email and Password required", {
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
    } else if (!email) {
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
    } else if (!password) {
      enqueueSnackbar("Password required", {
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
    AuthService.login(email, password).then(
      (response) => {
        const decodedToken: any = decodeToken(response.data.token);
        const succes = (link: string) => {
          enqueueSnackbar("Logged in successfully", {
            variant: "success",
            autoHideDuration: 1000,
            transitionDuration: 300,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
            preventDuplicate: true,
            onClose: () => {
              navigate(link);
            },
          });
        };
        if (decodedToken.role === "STUDENT") {
          localStorage.setItem("student", response.data.token);
          succes("/home");
        } else if (decodedToken.role === "ADMIN") {
          localStorage.setItem("admin", response.data.token);
          succes("/admin/dashboard");
        } else if (decodedToken.role === "SUPER_ADMIN") {
          localStorage.setItem("superadmin", response.data.token);
          succes("/superadmin/dashboard");
        }
      },
      () => {
        enqueueSnackbar("Incorrect email or password", {
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
      <SnackbarProvider maxSnack={4} />
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
          <form onSubmit={login}>
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
              <div className="field">
                <label>Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="check"
                  onChange={() => setShowPassword((prev) => !prev)}
                />
                <label htmlFor="check">Show Password</label>
              </div>
              <button className="btn btn-primary auth-btn" type="submit">
                Log in
              </button>
              <div
                className="forgot"
                onClick={() => navigate("/forgottenpassword")}
              >
                Forgotten Password?
              </div>
            </div>
          </form>
          <button
            className="btn btn-primary auth-btn"
            style={{ marginTop: "5rem" }}
            type="button"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </button>
        </Col>
      </Row>
    </>
  );
}

export default Login;
