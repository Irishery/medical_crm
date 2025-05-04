import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Admin from './admin/Admin' // Admin dashboard
import Doctor from './doctor/Doctor' // Doctor dashboard
import HeadDoctor from './head_doctor/HeadDoctor' // Doctor dashboard
import Login from './login/Login' // Login page
import ProtectedRoute from '../components/ProtectedRoute' // Protected route
import DoctorSchedule from './doctor/Schedule'
import { Toaster } from 'mui-sonner'

function App() {
    return (
        <>
            <Toaster />
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="/admin/*"
                        element={
                            <ProtectedRoute allowedRoles={['admin']}>
                                <Admin />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/doctor/*"
                        element={
                            <ProtectedRoute allowedRoles={['doctor']}>
                                <Doctor />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/head_doctor/*"
                        element={
                            <ProtectedRoute allowedRoles={['head_doctor']}>
                                <HeadDoctor />
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<div>Page not found</div>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App
