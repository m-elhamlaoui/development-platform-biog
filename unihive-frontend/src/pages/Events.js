import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";
import '../Styles/events.css';
import Sidebar from "../components/sidebar";

function Events() {
    return (<div className="events">
        <Navbar/>
        <div className="hr-lines">
        <div className="event-banner">
            <h1 >Events</h1>
</div>
</div>
<Sidebar/>
    <Footer/>
    </div> ); 
}

export default Events;