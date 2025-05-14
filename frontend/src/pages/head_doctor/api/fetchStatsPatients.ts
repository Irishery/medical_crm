export const fetchStatsPatients = async () => {
    const response = await fetch(`http://localhost:8000/statistics/patients`)

    if (!response.ok) throw new Error('Failed to fetch patients stats')

    return await response.json()
}
