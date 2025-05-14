import React, { useState, useEffect } from 'react'
import { Button, TextField, Box } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'
import { fetchYears } from './api/fetchYears'
import { fetchByYearMonth } from './api/fetchByYearMonth'
import { FaArrowRight } from 'react-icons/fa'
import { FaArrowLeft } from 'react-icons/fa'
import moment from 'moment'
import { WeekCalendar } from './Сalendares'
import dayjs, { Dayjs } from 'dayjs'
import { DateCalendar } from '@mui/x-date-pickers'

// Компонент для отображения графика
const ChartComponent = ({ data, period }) => {
    const chartData = data
        ?.map((item: any) => ({
            label: item.date,
            value: item.value,
        }))
        .filter((itemA: any, itemB: any) =>
            itemA.label.localeCompare(itemB.label)
        )

    return (
        <BarChart
            yAxis={[
                {
                    tickLabelInterval: (value: any, index: any) =>
                        Number.isInteger(value),
                },
            ]}
            xAxis={[
                {
                    id: 'date',
                    data: chartData.map((item) => item.label),
                    scaleType: 'band',
                },
            ]}
            series={[
                {
                    data: chartData.map((item) => item.value),
                },
            ]}
            width={800}
            height={400}
        />
    )
}

// Главный компонент
const StatisticsChart = () => {
    const [period, setPeriod] = useState('year') // 'year', 'month', 'week'
    const [data, setData] = useState<{ date: string; value: number }[]>([])
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [currentDate, setCurrentDate] = useState(new Date())

    const handleNext = () => {
        const newDate = new Date(currentDate)
        switch (period) {
            case 'month':
                newDate.setMonth(newDate.getMonth() + 1)
                break
            case 'week':
                newDate.setDate(newDate.getDate() + 7)
                break
            default:
                throw new Error('Invalid period')
        }
        setCurrentDate(newDate)
        setFrom(newDate.toISOString().split('T')[0])
    }

    const handlePrev = () => {
        const newDate = new Date(currentDate)
        switch (period) {
            case 'month':
                newDate.setMonth(newDate.getMonth() - 1)
                break
            case 'week':
                newDate.setDate(newDate.getDate() - 7)
                break
            default:
                throw new Error('Invalid period')
        }
        setCurrentDate(newDate)
        setFrom(newDate.toISOString().split('T')[0])
    }
    useEffect(() => {
        const loadData = async () => {
            try {
                const year = currentDate.getFullYear()
                const month = currentDate.getMonth() + 1

                let result
                switch (period) {
                    case 'year':
                        result = await fetchYears()
                        result.sort((dateA, dateB) =>
                            dateA.date.localeCompare(dateB.date)
                        )
                        break
                    case 'month':
                        result = await fetchByYearMonth(year, month)
                        break
                    case 'week':
                        result = (await fetchByYearMonth(year, month)).filter(
                            (item) => {
                                const currentWeek = moment(currentDate).week()
                                const itemWeek = moment(item.date).week()
                                return itemWeek === currentWeek
                            }
                        )
                        // result = await fetchData('day', from, to)
                        break
                    default:
                        throw new Error('Invalid period')
                }
                console.log(result)
                setData(result)
            } catch (error) {
                console.error(error)
            }
        }
        loadData()
    }, [period, currentDate, from, to])

    const handlePeriodChange = (newPeriod) => {
        setPeriod(newPeriod)
        setFrom('') // Сброс диапазона при изменении периода
        setTo('')
    }
    const Calendar = (
        <div className="-mt-5 flex justify-center">
            {period === 'week' && (
                <WeekCalendar
                    value={dayjs(currentDate)}
                    onChange={(value) =>
                        value && setCurrentDate(value.toDate())
                    }
                />
            )}

            {period === 'month' && (
                <DateCalendar
                    className="!mx-0"
                    value={dayjs(currentDate)}
                    onChange={(value) =>
                        value && setCurrentDate(value.toDate())
                    }
                    views={['month', 'year']}
                    openTo="month"
                />
            )}
        </div>
    )

    console

    const HandleButtons = period !== 'year' && (
        <div className="flex justify-center">
            <Button onClick={handlePrev}>
                <FaArrowLeft className="my-2" />
            </Button>
            <Button onClick={handleNext}>
                <FaArrowRight className="my-2" />
            </Button>
        </div>
    )

    const Period = (
        <div className="mb-2 flex justify-center gap-2">
            <Button
                variant={period === 'year' ? 'contained' : 'outlined'}
                onClick={() => handlePeriodChange('year')}
            >
                Год
            </Button>
            <Button
                variant={period === 'month' ? 'contained' : 'outlined'}
                onClick={() => handlePeriodChange('month')}
            >
                Месяц
            </Button>
            <Button
                variant={period === 'week' ? 'contained' : 'outlined'}
                onClick={() => handlePeriodChange('week')}
            >
                Неделя
            </Button>
        </div>
    )
    const Picker = period === 'month' && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField
                    label="От"
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    label="До"
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </Box>
        </Box>
    )

    return (
        <div>
            <div className="grid min-h-20 grid-cols-3 justify-items-start">
                <div>{Period}</div>
                <div className="justify-self-center"> {HandleButtons}</div>
                <div> {Calendar}</div>
            </div>

            {/* Отображение графика */}
            <ChartComponent data={data} period={period} />
        </div>
    )
}

export default StatisticsChart
