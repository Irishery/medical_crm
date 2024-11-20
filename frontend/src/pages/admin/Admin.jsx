import { BrowserRouter, createBrowserRouter, createRoutesFromElements, Route, Routes, RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import AccountInfo from "../../components/AccountInfo";
import AdminNavigationBar from "../../components/admin/AdminNavigationBar";

import AdminProfile from "./AdminProfile";
import AdminSchedule from "./AdminSchedule";
import AdminPatients from "./AdminPatients";
import AdminDoctors from "./AdminDoctors";

// import "../../index.css";
import "./css/Admin.css";

function Admin() {
    return (
        <BrowserRouter>
            <div id="admin-container">
                {/* <AccountInfo /> */}
                <AdminNavigationBar />
                <div id="page-container">
                    <Routes>
                        {/* <Route path="/profile" element={<AdminProfile />} /> */}
                        <Route path="/schedule" element={<AdminSchedule />} />
                        <Route path="/patients" element={<AdminPatients />} />
                        <Route path="/doctors" element={<AdminDoctors />} />
                        <Route path="*" element={<div>Page not found</div>} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}
createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Admin />
    </StrictMode>
);
