import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";
import EventService from "../services/EventService";
import Event from "../models/Event";

function EventComponent() {
  const [events, setEvents] = useState<Event[]>([]);
  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    }
    EventService.getEvents(token)
      .then((response) => {
        setEvents(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <> </> /*<Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src="./src/assets/itholic3.PNG" 
    style={{ margin: '10px',width:'260px',height:"200px", borderRadius: '10px' }}/>
    <Card.Body>
      <Card.Subtitle>From 1 March 2024 to 3 March 2024</Card.Subtitle>

      <Card.Title>ITHOLIC V3: The future of ITOPS</Card.Title>
      
    </Card.Body>
</Card>*/
  );
}

export default EventComponent;
