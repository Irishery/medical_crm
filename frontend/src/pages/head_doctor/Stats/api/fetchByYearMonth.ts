interface DTO {
    date: string
    value: number
}

export const fetchByYearMonth = async (
    year: number,
    month: number
): Promise<DTO[]> => {
    const response = await fetch(
        `http://localhost:8000/statistics/schedule/monthly?year=${year}&month=${month}`
    )

    if (!response.ok) throw new Error('Failed to fetch yearly schedule')

    return await response.json()
}
