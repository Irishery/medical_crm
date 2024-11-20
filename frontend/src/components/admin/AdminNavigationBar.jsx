import { NavLink } from "react-router-dom";
import "./css/AdminNavigationBar.css";

function AdminNavigationBar() {
    return (
        <nav id="admin-nav">
            <div className="admin-nav-header">
                <img src="https://img.freepik.com/free-vector/people-design-illustration_24877-49375.jpg" alt="Admin Avatar" className="admin-avatar" />
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
                    <NavLink to="/schedule" className={({ isActive }) => isActive ? "active" : ""}>
                        Расписание
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/patients" className={({ isActive }) => isActive ? "active" : ""}>
                        Пациенты
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/doctors" className={({ isActive }) => isActive ? "active" : ""}>
                        Врачи
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default AdminNavigationBar;
