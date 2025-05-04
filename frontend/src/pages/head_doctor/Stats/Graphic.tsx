import React, { useState, useEffect } from 'react'
import { Button, TextField, Box } from '@mui/material'
import { BarChart } from '@mui/x-charts/BarChart'

// Функция для запроса данных
const fetchData = async (period, from = null, to = null) => {
    let url = `/api/statistics?period=${period}`
    if (from && to) {
        url += `&from=${from}&to=${to}`
    }
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error('Failed to fetch data')
    }
    return response.json()
}

// Компонент для отображения графика
const ChartComponent = ({ data, period }) => {
    const chartData = data.map((item) => ({
        label: item.date,
        value: item.value,
    }))

    return (
        <BarChart
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
    const [period, setPeriod] = useState('year') // 'year', 'month', 'day'
    const [data, setData] = useState<{ date: string; value: number }[]>([])
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')

    useEffect(() => {
        const loadData = async () => {
            try {
                // const result = await fetchData(period, from || null, to || null)
                const result = {
                    data: [
                        { date: '2023', value: 30 },
                        { date: '2024', value: 40 },
                        { date: '2025', value: 50 },
                    ],
                }
                setData(result.data)
            } catch (error) {
                console.error(error)
            }
        }
        loadData()
    }, [period, from, to])

    const handlePeriodChange = (newPeriod) => {
        setPeriod(newPeriod)
        setFrom('') // Сброс диапазона при изменении периода
        setTo('')
    }

    return (
        <Box>
            <div className="flex justify-between">
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
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
                        variant={period === 'day' ? 'contained' : 'outlined'}
                        onClick={() => handlePeriodChange('day')}
                    >
                        День
                    </Button>
                </Box>

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
            </div>

            {/* Отображение графика */}
            <ChartComponent data={data} period={period} />
        </Box>
    )
}

export default StatisticsChart
