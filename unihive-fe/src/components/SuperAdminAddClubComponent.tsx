import { Col, Row } from "react-bootstrap";
import DashboardSidebarComponent from "./DashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/SuperAdminModelsService";
import School from "../models/School";

function SuperAdminAddClubComponent() {
  const [schools, setSchools] = useState<School[]>([]);
  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    }
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
    ModelsService.addClub(token, {
      clubName: event.target[0].value,
      clubLogo: event.target[1].value,
      clubDescription: event.target[2].value,
      clubBanner: event.target[3].value,
      school: event.target[4].value,
      email: event.target[5].value,
      password: event.target[6].value,
    })
      .then((response) => {
        console.log(response);
        navigate("/superadmin/clubs");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Row className="row2">
      <Col className="col-md-2">
        <DashboardSidebarComponent option={"addclub"} />
      </Col>
      <Col className="col2">
        <div className="table-entity-add">
          <div className="header">
            <span style={{ fontSize: "1.5rem" }}>Add Club</span>
          </div>
          {isLoading ? (
            <div className="is-loading">Loading...</div>
          ) : (
            <form onSubmit={handleSave}>
              <div className="info">
                <div className="info-row">
                  CLUB NAME
                  <input type="text" placeholder="club name" />
                </div>
                <div className="info-row">
                  CLUB LOGO
                  <input type="text" placeholder="club logo" />
                </div>
                <div className="info-row">
                  CLUB DESCRIPTION
                  <textarea placeholder="club description" />
                </div>
                <div className="info-row">
                  CLUB BANNER
                  <input type="text" placeholder="club banner" />
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
                    onClick={() => navigate("/superadmin/clubs")}
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

export default SuperAdminAddClubComponent;
