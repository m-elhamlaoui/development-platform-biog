import React, { useState, useEffect } from 'react';
import '../Styles/ProfileHeader.css';
import supabase from '../config/supabaseClient';
import Footer from '../components/Footer';

function ProfileHeader() {
    
          
        
    return (
        <div className="flex justify-center h-screen">
            <div className='container' style={{ backgroundImage: `./ensias_it_club_cover.jpg` }}>
                <div className="md:relative container" >
                    <div>
                        <img src='https://ensias-it-club.netlify.app/static/media/logo.cbb564333547ec70fb0b.png' alt="Profile" className="image" />
                    </div>
                </div>
            </div>
            <div className="clubName">ENSIAS IT CLUB</div>
            <button className="button">Follow</button>
            <div className="description">bla bla</div>
            
        <Footer/>


        </div>

    );
}

export default ProfileHeader;
