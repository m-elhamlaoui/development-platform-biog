import { Col, Modal, Row } from "react-bootstrap";
import DashboardSidebarComponent from "./DashboardSidebarComponent";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/SuperAdminModelsService";
import School from "../models/School";
import Club from "../models/Club";
import { CheckIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Student from "../models/Student";
import { CircularSpinner } from "infinity-spinners";

function SuperAdminEditClubComponent() {
  const { id } = useParams();
  const { state } = useLocation();
  const [schools, setSchools] = useState<School[]>([]);
  const [club, setClub] = useState<Club>(state.club);
  const [students, setStudents] = useState<Student[]>([]);
  var token: string = "";
  const navigate = useNavigate();

  if (localStorage.getItem("superadmin")) {
    token = localStorage.getItem("superadmin") as string;
  } else if (localStorage.getItem("admin")) {
    token = localStorage.getItem("admin") as string;
  } else if (localStorage.getItem("student")) {
    token = localStorage.getItem("student") as string;
  }

  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const schoolsResponse = await ModelsService.listSchools(token);
        setSchools(schoolsResponse.data);
        const studentsResponse = await ModelsService.listStudents(token);
        setStudents(studentsResponse.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleDelete = () => {
    ModelsService.deleteClub(token, club.id)
      .then((response) => {
        console.log(response);
        handleClose();
        navigate("/superadmin/clubs");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSave = (event: any) => {
    event.preventDefault();
    const updatedStudentsArray = club.students.map((student) => ({
      id: student.id,
    }));
    ModelsService.updateClub(token, club.id, {
      clubName: event.target[1].value,
      clubLogo: event.target[2].value,
      clubDescription: event.target[3].value,
      clubBanner: event.target[4].value,
      clubRating: event.target[5].value,
      ratingCount: event.target[6].value,
      school: schools.find((school) => school.id === event.target[7].value),
      students: updatedStudentsArray,
      email: club.email,
    })
      .then((response) => {
        console.log(response);
        navigate("/superadmin/clubs");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const studentsArray = Object.values(students);
  var strId = String(id);

  if (strId[strId.length - 1] === "1") {
    strId += "st";
  } else if (strId[strId.length - 1] === "2") {
    strId += "nd";
  } else if (strId[strId.length - 1] === "3") {
    strId += "rd";
  } else {
    strId += "th";
  }

  return (
    <>
      <Row className="row2">
        <Col className="col-md-2">
          <DashboardSidebarComponent option={"upclub"} />
        </Col>
        <Col className="col2">
          <div className="table-entity-add">
            <div className="header">
              <span style={{ fontSize: "1.5rem" }}>{strId + " Row"}</span>
            </div>
            {isLoading ? (
              <div className="is-loading">
                <CircularSpinner color="#000" size={60} speed={2} weight={3} />
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <div className="info">
                  <div className="info-row">
                    ID
                    <input type="text" value={club.id} disabled />
                  </div>
                  <div className="info-row">
                    CLUB NAME
                    <input
                      type="text"
                      placeholder="club name"
                      value={club.clubName}
                      onChange={(event) => {
                        const updatedClub = {
                          ...club,
                          clubName: event.target.value,
                        };
                        setClub(updatedClub);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    CLUB LOGO
                    <input
                      type="text"
                      placeholder="club logo"
                      value={club.clubLogo}
                      onChange={(event) => {
                        const updatedClub = {
                          ...club,
                          clubLogo: event.target.value,
                        };
                        setClub(updatedClub);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    CLUB DESCRIPTION
                    <textarea
                      placeholder="club description"
                      value={club.clubDescription}
                      onChange={(event) => {
                        const updatedClub = {
                          ...club,
                          clubDescription: event.target.value,
                        };
                        setClub(updatedClub);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    CLUB BANNER
                    <input
                      type="text"
                      placeholder="club banner"
                      value={club.clubBanner}
                      onChange={(event) => {
                        const updatedClub = {
                          ...club,
                          clubBanner: event.target.value,
                        };
                        setClub(updatedClub);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    CLUB RATING
                    <input
                      type="number"
                      placeholder="club rating"
                      value={club.clubRating}
                      onChange={(event) => {
                        const updatedClub = {
                          ...club,
                          clubRating: parseFloat(event.target.value),
                        };
                        setClub(updatedClub);
                      }}
                      min={0}
                      step={0.01}
                    />
                  </div>
                  <div className="info-row">
                    RATING COUNT
                    <input
                      type="number"
                      placeholder="rating count"
                      value={club.ratingCount}
                      onChange={(event) => {
                        const updatedClub = {
                          ...club,
                          ratingCount: parseInt(event.target.value, 10),
                        };
                        setClub(updatedClub);
                      }}
                      min={0}
                    />
                  </div>
                  <div className="info-row">
                    SCHOOL
                    <select
                      name=""
                      id=""
                      value={club.school.id}
                      onChange={(event) => {
                        const updatedClub = {
                          ...club,
                          school: { id: event.target.value },
                        };
                        setClub(updatedClub as Club);
                      }}
                    >
                      {schools.map((school) => (
                        <option key={school.id} value={school.id}>
                          {school.schoolName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="info-row">
                    FOLLOWERS
                    <div className="tags-container">
                      {club.students.map((student, index) => (
                        <div key={index} className="tag">
                          <span>
                            {(student.firstName + " " + student.lastName).slice(
                              0,
                              5
                            ) + "..."}
                          </span>
                          <button
                            className="btn delete-tag"
                            type="button"
                            onClick={() => {
                              const updatedClub = {
                                ...club,
                                students: club.students.filter(
                                  (_, i) => i !== index
                                ),
                              };
                              setClub(updatedClub);
                            }}
                          >
                            <XMarkIcon
                              width={20}
                              height={20}
                              stroke="black"
                              strokeWidth="1px"
                              style={{ transform: "translateY(-0.1rem)" }}
                            />
                          </button>
                        </div>
                      ))}
                      {isAdding
                        ? !(club.students.length == studentsArray.length) && (
                            <select
                              style={{
                                width: "7.9rem",
                                background: "none !important",
                              }}
                            >
                              {studentsArray
                                .filter(
                                  (student) =>
                                    !club.students.some(
                                      (s) => s.id === student.id
                                    )
                                )
                                .map((student, index) => (
                                  <option key={index} value={student.id}>
                                    {student.firstName + " " + student.lastName}
                                  </option>
                                ))}
                            </select>
                          )
                        : !(club.students.length == studentsArray.length) && (
                            <button
                              className="btn add-tag"
                              onClick={() => {
                                setIsAdding(true);
                              }}
                            >
                              <PlusIcon
                                width={20}
                                height={20}
                                stroke="black"
                                strokeWidth="1px"
                              />
                            </button>
                          )}
                      <div style={{ display: "flex", gap: "0.15rem" }}>
                        {isAdding &&
                          !(club.students.length == studentsArray.length) && (
                            <button
                              className="btn tag-save"
                              type="button"
                              onClick={() => {
                                const updatedClub = club;
                                updatedClub.students.push(
                                  studentsArray.find(
                                    (student) =>
                                      student.id ===
                                      (
                                        document.querySelector(
                                          ".tags-container select"
                                        ) as HTMLInputElement
                                      )?.value
                                  ) as Student
                                );
                                setClub(updatedClub);
                                setIsAdding(false);
                              }}
                            >
                              <CheckIcon
                                width={20}
                                height={20}
                                stroke="white"
                                strokeWidth="1px"
                              />
                            </button>
                          )}
                        {isAdding &&
                          !(club.students.length == studentsArray.length) && (
                            <button
                              className="btn tag-cancel"
                              type="button"
                              onClick={() => setIsAdding(false)}
                            >
                              <XMarkIcon
                                width={20}
                                height={20}
                                stroke="white"
                                strokeWidth="1px"
                              />
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                  <div className="info-row">
                    EMAIL
                    <input
                      type="text"
                      placeholder="email"
                      value={club.email}
                      onChange={(event) => {
                        const updatedClub = {
                          ...club,
                          email: event.target.value,
                        };
                        setClub(updatedClub);
                      }}
                    />
                  </div>
                  <div className="info-row">
                    PASSWORD
                    <input
                      type="text"
                      placeholder="password"
                      value={club.password}
                      disabled
                    />
                  </div>
                  <div className="info-btns">
                    <button className="btn save-update" type="submit">
                      Save
                    </button>
                    <button
                      className="btn delete"
                      type="button"
                      onClick={handleShow}
                    >
                      Delete
                    </button>
                    <button
                      className="btn cancel-update"
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
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Delete Club with name {club.clubName}?</Modal.Body>
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
            onClick={handleDelete}
          >
            Confirm
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SuperAdminEditClubComponent;
