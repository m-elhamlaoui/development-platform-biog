import { Col, Row } from "react-bootstrap";
import DashboardSidebarComponent from "../AdminDashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import ModelsService from "../../services/AdminModelsService";
import Club from "../../models/Club";
import { CircularSpinner } from "infinity-spinners";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import { decodeToken } from "react-jwt";
import School from "../../models/School";

function AdminAddEventComponent() {
  const [clubs, setClubs] = useState<Club[]>([]);
  const [school, setSchool] = useState<School>();
  const [isDisabled, setIsDisabled] = useState(false);
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

  const handleSave = (event: any) => {
    setIsDisabled(true);
    event.preventDefault();
    ModelsService.addEvent(
      token,
      {
        eventName: event.target[0].value,
        eventCategory: event.target[1].value,
        eventDescription: event.target[2].value,
        eventLocation: event.target[3].value,
        eventBanner: event.target[4].value,
        club: { id: event.target[5].value } as Club,
        startTime: event.target[6].value + ":00Z",
        endTime: event.target[7].value + ":00Z",
      },
      school!.id
    )
      .then((response) => {
        console.log(response);
        enqueueSnackbar("Event added successfully", {
          variant: "success",
          autoHideDuration: 1000,
          transitionDuration: 300,
          anchorOrigin: {
            vertical: "top",
            horizontal: "right",
          },
          preventDuplicate: true,
          onClose: () => {
            navigate("/admin/events");
          },
        });
      })
      .catch((error) => {
        console.error(error);
        setIsDisabled(false);
        enqueueSnackbar("Failed to add event", {
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

  return (
    <>
      <SnackbarProvider maxSnack={4} />
      <Row className="row2">
        <Col className="col-md-2">
          <DashboardSidebarComponent option={"addevent"} />
        </Col>
        <Col className="col2">
          <div className="table-entity-add">
            <div className="header">
              <span style={{ fontSize: "1.5rem" }}>Add Event</span>
            </div>
            {isLoading ? (
              <div className="is-loading">
                <CircularSpinner color="#000" size={60} speed={2} weight={3} />
              </div>
            ) : (
              <form onSubmit={handleSave}>
                <div className="info">
                  <div className="info-row">
                    EVENT NAME
                    <input type="text" placeholder="event name" />
                  </div>
                  <div className="info-row">
                    EVENT CATEGORY
                    <input type="text" placeholder="event category" />
                  </div>
                  <div className="info-row">
                    EVENT DESCRIPTION
                    <textarea placeholder="event description" />
                  </div>
                  <div className="info-row">
                    EVENT LOCATION
                    <input type="text" placeholder="event location" />
                  </div>
                  <div className="info-row">
                    EVENT BANNER
                    <input type="text" placeholder="event banner" />
                  </div>
                  <div className="info-row">
                    CLUB
                    <select name="" id="">
                      {clubs.map((club) => (
                        <option key={club.id} value={club.id}>
                          {club.clubName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="info-row">
                    START TIME
                    <input type="datetime-local" placeholder="start time" />
                  </div>
                  <div className="info-row">
                    END TIME
                    <input type="datetime-local" placeholder="end time" />
                  </div>
                  <div className="info-btns">
                    <button
                      className="btn save-save"
                      type="submit"
                      disabled={isDisabled}
                    >
                      Save
                    </button>
                    <button
                      className="btn cancel-save"
                      type="button"
                      onClick={() => navigate("/admin/events")}
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
    </>
  );
}

export default AdminAddEventComponent;
