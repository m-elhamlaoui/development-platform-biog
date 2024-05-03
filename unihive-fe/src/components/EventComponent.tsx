import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { isExpired } from "react-jwt";
import { useNavigate } from "react-router-dom";
import StudentService from "../services/StudentService";
import Event from "../models/Event";
import { Form } from "react-bootstrap";

function EventComponent() {
  const [events, setEvents] = useState<Event[]>([]);
  const [filterEvent, setFilterEvent] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    } else {
      StudentService.getEvents(token)
        .then((response) => {
          setEvents(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  });

  const filteredEvents = events.filter(event =>
    event.eventName.toLowerCase().includes(filterEvent.toLowerCase()) &&
    event.eventCategory.toLowerCase().includes(filterCategory.toLowerCase())
  );

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterEvent(e.target.value);
    setFilterCategory(e.target.value);
  };

  return (
    <>
      <div className="Container" style={{ width: '240px', margin: '40px', border: '1px solid', borderColor: '#2596be', borderRadius: '10px', padding: '20px' }}>
        <Form>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="search" placeholder="Search" value={filterEvent} onChange={handleFilterChange} />
          </Form.Group>

         <Form.Group className="mb-3" controlId="select1">
        <Form.Label>City</Form.Label>
        <Form.Select aria-label="Default select example">
            <option>Choose</option>
            <option value="1">Rabat</option>
            <option value="2">Casablanca</option>
            <option value="3">Mohammadia</option>
            <option value="3">Marrakech</option>
            <option value="3">Agadir</option>
            <option value="3">Meknes</option>
            <option value="3">Kenitra</option>
            <option value="3">Tanger</option>
            <option value="3">Benguerir</option>
            <option value="3">Jadida</option>
            <option value="3">Safi</option>
            <option value="3">Salé</option>
      </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="select2">
        <Form.Label>School</Form.Label>
        <Form.Select aria-label="Default select example">
            <option>Choose</option>
            <option value="1">ENSIAS</option>
            <option value="2">INPT</option>
            <option value="3">EMI</option>
            <option value="3">ENSEM</option>
            <option value="3">ESITH</option>
            <option value="3">ENSAM</option>
            <option value="3">ENSA</option>
            <option value="3">IAV</option>
            <option value="3">ENSETH</option>
            <option value="3">FST</option>
            <option value="3">EHTP</option>
            <option value="3">INSEA</option>
      </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="dateStart">
        <Form.Label>From</Form.Label>
        <Form.Control type="Date"  />
        </Form.Group>
        <Form.Group className="mb-3" controlId="dateEnd">
        <Form.Label>To</Form.Label>
        <Form.Control type="Date"  />
      </Form.Group>
      
  <Form.Group>
  <Form.Label>Types </Form.Label>
  <div className="mb-3">
    <Form.Check 
      type="checkbox"
      id="default-checkbox-sport"
      label="Sport"
    />
    <Form.Check 
      type="checkbox"
      id="default-checkbox-music"
      label="Music"
    />
    <Form.Check 
      type="checkbox"
      id="default-checkbox-art"
      label="Technologie"
    />
    <Form.Check 
      type="checkbox"
      id="default-checkbox-social"
      label="Social"
    />
    <Form.Check 
      type="checkbox"
      id="default-checkbox-culture"
      label="Culture"
    />
    
  </div>
  <Form.Control type="checkbox" value={filterEvent} onChange={handleFilterChange} />

</Form.Group>

    </Form>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {filteredEvents.map((event) => (
           <Card key={event.id} style={{ width: '18rem', marginLeft: '10px' , marginTop:'35px',height:'400px'}}>
           <div style={{ height: '200px', overflow: 'hidden', borderRadius: '20px',margin:'5px' }}>
             <img src={event.eventBanner} style={{ width: '100%', height: 'auto' }} />
           </div>       
            <Card.Body>
             <Card.Title>{event.eventName}</Card.Title>
             <Card.Subtitle>{`From ${formatDate(event.startTime)} to ${formatDate(event.endTime)}`}</Card.Subtitle>
             <Button variant="primary" style={{bottom: '10px' }} >Learn More</Button>
             
           </Card.Body>
   
           <a href={`/club/${event.club.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
     <h6 style={{ textAlign: 'right', margin: 0 }}>{event.club.clubName}</h6>
   </a>
   
    
   
         </Card>
        ))}
      </div>
    </>
  );
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}

export default EventComponent;
