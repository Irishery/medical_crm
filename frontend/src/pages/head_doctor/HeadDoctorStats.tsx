import React, { useEffect, useState } from 'react'
import Card from './Stats/Card'
import Graphic from './Stats/Graphic'
import { fetchStatsEmployees } from './api/fetchStatsEmployees'
import { fetchStatsPatients } from './api/fetchStatsPatients'

type Props = {}

const stats = [
    { title: 'За все время', number: '1,200' },
    { title: 'За этот месяц', number: 200 },
    { title: 'За этот день', number: 20 },
]

const patientsMapper = {
    total_patients: 'Всего пациентов',
    monthly_patients: 'За этот месяц',
    daily_patients: 'За этот день',
} as const

const employeesMapper = {
    total_employees: 'Всего работников',
    total_doctors: 'Докторов',
    total_admins: 'Администраторов',
} as const

const HeadDoctorStats = (props: Props) => {
    const [patientsStats, setPatientsStats] = useState<{
        total_patients: string
        monthly_patients: string
        daily_patients: string
    }>({
        total_patients: '',
        monthly_patients: '',
        daily_patients: '',
    })
    const [employeesStats, setEmployeesStats] = useState<{
        total_employees: string
        total_doctors: string
        total_admins: string
    }>({
        total_employees: '',
        total_doctors: '',
        total_admins: '',
    })
    useEffect(() => {
        const fetchData = async () => {
            const eStats = await fetchStatsEmployees()
            const pStats = await fetchStatsPatients()

            return [eStats, pStats]
        }

        fetchData().then((res) => {
            const [e, p] = res
            setPatientsStats(p)
            setEmployeesStats(e)
        })
    })

    return (
        <div>
            <h1 className="mb-10 text-left text-3xl font-bold">Статистика</h1>
            <h2 className="mb-8 text-left text-lg font-bold">Общий обзор</h2>
            <h3 className="text-md text-left text-[#4E7397]">
                Обследовано пациентов
            </h3>
            <div className="grid grid-cols-3 gap-3 pt-5">
                {Object.entries(patientsStats).map(([key, value]) => (
                    <Card title={patientsMapper[key]} number={value} />
                ))}
            </div>
            <div className="py-10">
                <Graphic />
            </div>
            <h3 className="text-md text-left text-[#4E7397]">Сотрудники</h3>
            <div className="grid grid-cols-3 gap-3 pt-5">
                {Object.entries(employeesStats).map(([key, value]) => (
                    <Card title={employeesMapper[key]} number={value} />
                ))}
            </div>
        </div>
    )
}

export default HeadDoctorStats
