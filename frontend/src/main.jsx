import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom"

import Admin from "./pages/admin/Admin"

import "./index.css"


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Admin/>
    </StrictMode>
);