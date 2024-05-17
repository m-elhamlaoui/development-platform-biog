import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";
import StudentService from "../services/StudentService";
import Event from "../models/Event";
import { Form } from "react-bootstrap";
import { Cities } from "../models/Cities";
import { Schools } from "../models/Schools";
import { Categories } from "../models/Categories";


function EventComponent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filterEvent, setFilterEvent] = useState("");
  const [filterCategory, setFilterCategory] = useState({
    sport: false,
    music: false,
    art: false,
    technology: false,
    social: false,
    culture: false,
  });
  const [filterCity, setFilterCity] = useState("");
  const [filterSchool, setFilterSchool] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");



  

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
    StudentService.getEvents(token)
      .then((response) => {
        setEvents(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const filteredEvents = events.filter((event) => {
    return (
      event.eventName.toLowerCase().includes(filterEvent.toLowerCase()) &&
      (filterCity==="Choose" || event.eventLocation.toLowerCase().includes(filterCity.toLowerCase())) &&
      (filterSchool === "Choose" || event.club.clubName.toLowerCase().includes(filterSchool.toLowerCase())) &&
      (filterStartDate === "" || new Date(event.startTime) >= new Date(filterStartDate)) &&
      (filterEndDate === "" || new Date(event.endTime) <= new Date(filterEndDate)) &&
      (Object.keys(filterCategory).every((key) => !filterCategory[key]) || filterCategory[event.eventCategory])



    );
  });
  



  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterEvent(e.target.value);
  };
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCity(e.target.value);
  };
  const handleSchoolChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterSchool(e.target.value);
    console.log("Selected School:", e.target.value);

  };
  const handleStartDateChange= (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterStartDate(e.target.value);
  };
  const handleEndDateChange= (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterEndDate(e.target.value);
  };
  const handleCategoryChange = (event, category) => {
    const { checked } = event.target;
    setFilterCategory(prevState => ({ ...prevState, [category]: checked }));
    console.log("Selected category:", category);

  };
  
  
  
  

  return (
    <>
      <div
        className="Container"
        style={{
          width: "240px",
          margin: "40px",
          border: "1px solid",
          borderColor: "#2596be",
          borderRadius: "10px",
          padding: "20px",
        }}
      >
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="search"
              placeholder="Search"
              value={filterEvent}
              onChange={handleNameChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="select1" >
            <Form.Label>City</Form.Label>
            
            <Form.Select aria-label="Default select example"
            value={filterCity} 
            onChange={handleCityChange}>
            <option>Choose</option>
            {Object.values(Cities).map(city => (
    <option key={city} value={city}>{city}</option>
  ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="select2">
            <Form.Label>School</Form.Label>
            <Form.Select aria-label="Default select example"
             value={filterSchool} 
             onChange={handleSchoolChange}>
              <option>Choose</option>
              {Object.values(Schools).map(school => (
    <option key={school} value={school}>{school}</option>
  ))}
              
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3" controlId="dateStart">
            <Form.Label>From</Form.Label>
            <Form.Control type="date" value={filterStartDate} onChange={handleStartDateChange} />
            </Form.Group>

          <Form.Group className="mb-3" controlId="dateEnd">
            <Form.Label>To</Form.Label>
            <Form.Control type="Date" value={filterEndDate} onChange={handleEndDateChange} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Types </Form.Label>
            <div className="mb-3">
              {Object.values(Categories).map(category => (
                <Form.Check
                  key={category}
                  type="checkbox"
                  id={`default-checkbox-${category}`}
                  label={category.charAt(0).toUpperCase() + category.slice(1)}
                  onChange={(e) => handleCategoryChange(e, category)} 
                  checked={filterCategory[category]} 
                  
                />
              ))}
            </div>
            
          </Form.Group>
        </Form>
      </div>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {filteredEvents.map((event) => (
          <Card
            key={event.id}
            style={{
              width: "18rem",
              marginLeft: "10px",
              marginTop: "35px",
              height: "400px",
            }}
          >
            <div
              style={{
                height: "200px",
                overflow: "hidden",
                borderRadius: "20px",
                margin: "5px",
              }}
            >
              <img
                src={event.eventBanner}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
            <Card.Body>
              <Card.Title>{event.eventName}</Card.Title>
              <Card.Subtitle>{`From ${formatDate(
                event.startTime
              )} to ${formatDate(event.endTime)}`}</Card.Subtitle>
              <Button variant="primary" style={{ bottom: "10px" }} onClick={() => navigate(`/events/${event.id}`)}>
                Learn More
              </Button>
            </Card.Body>

            <a
              href={`/club/${event.club.id}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <h6 style={{ textAlign: "right", margin: 0 }}>
                {event.club.clubName}
              </h6>
            </a>
          </Card>
        ))}
      </div>
    </>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split("T")[0];
}

export default EventComponent;
