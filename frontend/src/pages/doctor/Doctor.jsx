import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import DoctorSchedule from "./DoctorSchedule";
import DoctorPatients from "./DoctorPatients";
import DoctorMedicalCard from "./DoctorMedicalCard";

function Doctor() {
    return (
        <div className="doctor-dashboard">
            <nav>
                <Link to="schedule">Расписание</Link>
                <Link to="patients">Мои Пациенты</Link>
            </nav>
            <Routes>
                <Route path="schedule" element={<DoctorSchedule />} />
                <Route path="patients" element={<DoctorPatients />} />
                <Route path="patients/:id/medical-card" element={<DoctorMedicalCard />} />
                <Route path="*" element={<div>Страница не найдена</div>} />
            </Routes>
        </div>
    );
}

export default Doctor;
