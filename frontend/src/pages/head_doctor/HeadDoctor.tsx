import React from 'react'
import NavigationBar from './NavigationBar'
import { Route, Routes } from 'react-router-dom'
import HeadDoctorSchedule from './HeadDoctorSchedule'
import HeadDoctorPatients from './HeadDoctorPatients'
import HeadDoctorAdministrators from './HeadDoctorAdministrators'
import HeadDoctorDoctors from './HeadDoctorDoctor'
import HeadDoctorStats from './HeadDoctorStats'
import DoctorDatabase from '@/components/DoctorBase'
import AdministratorsDatabase from '@/components/AdministratorBase'

type Props = {}

function HeadDoctor() {
    return (
        <div id="admin-container">
            <NavigationBar />
            <div id="page-container" className="container pb-10 pt-5">
                <Routes>
                    <Route path="schedule" element={<HeadDoctorSchedule />} />
                    <Route
                        path="administrators"
                        element={<AdministratorsDatabase />}
                    />
                    <Route path="patients" element={<HeadDoctorPatients />} />
                    <Route path="doctors" element={<DoctorDatabase />} />
                    <Route path="stats" element={<HeadDoctorStats />} />
                    <Route path="*" element={<div>Страница не найдена</div>} />
                </Routes>
            </div>
        </div>
    )
}

export default HeadDoctor
