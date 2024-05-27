import { Col, Row } from "react-bootstrap";
import DashboardSidebarComponent from "../AdminDashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../../services/AdminModelsService";
import { CircularSpinner } from "infinity-spinners";
import School from "../../models/School";

function AdminDashboardComponent() {
  const [allCounts, setAllCounts] = useState([]);
  var token: string = "";
  const navigate = useNavigate();
  const [school, setSchool] = useState<School>();

  if (localStorage.getItem("superadmin")) {
    navigate("/superadmin/dashboard");
  } else if (localStorage.getItem("admin")) {
    token = localStorage.getItem("admin") as string;
  } else if (localStorage.getItem("student")) {
    navigate("/home");
  }

  const isMyTokenExpired = isExpired(token);

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const decodedToken: any = decodeToken(token);
      const schoolsResponse = await ModelsService.School(
        token,
        decodedToken.sub
      );
      setSchool(schoolsResponse.data);
      const allCountsResponse = await ModelsService.getAllCounts(
        token,
        schoolsResponse.data.id
      );
      setAllCounts(allCountsResponse.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isMyTokenExpired) {
      if (localStorage.getItem("admin")) {
        localStorage.removeItem("admin");
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
          <span>Clubs Table</span>
          {isLoading ? (
            <CircularSpinner color="#000" size={38} speed={2} weight={3} />
          ) : (
            <div className="rb">
              <span>
                {allCounts[1]} {allCounts[1] > 1 ? "rows" : "row"}
              </span>
              <button
                className="btn btn-pr2"
                onClick={() => navigate("/admin/clubs")}
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
                {allCounts[2]} {allCounts[2] > 1 ? "rows" : "row"}
              </span>
              <button
                className="btn btn-pr2"
                onClick={() => navigate("/admin/events")}
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
                {allCounts[0]} {allCounts[0] > 1 ? "rows" : "row"}
              </span>
              <button
                className="btn btn-pr2"
                onClick={() => navigate("/admin/students")}
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
                {allCounts[3]} {allCounts[3] > 1 ? "requests" : "request"}
              </span>
              <button
                className="btn btn-pr2"
                onClick={() => navigate("/admin/requests")}
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

export default AdminDashboardComponent;
