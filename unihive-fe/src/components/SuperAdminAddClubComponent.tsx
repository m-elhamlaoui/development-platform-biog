import { Col, Row, Table } from "react-bootstrap";
import DashboardSidebarComponent from "./DashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/SuperAdminModelsService";
import Club from "../models/Club";

function SuperAdminAddClubComponent() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    ModelsService.listClubs(token)
      .then((response) => {
        setClubs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const clubsArray = Object.values(clubs);
  const clubsCount = clubsArray.length;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Club[]>(clubs);

  useEffect(() => {
    const results = clubs.filter(
      (club) =>
        club.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        club.clubName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, clubs]);

  const filteredClubs = searchTerm ? searchResults : clubsArray;

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
              <input type="text" placeholder="school" />
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
              <button className="btn save" type="button">
                Save
              </button>
              <button className="btn delete" type="button">
                Delete
              </button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default SuperAdminAddClubComponent;
