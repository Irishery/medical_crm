import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import AccountInfo from "../../components/AccountInfo"
import AdminNavigationBar from "../../components/admin/AdminNavigationBar"

import AdminProfile from "./AdminProfile"
import AdminSchedule from "./AdminSchedule"
import AdminPatients from "./AdminPatients"

import "../../index.css"
import "./Admin.css"
import AdminDoctors from "./AdminDoctors"


function Admin() {
    const router = createBrowserRouter(
        createRoutesFromElements(<>
            <Route path="/"        element={ <AdminProfile/> }/>
            <Route path="schedule" element={ <AdminSchedule/> }/>
            <Route path="patients" element={ <AdminPatients/> }/>
            <Route path="doctors"  element={ <AdminDoctors/> }/>
        </>)
    )

    return (<>
        <div id="admin-container">
            <AccountInfo/>
            <AdminNavigationBar/>
            <div id="page-container">
                <RouterProvider router={ router }/>
            </div>
        </div>
    </>)
}


createRoot(document.getElementById("root")).render(
    <StrictMode>
        <Admin/>
    </StrictMode>
);