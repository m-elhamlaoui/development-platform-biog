import { Col, Modal, Row, Table } from "react-bootstrap";
import DashboardSidebarComponent from "../SuperAdminDashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../../services/SuperAdminModelsService";
import Admin from "../../models/Admin";
import { CircularSpinner } from "infinity-spinners";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import School from "../../models/School";

function SuperAdminAdminsComponent() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [schools, setSchools] = useState<School[]>([]);
  var token: string = "";
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(false);

  if (localStorage.getItem("superadmin")) {
    token = localStorage.getItem("superadmin") as string;
  } else if (localStorage.getItem("admin")) {
    navigate("/admin/dashboard");
  } else if (localStorage.getItem("student")) {
    navigate("/home");
  }

  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);
  const [adminId, setAdminId] = useState("");
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    ModelsService.listAdmins(token)
      .then((response) => {
        setAdmins(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
    ModelsService.listSchools(token)
      .then((response) => {
        setSchools(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleShow = (id: string, name: string) => {
    setShow(true);
    setAdminId(id);
    setAdminName(name);
  };
  const handleClose = () => setShow(false);

  const handleDelete = (id: string) => {
    setIsDisabled(true);
    ModelsService.deleteAdmin(token, id)
      .then((response) => {
        console.log(response);
        handleClose();
        setIsDisabled(false);
        enqueueSnackbar("Admin deleted successfully.", {
          variant: "success",
          autoHideDuration: 2000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
        });
        ModelsService.listAdmins(token)
          .then((response) => {
            setAdmins(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
        setIsDisabled(false);
        enqueueSnackbar("Failed to delete admin", {
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

  const adminsArray = Object.values(admins);
  const adminsCount = adminsArray.length;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Admin[]>(admins);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = admins.filter(
      (admin) =>
        admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admin.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, admins]);

  const filteredAdmins = searchTerm ? searchResults : adminsArray;
  const filteredSchools = schools.filter((school) => {
    const adminsForSchool = admins.filter(
      (admin) => admin.school.id === school.id
    );
    return adminsForSchool.length === 0;
  });

  return (
    <>
      <SnackbarProvider maxSnack={4} />
      <Row className="row2">
        <Col className="col-md-2">
          <DashboardSidebarComponent option={"admins"} />
        </Col>
        <Col className="col2">
          <div className="table-entity">
            <div className="header">
              <span style={{ fontSize: "1.5rem" }}>Admins Table</span>
              <span style={{ fontSize: "1.2rem" }}>
                {adminsCount} {adminsCount > 1 ? "rows" : "row"}
              </span>
            </div>
            <div className="table-bar2">
              <div>Search</div>
              <input
                type="text"
                placeholder="Email, first name, or last name"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            {isLoading ? (
              <div className="no-data">
                <CircularSpinner color="#000" size={60} speed={2} weight={3} />
              </div>
            ) : adminsCount === 0 ? (
              <div className="no-data">No Data.</div>
            ) : (
              <div className="table-table">
                <Table>
                  <thead>
                    <tr>
                      <th>FIRST NAME</th>
                      <th>LAST NAME</th>
                      <th>SCHOOL</th>
                      <th>EMAIL</th>
                      <th>EDIT/DELETE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAdmins.map((admin) => (
                      <tr key={admin.id}>
                        <td>
                          {admin.firstName.length > 10
                            ? admin.firstName.slice(0, 10) + "..."
                            : admin.firstName}
                        </td>
                        <td>
                          {admin.lastName.length > 9
                            ? admin.lastName.slice(0, 9) + "..."
                            : admin.lastName}
                        </td>
                        <td>
                          {admin.school.schoolName.length > 6
                            ? admin.school.schoolName.slice(0, 6) + "..."
                            : admin.school.schoolName}
                        </td>
                        <td>
                          {admin.email.length > 5
                            ? admin.email.slice(0, 5) + "..."
                            : admin.email}
                        </td>
                        <td>
                          <div className="modify">
                            <button
                              className="btn btn-edit"
                              type="button"
                              onClick={() =>
                                navigate(
                                  `/superadmin/upadmin/${
                                    admins.indexOf(admin) + 1
                                  }`,
                                  { state: { admin } }
                                )
                              }
                            >
                              Edit
                            </button>
                            <button
                              className="btn btn-delete"
                              type="button"
                              onClick={() =>
                                handleShow(
                                  admin.id,
                                  admin.firstName + " " + admin.lastName
                                )
                              }
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
            className="btn btn-add2"
            type="button"
            onClick={() => {
              if (filteredSchools.length > 0) {
                navigate("/superadmin/addadmin", {
                  state: { schools: filteredSchools },
                });
              } else {
                enqueueSnackbar("No schools available to add an admin to.", {
                  variant: "warning",
                  autoHideDuration: 2000,
                  transitionDuration: 300,
                  anchorOrigin: {
                    vertical: "top",
                    horizontal: "right",
                  },
                  preventDuplicate: true,
                });
              }
            }}
          >
            Add Admin
          </button>
        </Col>
      </Row>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Delete Admin with name {adminName}? <br />
          This will affect the tables: Schools, Students, Clubs, and Events.
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
            onClick={() => handleDelete(adminId)}
            disabled={isDisabled}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SuperAdminAdminsComponent;
