import React from "react";
import { Routes, Route } from "react-router-dom";

import AdminNavigationBar from "../../components/admin/AdminNavigationBar";

import AdminProfile from "./AdminProfile";
import AdminSchedule from "./AdminSchedule";
import AdminPatients from "./AdminPatients";
import AdminDoctors from "./AdminDoctors";
import NewPatient from "../../components/admin/NewPatient";

import "./css/Admin.css";

function Admin() {
    return (
        <div id="admin-container">
            <AdminNavigationBar />
            <div id="page-container" className="container pt-5">
                <Routes>
                    {/* <Route path="/profile" element={<AdminProfile />} /> */}
                    <Route path="schedule" element={<AdminSchedule />} />
                    <Route path="patients" element={<AdminPatients />} />
                    <Route path="doctors" element={<AdminDoctors />} />
                    <Route path="*" element={<div>Page not found</div>} />
                </Routes>
            </div>
        </div>
    );
}

export default Admin;
