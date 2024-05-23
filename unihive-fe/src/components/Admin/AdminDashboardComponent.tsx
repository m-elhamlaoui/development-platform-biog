import { Col, Row } from "react-bootstrap";
import DashboardSidebarComponent from "../DashboardSidebarComponent";
import { useNavigate, useParams } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../../services/SuperAdminModelsService";
import { CircularSpinner } from "infinity-spinners";

function SuperAdminDashboardComponent() {
  const [allCounts, setAllCounts] = useState([]);
  var token: string = "";
  const navigate = useNavigate();

  if (localStorage.getItem("superadmin")) {
    token = localStorage.getItem("superadmin") as string;
  } else if (localStorage.getItem("admin")) {
    token = localStorage.getItem("admin") as string;
  } else if (localStorage.getItem("student")) {
    token = localStorage.getItem("student") as string;
  }

  const isMyTokenExpired = isExpired(token);

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const allCountsResponse = await ModelsService.getAllCounts(token);
      setAllCounts(allCountsResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isMyTokenExpired) {
      if (localStorage.getItem("superadmin")) {
        localStorage.removeItem("superadmin");
      } else if (localStorage.getItem("admin")) {
        localStorage.removeItem("admin");
      } else if (localStorage.getItem("student")) {
        localStorage.removeItem("student");
      }
      navigate("/login");
    }
    setIsLoading(true);
    fetchData();
  }, []);

  console.log(allCounts);
  return (
    <Row className="row2">
      <Col className="col-md-2">
        <DashboardSidebarComponent option={"dashboard"} />
      </Col>
      <Col className="col2">
        <div className="entity">
          <span>Admins Table</span>
          {isLoading ? (
            <CircularSpinner color="#000" size={38} speed={2} weight={3} />
          ) : (
            <div className="rb">
              <span>
                {allCounts[0]} {allCounts[0] > 1 ? "rows" : "row"}
              </span>
              <button
                className="btn btn-pr2"
                onClick={() => navigate("/superadmin/admins")}
                type="button"
              >
                Edit Table
              </button>
            </div>
          )}
        </div>
        <div className="entity">
          <span>Clubs Table</span>
          {isLoading ? (
            <CircularSpinner color="#000" size={38} speed={2} weight={3} />
          ) : (
            <div className="rb">
              <span>
                {allCounts[2]} {allCounts[2] > 1 ? "rows" : "row"}
              </span>
              <button
                className="btn btn-pr2"
                onClick={() => navigate("/superadmin/clubs")}
                type="button"
              >
                Edit Table
              </button>
            </div>
          )}
        </div>
        <div className="entity">
          <span>Events Table</span>
          {isLoading ? (
            <CircularSpinner color="#000" size={38} speed={2} weight={3} />
          ) : (
            <div className="rb">
              <span>
                {allCounts[3]} {allCounts[3] > 1 ? "rows" : "row"}
              </span>
              <button
                className="btn btn-pr2"
                onClick={() => navigate("/superadmin/events")}
                type="button"
              >
                Edit Table
              </button>
            </div>
          )}
        </div>
        <div className="entity">
          <span>Schools Table</span>
          {isLoading ? (
            <CircularSpinner color="#000" size={38} speed={2} weight={3} />
          ) : (
            <div className="rb">
              <span>
                {allCounts[4]} {allCounts[4] > 1 ? "rows" : "row"}
              </span>
              <button
                className="btn btn-pr2"
                onClick={() => navigate("/superadmin/schools")}
                type="button"
              >
                Edit Table
              </button>
            </div>
          )}
        </div>
        <div className="entity">
          <span>Students Table</span>
          {isLoading ? (
            <CircularSpinner color="#000" size={38} speed={2} weight={3} />
          ) : (
            <div className="rb">
              <span>
                {allCounts[1]} {allCounts[1] > 1 ? "rows" : "row"}
              </span>
              <button
                className="btn btn-pr2"
                onClick={() => navigate("/superadmin/students")}
                type="button"
              >
                Edit Table
              </button>
            </div>
          )}
        </div>
        <div className="entity">
          <span>Pending Sign Up Requests</span>
          {isLoading ? (
            <CircularSpinner color="#000" size={38} speed={2} weight={3} />
          ) : (
            <div className="rb">
              <span>
                {allCounts[5]} {allCounts[5] > 1 ? "requests" : "request"}
              </span>
              <button
                className="btn btn-pr2"
                onClick={() => navigate("/superadmin/requests")}
                type="button"
              >
                Edit Table
              </button>
            </div>
          )}
        </div>
      </Col>
    </Row>
  );
}

export default SuperAdminDashboardComponent;
