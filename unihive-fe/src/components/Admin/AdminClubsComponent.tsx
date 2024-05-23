import { Col, Modal, Row, Table } from "react-bootstrap";
import DashboardSidebarComponent from "../AdminDashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ModelsService from "../../services/AdminModelsService";
import Club from "../../models/Club";
import { CircularSpinner } from "infinity-spinners";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import School from "../../models/School";
import { decodeToken } from "react-jwt";

function AdminClubsComponent() {
  const [clubs, setClubs] = useState<Club[]>([]);
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
  const [show, setShow] = useState(false);
  const [clubId, setClubId] = useState("");
  const [clubName, setClubName] = useState("");

  useEffect(() => {
    const decodedToken: any = decodeToken(token);
    ModelsService.School(token, decodedToken.sub)
      .then((response) => {
        setSchool(response.data);
        ModelsService.listClubs(token, response.data.id)
          .then((response) => {
            setClubs(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleShow = (id: string, name: string) => {
    setShow(true);
    setClubId(id);
    setClubName(name);
  };
  const handleClose = () => setShow(false);

  const handleDelete = (id: string) => {
    setIsDisabled(true);
    ModelsService.deleteClub(token, id, school!.id)
      .then((response) => {
        console.log(response);
        handleClose();
        setIsDisabled(false);
        enqueueSnackbar("Club deleted successfully.", {
          variant: "success",
          autoHideDuration: 2000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
        });
        ModelsService.listClubs(token, school!.id)
          .then((response) => {
            setClubs(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
        setIsDisabled(false);
        enqueueSnackbar("Failed to delete club", {
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
    <>
      <SnackbarProvider maxSnack={4} />
      <Row className="row2">
        <Col className="col-md-2">
          <DashboardSidebarComponent option={"clubs"} />
        </Col>
        <Col className="col2">
          <div className="table-entity">
            <div className="header">
              <span style={{ fontSize: "1.5rem" }}>Clubs Table</span>
              <span style={{ fontSize: "1.2rem" }}>
                {clubsCount} {clubsCount > 1 ? "rows" : "row"}
              </span>
            </div>
            <div className="table-bar1">
              <div>Search</div>
              <input
                type="text"
                placeholder="Email, or club name"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {isLoading ? (
              <div className="no-data">
                <CircularSpinner color="#000" size={60} speed={2} weight={3} />
              </div>
            ) : clubsCount === 0 ? (
              <div className="no-data">No Data.</div>
            ) : (
              <div className="table-table">
                <Table>
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>LOGO</th>
                      <th>DESCRIPTION</th>
                      <th>BANNER</th>
                      <th>RATING</th>
                      <th>SCHOOL</th>
                      <th>EMAIL</th>
                      <th>EDIT/DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredClubs.map((club) => (
                      <tr key={club.id}>
                        <td>
                          {club.clubName.length > 4
                            ? club.clubName.slice(0, 4) + "..."
                            : club.clubName}
                        </td>
                        <td>
                          {club.clubLogo.length > 4
                            ? club.clubLogo.slice(0, 4) + "..."
                            : club.clubLogo}
                        </td>
                        <td>
                          {club.clubDescription.length > 11
                            ? club.clubDescription.slice(0, 11) + "..."
                            : club.clubDescription}
                        </td>
                        <td>
                          {club.clubBanner.length > 6
                            ? club.clubBanner.slice(0, 6) + "..."
                            : club.clubBanner}
                        </td>
                        <td>{club.clubRating}</td>
                        <td>{club.school.schoolName}</td>
                        <td>
                          {club.email.length > 5
                            ? club.email.slice(0, 5) + "..."
                            : club.email}
                        </td>
                        <td>
                          <div className="modify">
                            <button
                              className="btn btn-edit"
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/admin/upclub/${clubs.indexOf(club) + 1}`,
                                  { state: { club } }
                                )
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-delete"
                              type="button"
                              onClick={() => handleShow(club.id, club.clubName)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            )}
          </div>
          <button
            className="btn btn-add1"
            onClick={() => navigate("/admin/addclub")}
            type="button"
          >
            Add Club
          </button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete Club with name {clubName}? <br />
          This will affect the table: Events.
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn modal-cancel"
            type="button"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="btn modal-confirm"
            type="button"
            onClick={() => handleDelete(clubId)}
            disabled={isDisabled}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AdminClubsComponent;
