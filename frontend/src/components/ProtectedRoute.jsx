import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
    const token = localStorage.getItem("token");
    console.log(token)

    if (!token) {
        // If no token exists, redirect to login
        return <Navigate to="/login" />;
    }

    // Decode the token to check the user's role (if necessary)
    try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userRole = decodedToken.role;

        // Check if the user's role is allowed for this route
        if (allowedRoles && !allowedRoles.includes(userRole)) {
            return <Navigate to="/login" />;
        }
    } catch (error) {
        console.error("Invalid token:", error);
        return <Navigate to="/login" />;
    }

    // If the user is authenticated and authorized, render the children
    return children;
};

export default ProtectedRoute;
