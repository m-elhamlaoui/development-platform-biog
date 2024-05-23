import { useEffect, useState } from "react";
import { isExpired } from "react-jwt";
import { useParams } from "react-router-dom";
import Student from "../models/Event";
import StudentService from "../services/StudentService";
import EventTime from "./EventTime";
import Button from "react-bootstrap/Button";
import Rating from "./RatingComponent";
import UserRating from "./Rating";



function EventPage() {
  let { id } = useParams();
  var token: string = "";

  const [event, setEvent] = useState<Event>();
  if (localStorage.getItem("superadmin")) {
    token = localStorage.getItem("superadmin") as string;
  } else if (localStorage.getItem("admin")) {
    token = localStorage.getItem("admin") as string;
  } else if (localStorage.getItem("student")) {
    token = localStorage.getItem("student") as string;
  } 
  const isMyTokenExpired = isExpired(token);

  useEffect(() => {
    if (id) {
      StudentService.getEvent(token, id)
        .then((response) => {
          setEvent(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }   
  }, [id]);


  return (
    <>
      <div className="container" style={{width:"700px" ,marginLeft:"300px"}}>
      <div
        style={{
          position: "relative",
          height: "290px",
          borderRadius: "20px",
        }}
      >
          {event && event.eventBanner && ( 
            <img
              src={event.eventBanner}
              className="background-image"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "fill",
                position: "absolute",
                top: 0,
                left: 0,
                borderRadius: "20px",
              }}
              alt="Event Banner"
            />
            

          )}
          
        </div>
        <div style={{ display: "flex",
         flexDirection: "row" ,
         borderBottom: "1px solid grey",
          paddingBottom: "50px" ,
           }}>
        <div>
        <div style={{fontSize:"20px", color:"#13a6ec"  }}>
                    {event?.eventCategory}
                  </div>

        <div style={{fontSize:"30px",width:"400px" }}>
                    {event?.eventName}
                  </div>
                  </div>
        <div className="col" style={{marginRight:"0px" }}>
                    <button className="club" type="button">
                      <img
                        width="20%"
                        src={event?.club.clubLogo}
                        alt="club logo"
                      />
                      <span>
                        {event?.club.clubName}
                      </span>
                    </button>
                  </div>
        
      </div>
      <div style={{ display: "flex", flexDirection: "row",height:"400px" }}>
        <div style={{ borderRight: "1px solid grey",width:"400px"}}>
        <div style={{ height: "200px" ,marginRight:"30px"}}>
          <EventTime startTime={event?.startTime} endTime={event?.endTime} />
          <Button variant="primary" style={{ bottom: "10px", marginTop: "10px" }}>
            Add to calendar
          </Button>
          <div className="rating">
            <UserRating />
          </div>
        </div>
        </div>
        <div style={{marginTop:"20px" , marginLeft:"20px"
        }}>        
        <div style={{fontSize:"22px",fontWeight: "bold"}}>
          Description
    </div>    
    <div>
    {event?.eventDescription}

      </div>   
     </div>
      </div>
    </div>
    </>
  );
}

export default EventPage;
