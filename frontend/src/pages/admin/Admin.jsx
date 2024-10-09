import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom"

import AccountInfo from "../../components/AccountInfo"
import AdminNavigationBar from "../../components/admin/AdminNavigationBar"

import AdminProfile from "./AdminProfile"
import AdminSchedule from "./AdminSchedule"
import AdminPatients from "./AdminPatients"

import "./Admin.css"


function Admin() {
    const router = createBrowserRouter(
        createRoutesFromElements(<>
            <Route path="profile"  element={ <AdminProfile/> }/>
            <Route path="patients" element={ <AdminPatients/> }/>
            <Route path="schedule" element={ <AdminSchedule/> }/>
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

export default Admin