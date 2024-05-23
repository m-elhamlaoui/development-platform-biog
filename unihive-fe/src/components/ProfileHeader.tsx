import React, { useState, useEffect } from 'react';
import StudentService from '../services/StudentService';
import { useNavigate, useParams } from 'react-router-dom';
import { isExpired } from 'react-jwt';
import Club from '../models/Club';
import Button from 'react-bootstrap/Button';
import Rating from "./RatingComponent";


function ProfileHeader() {
    let { id } = useParams();
    var token: string = "";

    const [club, setClub] = useState<Club| undefined>();
    if (localStorage.getItem("superadmin")) {
      token = localStorage.getItem("superadmin") as string;
    } else if (localStorage.getItem("admin")) {
      token = localStorage.getItem("admin") as string;
    } else if (localStorage.getItem("student")) {
      token = localStorage.getItem("student") as string;
    } 
     const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      StudentService.getClub(token, id)
        .then((response) => {
          setClub(response.data);
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  if (!club) {
    return null;
  }

  return (
    <div className="container" style={{ marginLeft: "200px" }}>
      <div
        style={{
          position: "relative",
          height: "350px",
          width: "900px",
          borderRadius: "20px",
        }}
      >
        <img
          src={club.clubBanner}
          className="background-image"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: "20px",
          }}
        />
        <img
          src={club.clubLogo}
          alt="Profile"
          className="profile-image"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-400px, 80px)",
            zIndex: "2",
          }}
        />
        
  </div>
  <div style={{marginTop:'0px',transform: 'translate(200px,10px)', width:'500px'}}>
  <div style={{ display: 'flex', flexDirection: 'inline' }}>
        <h2 style={{    color: 'black', zIndex: '2', textAlign: 'left', display: 'inlineBlock' }}>{club.clubName}</h2>
        <div className="rating" style={{marginLeft:'20px',backgroundColor:'white'}} >
                      <Rating value={club.clubRating} max={5} />
                      
                    </div>
        <Button variant="primary" style={{ transform: 'translate(160px,0px)',height: '50px'}}>Follow</Button>{' '}
        </div> 
        <p style={{  color: 'black', zIndex: '2', textAlign: 'left',transform: 'translate(0px,-40px)', marginTop:'40px' }}>

        {club.clubDescription}</p>
        </div>
        </div>
        


    );
}

export default ProfileHeader;
