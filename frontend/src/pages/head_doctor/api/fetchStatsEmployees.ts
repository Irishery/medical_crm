export const fetchStatsEmployees = async () => {
    const response = await fetch(`http://localhost:8000/statistics/employees`)

    if (!response.ok) throw new Error('Failed to fetch employees stats')

    return await response.json()
}
