import React from 'react';
import Dashboard from "../components/Dashboard";

function AdminDash() {
    const menuItems = [];
    return (
        <div>
            <Dashboard userType='Admin' />
        </div>
    );
}

export default AdminDash;