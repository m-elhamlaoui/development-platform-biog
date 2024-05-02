import { Tab, Tabs } from "react-bootstrap";
import EventsByClub from "./EventsByClub";
import { useParams } from "react-router-dom";


function ClubTabs() {
  let { id } = useParams();
  

    return ( 
      <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3"
      style={{marginTop:'70px',width:'910px',marginLeft:'200px'}}
    >
      <Tab eventKey="event" title="Event">
        
        <EventsByClub  />
      </Tab>
      <Tab eventKey="about" title="About" >
      </Tab>
      <Tab eventKey="contact" title="Contact" >
      </Tab>
    </Tabs>);
}

export default ClubTabs;