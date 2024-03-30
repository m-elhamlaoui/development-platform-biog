import logo from './logo.svg';
import './App.css';
import supabase from "./config/supabaseClient.js";
import SuperAdminDash from "./pages/SuperAdminDash";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import AdminDash from "./pages/AdminDash";

function App() {
  console.log(supabase);
  return (
      <div className="App">
        <Router>
          <Routes>
                <Route path="/superAdminDash" element={<SuperAdminDash />} />
              <Route path="/AdminDash" element={<AdminDash />} />
          </Routes>
        </Router>
      </div>
  );
}

export default App;
