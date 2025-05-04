import { Link, NavLink } from 'react-router-dom'
import NewPatient from '../../components/admin/NewPatient'
import NewAppointment from '../../components/admin/NewAppointment'
import Logout from '../../components/Logout'
import { CreateConsultationModal } from '../../pages/doctor/Consultations/EditConsultation'
import Avatar from '@/shared/Avatar'
import { Button } from '@mui/material'

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
                <Link to="/doctor/consultations/create" className="w-full">
                    <Button className="w-full" variant="contained">
                        Новая консультация
                    </Button>
                </Link>
            </div>

            <Logout />
        </nav>
    )
}

export default NavigationBar
