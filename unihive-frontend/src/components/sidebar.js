import React from "react";
import '../Styles/sidebar.css';
function Sidebar() {
    return ( 
      <div className="sidebar">
        <form action="/">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" placeholder="Search"/>
  
          <label htmlFor="School">School:</label>
          <select id="school" name="school">
            <option value="">Select</option>
          </select>
          <label htmlFor="City">City:</label>
          <select id="city" name="city">
            <option value="">Select</option>
          </select>
  
          <label htmlFor="club">Club:</label>
          <select id="club" name="club">
            <option value="">Select</option>
          </select>
  
          <label htmlFor="from-date">From:</label>
          <input type="date" id="from-date" name="from-date" />
  
          <label htmlFor="to-date">To:</label>
          <input type="date" id="to-date" name="to-date" />
  
          <label htmlFor="type">Type:</label>
          <select id="type" name="type">
            <option value="">All</option>
            <option value="sport">Sport</option>
            <option value="music">Music</option>
            <option value="technology">Technology</option>
            <option value="culture">Culture</option>
            <option value="social">Social</option>
            <option value="art">Art</option>
          </select>
  
          <button type="submit">Search</button>
        </form>
      </div>
    );
  }
  
  export default Sidebar;
  