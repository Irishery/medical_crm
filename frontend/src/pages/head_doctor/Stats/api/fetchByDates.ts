interface DTO {
    date: string
    value: number
}
export const fetchByDate = async (
    start_date: string,
    end_date: string
): Promise<DTO[]> => {
    const response = await fetch(
        `http://localhost:8000/statistics/schedule/daily?start_date=${start_date}&end_date=${end_date}`
    )

    if (!response.ok) throw new Error('Failed to fetch schedule by date')

    return await response.json()
}
