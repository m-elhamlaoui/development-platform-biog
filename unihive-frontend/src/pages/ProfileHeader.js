import React, { useState, useEffect } from 'react';
import '../Styles/ProfileHeader.css';
import supabase from '../config/supabaseClient';
import Footer from '../components/Footer';

function ProfileHeader() {
    const [clubImageUrl, setClubImageUrl] = useState('');
    const [clubBannerUrl, setClubBannerUrl] = useState('');
    const [club , setClubData]= useState('');
    useEffect(() => {
        fetchClubData(); 
    }, []);

    async function fetchClubData() {
        try {
            const { data, error } = await supabase
                .from("clubs")
                .select()
                .eq('id', '66bbc305-20f5-450b-b938-0bee72be26fa');
    
            if (error) {
                throw new Error(error.message);
            }

            const clubData = data[0];
            
            
            setClubData(clubData);
        } catch (error) {
            console.error('Error fetching club data:', error);
        }
    }
    console.log('Club:', club); 

    return (
        <div className="flex justify-center h-screen">
            <div className='container' style={{ backgroundImage: `url(${clubBannerUrl})` }}>
                <div className="md:relative container" >
                    <div>
                        <img src={club?.club_logo} alt="Profile" className="image" />
                    </div>
                </div>
            </div>
            <div className="clubName">{club.club_name}</div>
            <button className="button">Follow</button>
            <div className="description">{club.club_description}</div>
            <nav>
                <ul>
                    <li><a href="#">Events</a></li>
                    <li><a href="#">Contact</a></li>
                    <li><a href="#">About</a></li>
                </ul>
            </nav>
        <Footer/>


        </div>

    );
}

export default ProfileHeader;
