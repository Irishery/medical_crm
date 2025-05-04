import React from 'react'
import Card from './Stats/Card'
import Graphic from './Stats/Graphic'

type Props = {}

const stats = [
    { title: 'За все время', number: '1,200' },
    { title: 'За этот месяц', number: 200 },
    { title: 'За этот день', number: 20 },
]

const HeadDoctorStats = (props: Props) => {
    return (
        <div>
            <h1 className="mb-10 text-left text-3xl font-bold">Статистика</h1>
            <h2 className="mb-8 text-left text-lg font-bold">Общий обзор</h2>
            <h3 className="text-md text-left text-[#4E7397]">
                Обследовано пациентов
            </h3>
            <div className="grid grid-cols-3 gap-3 pt-5">
                {stats.map(({ title, number }) => (
                    <Card title={title} number={number} />
                ))}
            </div>
            <div className="py-10">
                <Graphic />
            </div>
            <h3 className="text-md text-left text-[#4E7397]">Сотрудники</h3>
            <div className="grid grid-cols-3 gap-3 pt-5">
                {stats.map(({ title, number }) => (
                    <Card title={title} number={number} />
                ))}
            </div>
        </div>
    )
}

export default HeadDoctorStats
