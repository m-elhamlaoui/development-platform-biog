import { Col, Row } from "react-bootstrap";
import DashboardSidebarComponent from "../AdminDashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../../services/AdminModelsService";
import School from "../../models/School";
import { CircularSpinner } from "infinity-spinners";
import { SnackbarProvider, enqueueSnackbar } from "notistack";

function AdminAddStudentComponent() {
  const [school, setSchool] = useState<School>();
  var token: string = "";
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  if (localStorage.getItem("superadmin")) {
    token = localStorage.getItem("superadmin") as string;
  } else if (localStorage.getItem("admin")) {
    token = localStorage.getItem("admin") as string;
  } else if (localStorage.getItem("student")) {
    token = localStorage.getItem("student") as string;
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const decodedToken: any = decodeToken(token);
    ModelsService.School(token, decodedToken.sub)
      .then((response) => {
        setSchool(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSave = (event: any) => {
    setIsDisabled(true);
    event.preventDefault();
    ModelsService.addStudent(
      token,
      {
        firstName: event.target[0].value,
        lastName: event.target[1].value,
        cne: event.target[2].value,
        numApogee: event.target[3].value,
        school: school!.id,
        email: event.target[4].value,
        password: event.target[5].value,
      },
      school!.id
    )
      .then((response) => {
        console.log(response);
        enqueueSnackbar("School added successfully", {
          variant: "success",
          autoHideDuration: 1000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
          onClose: () => {
            navigate("/admin/students");
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setIsDisabled(false);
        enqueueSnackbar("Failed to add student", {
          variant: "error",
          autoHideDuration: 2000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
        });
      });
  };

  return (
    <>
      <SnackbarProvider maxSnack={4} />
      <Row className="row2">
        <Col className="col-md-2">
          <DashboardSidebarComponent option={"addstudent"} />
        </Col>
        <Col className="col2">
          <div className="table-entity-add">
            <div className="header">
              <span style={{ fontSize: "1.5rem" }}>Add Student</span>
            </div>
            {isLoading ? (
              <div className="is-loading">
                <CircularSpinner color="#000" size={60} speed={2} weight={3} />
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <div className="info">
                  <div className="info-row">
                    FIRST NAME
                    <input type="text" placeholder="first name" />
                  </div>
                  <div className="info-row">
                    LAST NAME
                    <input type="text" placeholder="last name" />
                  </div>
                  <div className="info-row">
                    CNE
                    <input type="text" placeholder="cne" />
                  </div>
                  <div className="info-row">
                    NUM APOGEE
                    <input
                      type="number"
                      placeholder="num apogee"
                      min={0}
                      max={99999999}
                    />
                  </div>
                  <div className="info-row">
                    EMAIL
                    <input type="text" placeholder="email" />
                  </div>
                  <div className="info-row">
                    PASSWORD
                    <input
                      type="text"
                      placeholder="password"
                      pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                      title="Password must contain at least one lowercase letter, one uppercase letter, one special character, one number, and be at least 8 characters"
                    />
                  </div>
                  <div className="info-btns">
                    <button
                      className="btn save-save"
                      type="submit"
                      disabled={isDisabled}
                    >
                      Save
                    </button>
                    <button
                      className="btn cancel-save"
                      type="button"
                      onClick={() => navigate("/admin/students")}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default AdminAddStudentComponent;
