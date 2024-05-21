import React, { useEffect, useState } from 'react';
import '../Styles/ProfileHeader.css';
import Footer from "../components/Footer";
import Navbar from "../components/navbar";
import supabase from "../config/supabaseClient";
import SideMenu from "../components/SideMenu";

function AdminsTable() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetchAdmins();
    }, []);

    async function fetchAdmins() {
        try {
            const { data, error } = await supabase
                .from("admins")
                .select("*");

            if (error) {
                throw new Error(error.message);
            }

            setAdmins(data);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        }
    }

    return (
        <div>
            <Navbar />

            <div>
                <h2>List of Admins</h2>
                <ul>
                    {admins.map(admin => (
                        <li key={admin.id}>{admin.id}</li>
                        // Replace admin.name with the appropriate field from your database
                    ))}
                </ul>
            </div>
            <Footer />
        </div>
    );
}

export default AdminsTable;
