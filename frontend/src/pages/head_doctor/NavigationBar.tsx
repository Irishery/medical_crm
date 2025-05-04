import { NavLink } from 'react-router-dom'
import NewPatient from '../../components/admin/NewPatient'
import NewAppointment from '../../components/admin/NewAppointment'
import Logout from '../../components/Logout'
import { CreateConsultationModal } from '../../pages/doctor/Consultations/EditConsultation'
import { CreateEmployeeModal } from './components/CreateEmployee'
import Avatar from '@/shared/Avatar'

function NavigationBar() {
    return (
        <nav id="admin-nav">
            <Avatar />
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
                        Администраторы
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
                <CreateEmployeeModal />
            </div>

            <Logout />
        </nav>
    )
}

export default NavigationBar
