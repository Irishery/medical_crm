import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Admin from "./admin/Admin"; // Admin dashboard
import Doctor from "./doctor/Doctor"; // Doctor dashboard
import Login from "./login/Login"; // Login page
import ProtectedRoute from "../components/ProtectedRoute"; // Protected route

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public route */}
                <Route path="/login" element={<Login />} />

                {/* Protected routes */}
                <Route
                    path="/admin/*"
                    element={
                        <ProtectedRoute allowedRoles={["admin"]}>
                            <Admin />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/doctor/*"
                    element={
                        <ProtectedRoute allowedRoles={["doctor"]}>
                            <Doctor />
                        </ProtectedRoute>
                    }
                />

                {/* Fallback */}
                <Route path="*" element={<div>Page not found</div>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
