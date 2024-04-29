import { Col, Row, Table } from "react-bootstrap";
import DashboardSidebarComponent from "../components/DashboardSidebarComponent";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { useEffect, useState } from "react";
import ModelsService from "../services/SuperAdminModelsService";
import Event from "../models/Event";

function SuperAdminEventsComponent() {
  const [events, setEvents] = useState<Event[]>([]);
  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    ModelsService.listEvents(token)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const eventsArray = Object.values(events);
  const eventsCount = eventsArray.length;

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<Event[]>(events);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const results = events.filter(
      (event) =>
        event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.club.clubName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm, events]);

  const filteredEvents = searchTerm ? searchResults : eventsArray;

  return (
    <Row className="row2">
      <Col className="col-md-2">
        <DashboardSidebarComponent option={"events"} />
      </Col>
      <Col className="col2">
        <div className="table-entity">
          <div className="header">
            <span style={{ fontSize: "1.5rem" }}>Events Table</span>
            <span style={{ fontSize: "1.2rem" }}>
              {eventsCount} {eventsCount > 1 ? "rows" : "row"}
            </span>
          </div>
          <div className="table-bar3">
            <div>Search</div>
            <input
              type="text"
              placeholder="Event name, or club name"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          {eventsCount === 0 ? (
            <div className="no-data">No Data.</div>
          ) : (
            <div className="table-table">
              <Table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>EVENT NAME</th>
                    <th>EVENT CATEGORY</th>
                    <th>EVENT DESCRIPTION</th>
                    <th>EVENT LOCATION</th>
                    <th>START TIME</th>
                    <th>END TIME</th>
                    <th>EVENT BANNER</th>
                    <th>EVENT RATING</th>
                    <th>RATING COUNT</th>
                    <th>CLUB</th>
                    <th>EDIT/DELETE</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((event) => (
                    <tr key={event.id}>
                      <td>{event.id.slice(0, 4)}...</td>
                      <td>
                        {event.eventName.length > 4
                          ? event.eventName.slice(0, 4) + "..."
                          : event.eventName}
                      </td>
                      <td>
                        {event.eventCategory.length > 4
                          ? event.eventCategory.slice(0, 4) + "..."
                          : event.eventCategory}
                      </td>
                      <td>
                        {event.eventDescription.length > 12
                          ? event.eventDescription.slice(0, 12) + "..."
                          : event.eventDescription}
                      </td>
                      <td>
                        {event.eventLocation.length > 10
                          ? event.eventLocation.slice(0, 10) + "..."
                          : event.eventLocation}
                      </td>
                      <td>
                        {event.startTime!.toString()?.length > 4
                          ? event.startTime?.toString()?.slice(0, 4) + "..."
                          : event.startTime?.toString() ?? ""}
                      </td>
                      <td>
                        {event.endTime!.toString()?.length > 4
                          ? event.endTime?.toString()?.slice(0, 4) + "..."
                          : event.endTime?.toString() ?? ""}
                      </td>
                      <td>
                        {event.eventBanner.length > 4
                          ? event.eventBanner.slice(0, 4) + "..."
                          : event.eventBanner}
                      </td>
                      <td>{event.eventRating}</td>
                      <td>{event.ratingCount}</td>
                      <td>
                        {event.club.clubName.length > 4
                          ? event.club.clubName.slice(0, 4) + "..."
                          : event.club.clubName}
                      </td>
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
          )}
        </div>
        <button className="btn btn-add1" type="button">
          Add Event
        </button>
      </Col>
    </Row>
  );
}

export default SuperAdminEventsComponent;
