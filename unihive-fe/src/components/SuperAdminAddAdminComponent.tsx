import { Col, Row } from "react-bootstrap";
import DashboardSidebarComponent from "./DashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/SuperAdminModelsService";
import School from "../models/School";
import { CircularSpinner } from "infinity-spinners";

function SuperAdminAddAdminComponent() {
  const [schools, setSchools] = useState<School[]>([]);
  var token: string = "";
  const navigate = useNavigate();

  if (localStorage.getItem("superadmin")) {
    token = localStorage.getItem("superadmin") as string;
  } else if (localStorage.getItem("admin")) {
    token = localStorage.getItem("admin") as string;
  } else if (localStorage.getItem("student")) {
    token = localStorage.getItem("student") as string;
  }

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ModelsService.listSchools(token)
      .then((response) => {
        setSchools(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSave = (event: any) => {
    event.preventDefault();
    ModelsService.addAdmin(token, {
      firstName: event.target[0].value,
      lastName: event.target[1].value,
      school: event.target[2].value,
      email: event.target[3].value,
      password: event.target[4].value,
    })
      .then((response) => {
        console.log(response);
        navigate("/superadmin/admins");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Row className="row2">
      <Col className="col-md-2">
        <DashboardSidebarComponent option={"addadmin"} />
      </Col>
      <Col className="col2">
        <div className="table-entity-add">
          <div className="header">
            <span style={{ fontSize: "1.5rem" }}>Add Admin</span>
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
                  SCHOOL
                  <select name="" id="">
                    {schools.map((school) => (
                      <option key={school.id} value={school.id}>
                        {school.schoolName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="info-row">
                  EMAIL
                  <input type="text" placeholder="email" />
                </div>
                <div className="info-row">
                  PASSWORD
                  <input type="text" placeholder="password" />
                </div>
                <div className="info-btns">
                  <button className="btn save-save" type="submit">
                    Save
                  </button>
                  <button
                    className="btn cancel-save"
                    type="button"
                    onClick={() => navigate("/superadmin/admins")}
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
  );
}

export default SuperAdminAddAdminComponent;
