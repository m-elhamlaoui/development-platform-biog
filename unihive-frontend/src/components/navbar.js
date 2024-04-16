import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import '../Styles/navbar.css'
import { FaUserCircle } from "react-icons/fa";

const Navbar = () => {
 return (
     <nav className="navbar" >
       <NavLink to="/" className="nav__logo">
         <img src='./Logov1.png' className="logo_img"/>
       </NavLink>

       <div id="nav-menu" className="menu">
         <ul >
           <li >
             <NavLink to="/" className="nav__link" >
               Home
             </NavLink>
           </li>
           <li >
             <NavLink to="/Events" className="nav__link">
               Events
             </NavLink>
           </li>
           <li >
             <NavLink
               to="/Contact" className="nav__link">
               Contact 
             </NavLink>
           </li>
           <li >
             <NavLink
               to="/AboutUs"className="nav__link">
               About Us
             </NavLink>
           </li>

           <li>
           <div class="user">
           <FaUserCircle className="user-icon" />
           <h4>User </h4>


           </div>
           </li>
         </ul>
         
       </div>

       
     </nav>
 );
};

export default Navbar;