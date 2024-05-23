import './App.css';
import supabase from "./config/supabaseClient.js";
import SuperAdminDash from "./pages/SuperAdminDash";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import AdminDash from "./pages/AdminDash";
import Home from './pages/home.js';
import ProfileHeader from './pages/ProfileHeader.js';
import Events from './pages/Events.js';
import Contact from './pages/Contact.js';
import AboutUs from './pages/AboutUs.js';

function App() {
  console.log(supabase);
  return (
      <div className="App">
        <Router>
          <Routes>
            <Route path='/Profile' element={<ProfileHeader/>}></Route>
            <Route path='/' element={<Home/>}></Route>
            <Route path="/superAdminDash" element={<SuperAdminDash />} />
            <Route path="/AdminDash" element={<AdminDash />} />
            <Route path="/Events" element={<Events />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/AboutUs" element={<AboutUs />} />

          </Routes>
        </Router>
      </div>
  );
}

export default App;
