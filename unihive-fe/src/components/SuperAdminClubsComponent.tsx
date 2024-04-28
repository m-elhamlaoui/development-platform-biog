import { Col, Row, Table } from "react-bootstrap";
import DashboardSidebarComponent from "../components/DashboardSidebarComponent";
import { useNavigate, useParams } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/ModelsService";
import Club from "../models/Club";

function SuperAdminClubsComponent() {
  const [clubs, setclubs] = useState<Club[]>([]);
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
        setclubs(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const clubsArray = Object.values(clubs);
  const clubsCount = clubsArray.length;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Club[]>(clubs);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

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
        <DashboardSidebarComponent option={"clubs"} />
      </Col>
      <Col className="col2">
        <div className="clubs-entity">
          <div className="header">
            <span style={{ fontSize: "1.5rem" }}>Clubs Table</span>
            <span style={{ fontSize: "1.2rem" }}>{clubsCount} rows</span>
          </div>
          <div className="table-bar">
            <div>Search</div>
            <input
              type="text"
              placeholder="Search by email or club name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="clubs-table">
            <Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>CLUB NAME</th>
                  <th>CLUB LOGO</th>
                  <th>CLUB DESCRIPTION</th>
                  <th>CLUB BANNER</th>
                  <th>CLUB RATING</th>
                  <th>RATING COUNT</th>
                  <th>SCHOOL</th>
                  <th>USER</th>
                  <th>EDIT/DELETE</th>
                </tr>
              </thead>
              <tbody>
                {filteredClubs.map((club) => (
                  <tr key={club.id}>
                    <td>{club.id.slice(0, 8)}...</td>
                    <td>
                      {club.clubName.length > 8
                        ? club.clubName.slice(0, 8) + "..."
                        : club.clubName}
                    </td>
                    <td>
                      {club.clubLogo.length > 8
                        ? club.clubLogo.slice(0, 8) + "..."
                        : club.clubLogo}
                    </td>
                    <td>
                      {club.clubDescription.length > 8
                        ? club.clubDescription.slice(0, 8) + "..."
                        : club.clubDescription}
                    </td>
                    <td>
                      {club.clubBanner.length > 8
                        ? club.clubBanner.slice(0, 8) + "..."
                        : club.clubBanner}
                    </td>
                    <td>{club.clubRating}</td>
                    <td>{club.ratingCount}</td>
                    <td>{club.school.schoolName}</td>
                    <td>{club.email}</td>
                    <td>
                      <div className="modify">
                        <button className="btn btn-edit" type="button">
                          Edit
                        </button>
                        <button className="btn btn-delete" type="button">
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <button className="btn btn-add" type="button">
          Add Club
        </button>
      </Col>
    </Row>
  );
}

export default SuperAdminClubsComponent;
