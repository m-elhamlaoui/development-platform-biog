import React, { useState, useEffect } from 'react';
import StudentService from '../services/StudentService';
import { useNavigate, useParams } from 'react-router-dom';
import { isExpired } from 'react-jwt';
import Club from '../models/Club';
import Button from 'react-bootstrap/Button';

function ProfileHeader() {
    let { id } = useParams();

    const [club, setClub] = useState<Club| undefined>();
  const token = localStorage.getItem("user") as string;
  const isMyTokenExpired = isExpired(token);
  const navigate = useNavigate();

  useEffect(() => {
    if (isMyTokenExpired) {
      localStorage.removeItem("user");
      navigate("/login");
    }
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
   <div className="container" style={{ marginLeft:'200px'}}  >
        <div style={{ position: 'relative',  height: '350px', width:'900px',borderRadius:'20px' }} >
        <img
            src={club.clubBanner}
            className="background-image"
            style={{  width: '100%', height: '100%',objectFit: 'cover', position: 'absolute', top: 0, left: 0 ,borderRadius:'20px'}}
        />
        <img
            src={club.clubLogo}
            alt="Profile"
            className="profile-image"
            style={{ width: '150px', height: '150px', borderRadius: '50%', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-400px, 80px)', zIndex: '2' }}
        />
        
  </div>
  <div style={{marginTop:'0px',transform: 'translate(200px,10px)'}}>
        <h2 style={{    color: 'black', zIndex: '2', textAlign: 'left', display: 'inlineBlock' }}>{club.clubName}</h2>
        <Button variant="primary" style={{ transform: 'translate(600px,-40px)'}}>Follow</Button>{' '}

        <p style={{  color: 'black', zIndex: '2', textAlign: 'left',transform: 'translate(0px,-40px)' }}>

        {club.clubDescription}</p>
        </div>
        </div>
        


    );
}

export default ProfileHeader;
