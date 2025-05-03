import { Routes, Route } from 'react-router-dom'
import DoctorSchedule from './Schedule'
import DoctorPatients from './DoctorPatients'
import DoctorMedicalCard from './DoctorMedicalCard'
import NavigationBar from './NavigationBar'
import Consultations from './Consultations'

function Doctor() {
    return (
        <div id="admin-container">
            <NavigationBar />
            <div id="page-container" className="container pt-5">
                <Routes>
                    <Route path="schedule" element={<DoctorSchedule />} />
                    {/* <Route path="schedule" element={<AdminSchedule />} /> */}
                    {/* <Route path="schedule" element={<div>hello2</div>} /> */}
                    <Route path="patients" element={<DoctorPatients />} />
                    <Route path="consultations" element={<Consultations />} />
                    <Route
                        path="patients/:id/medical-card"
                        element={<DoctorMedicalCard />}
                    />
                    <Route path="*" element={<div>Страница не найдена</div>} />
                </Routes>
            </div>
        </div>
    )
}

export default Doctor
