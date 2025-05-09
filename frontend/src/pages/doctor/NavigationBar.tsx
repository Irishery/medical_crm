import { NavLink } from 'react-router-dom'
import NewPatient from '../../components/admin/NewPatient'
import NewAppointment from '../../components/admin/NewAppointment'
import Logout from '../../components/Logout'
import { CreateConsultationModal } from '../../pages/doctor/Consultations/EditConsultation'
import Avatar from '@/shared/Avatar'

function NavigationBar() {
    return (
        <nav id="admin-nav">
            <Avatar></Avatar>
            <ul className="admin-nav-menu">
                <li>
                    <NavLink
                        to="/doctor/schedule"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Расписание
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/doctor/consultations"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Консультации
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        to="/doctor/patients"
                        className={({ isActive }) => (isActive ? 'active' : '')}
                    >
                        Пациенты
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
