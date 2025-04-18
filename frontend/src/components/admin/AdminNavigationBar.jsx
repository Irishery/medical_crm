import { NavLink } from "react-router-dom";
import "./css/AdminNavigationBar.css";
import NewPatient from "../../components/admin/NewPatient";
import NewAppointment from "../../components/admin/NewAppointment";
import Logout from "../../components/Logout";

function AdminNavigationBar() {
    return (
        <nav id="admin-nav">
            <div className="admin-nav-header">
                <img
                    src="https://img.freepik.com/free-vector/people-design-illustration_24877-49375.jpg"
                    alt="Admin Avatar"
                    className="admin-avatar"
                />
                <div className="admin-info">
                    <h3>Светлана Светлановна</h3>
                    <p className="admin-role">Администратор</p>
                </div>
            </div>
            <ul className="admin-nav-menu">
                {/* <li>
                    <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
                        Профиль
                    </NavLink>
                </li> */}
                <li>
                    <NavLink
                        to="/admin/schedule"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Расписание
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/patients"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Пациенты
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/doctors"
                        className={({ isActive }) => (isActive ? "active" : "")}
                    >
                        Врачи
                    </NavLink>
                </li>
            </ul>
            <div className="flex gap-2 flex-col mb-10">
                <NewPatient />
                <NewAppointment />
            </div>

           <Logout />
        </nav>
    );
}

export default AdminNavigationBar;
