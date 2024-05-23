import { Col, Row } from "react-bootstrap";
import DashboardSidebarComponent from "./DashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/SuperAdminModelsService";
import { Schools } from "../models/Schools";
import { Cities } from "../models/Cities";
import { CircularSpinner } from "infinity-spinners";

function SuperAdminAddSchoolComponent() {
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
    setIsLoading(false);
  }, []);

  const handleSave = (event: any) => {
    event.preventDefault();
    ModelsService.addSchool(token, {
      schoolName: event.target[0].value,
      schoolAddress: event.target[1].value,
      schoolCity: event.target[2].value,
    })
      .then((response) => {
        console.log(response);
        navigate("/superadmin/schools");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const SchoolsArray = Object.values(Schools);
  const CitiesArray = Object.values(Cities);
  SchoolsArray.sort();
  CitiesArray.sort();

  return (
    <Row className="row2">
      <Col className="col-md-2">
        <DashboardSidebarComponent option={"addschool"} />
      </Col>
      <Col className="col2">
        <div className="table-entity-add">
          <div className="header">
            <span style={{ fontSize: "1.5rem" }}>Add School</span>
          </div>
          {isLoading ? (
            <div className="is-loading">
              <CircularSpinner color="#000" size={60} speed={2} weight={3} />
            </div>
          ) : (
            <form onSubmit={handleSave}>
              <div className="info">
                <div className="info-row">
                  SCHOOL NAME
                  <select name="" id="">
                    {SchoolsArray.map((school: string) => (
                      <option key={school} value={school}>
                        {school}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="info-row">
                  SCHOOL ADDRESS
                  <input type="text" placeholder="school address" />
                </div>
                <div className="info-row">
                  SCHOOL CITY
                  <select name="" id="">
                    {CitiesArray.map((city: string) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="info-btns">
                  <button className="btn save-save" type="submit">
                    Save
                  </button>
                  <button
                    className="btn cancel-save"
                    type="button"
                    onClick={() => navigate("/superadmin/schools")}
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

export default SuperAdminAddSchoolComponent;
