import { Col, Row } from "react-bootstrap";
import DashboardSidebarComponent from "./DashboardSidebarComponent";
import { useEffect, useState } from "react";
import ModelsService from "../services/SuperAdminModelsService";
import { CircularSpinner } from "infinity-spinners";
import SuperAdmin from "../models/SuperAdmin";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

function SuperAdminProfileComponent() {
  const [superadmins, setSuperAdmins] = useState<SuperAdmin[]>([]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  var token: string = "";
  var superadmin: SuperAdmin | null = null;

  if (localStorage.getItem("superadmin")) {
    token = localStorage.getItem("superadmin") as string;
  } else if (localStorage.getItem("admin")) {
    token = localStorage.getItem("admin") as string;
  } else if (localStorage.getItem("student")) {
    token = localStorage.getItem("student") as string;
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ModelsService.getAll(token)
      .then((response) => {
        setSuperAdmins(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleUpdate = (e: any) => {
    e.preventDefault();
    setIsDisabled(true);
    if (superadmin!.email && oldPassword && newPassword) {
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
        setIsDisabled(false);
        return;
      }
      ModelsService.updateSuperAdminEmail(token, superadmin!.email).then(
        (response) => {
          localStorage.removeItem("superadmin");
          localStorage.setItem("superadmin", response.data.token);
        },
        (error) => {
          console.error(error);
        }
      );
      ModelsService.updateSuperAdminPassword(token, {
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
            setIsDisabled(false);
            return;
          }
          setIsDisabled(false);
          enqueueSnackbar("Profile Updated Successfully", {
            variant: "success",
            autoHideDuration: 5000,
            transitionDuration: 300,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (error) => {
          console.error(error);
        }
      );
    } else if (!superadmin!.email && oldPassword && newPassword) {
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
        setIsDisabled(false);
        return;
      }
      ModelsService.updateSuperAdminPassword(token, {
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
            setIsDisabled(false);

            return;
          }
          setIsDisabled(false);
          enqueueSnackbar("Password Updated Successfully", {
            variant: "success",
            autoHideDuration: 5000,
            transitionDuration: 300,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (error) => {
          console.error(error);
        }
      );
    } else if (superadmin!.email && (!oldPassword || !newPassword)) {
      ModelsService.updateSuperAdminEmail(token, superadmin!.email).then(
        (response) => {
          localStorage.removeItem("superadmin");
          localStorage.setItem("superadmin", response.data.token);
          setIsDisabled(false);
          enqueueSnackbar("Email Updated Successfully", {
            variant: "success",
            autoHideDuration: 5000,
            transitionDuration: 300,
            anchorOrigin: {
              vertical: "top",
              horizontal: "right",
            },
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  };

  superadmin = superadmins[0];

  return (
    <>
      <SnackbarProvider maxSnack={4} />
      <Row className="row2">
        <Col className="col-md-2">
          <DashboardSidebarComponent option={"profile"} />
        </Col>
        <Col className="col2">
          <div className="table-entity-add">
            <div className="header">
              <span style={{ fontSize: "1.5rem" }}>Super Admin Profile</span>
            </div>
            {isLoading ? (
              <div className="is-loading">
                <CircularSpinner color="#000" size={60} speed={2} weight={3} />
              </div>
            ) : (
              <div className="info">
                <div className="info-row">
                  EMAIL
                  <input
                    type="text"
                    placeholder="email"
                    value={superadmin.email}
                    onChange={(e) => {
                      const updatedSuperAdmin = superadmin;
                      updatedSuperAdmin!.email = e.target.value;
                      setSuperAdmins([updatedSuperAdmin!]);
                    }}
                  />
                </div>
                <div className="info-row">
                  OLD PASSWORD
                  <input
                    type="password"
                    placeholder="old password"
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                    }}
                  />
                </div>
                <div className="info-row">
                  NEW PASSWORD
                  <input
                    type="password"
                    placeholder="new password"
                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                    title="Password must contain at least one lowercase letter, one uppercase letter, one special character, one number, and be at least 8 characters"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                    }}
                  />
                </div>
                <div
                  className="info-btns"
                  style={{
                    marginRight: "4.5rem",
                  }}
                >
                  <button
                    className="btn save-update"
                    type="button"
                    style={{
                      width: "7rem",
                    }}
                    disabled={isDisabled}
                    onClick={handleUpdate}
                  >
                    Update
                  </button>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default SuperAdminProfileComponent;
