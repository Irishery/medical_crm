import { NavLink } from 'react-router-dom'
import NewPatient from '../../components/admin/NewPatient'
import NewAppointment from '../../components/admin/NewAppointment'
import Logout from '../../components/Logout'
import { CreateConsultationModal } from '../../pages/doctor/Consultations/EditConsultation'

function NavigationBar() {
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
                <li>
                    <NavLink
                        to="/head_doctor/schedule"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Расписание
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/head_doctor/administrators"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Консультации
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/head_doctor/patients"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Пациенты
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/head_doctor/doctors"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Врачи
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/head_doctor/stats"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Статистика
                    </NavLink>
                </li>
            </ul>
            <div className="mb-10 flex flex-col gap-2">
                <CreateConsultationModal />
            </div>

            <Logout />
        </nav>
    )
}

export default NavigationBar
