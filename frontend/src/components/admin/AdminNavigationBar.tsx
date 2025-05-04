import { NavLink } from 'react-router-dom'
import './css/AdminNavigationBar.css'
import NewPatient from './NewPatient'
import NewAppointment from './NewAppointment'
import Logout from '../Logout'
import Avatar from '@/shared/Avatar'

function AdminNavigationBar() {
    return (
        <nav id="admin-nav">
            <Avatar></Avatar>
            <ul className="admin-nav-menu">
                {/* <li>
                    <NavLink to="/profile" className={({ isActive }) => isActive ? "active" : ""}>
                        Профиль
                    </NavLink>
                </li> */}
                <li>
                    <NavLink
                        to="/admin/schedule"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Расписание
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/patients"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Пациенты
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/admin/doctors"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Врачи
                    </NavLink>
                </li>
            </ul>
            <div className="mb-10 flex flex-col gap-2">
                <NewPatient />
                <NewAppointment />
            </div>

            <Logout />
        </nav>
    )
}

export default AdminNavigationBar
